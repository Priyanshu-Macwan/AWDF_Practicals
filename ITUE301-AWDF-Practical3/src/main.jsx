import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, ArrowDownRight, ArrowUpRight, Clock3, ExternalLink, GitFork, Github, Search, ShieldCheck, Star, Terminal } from 'lucide-react';
import './styles.css';

const API_URL = 'https://api.github.com/users/Priyanshu-Macwan/repos?sort=updated&per_page=100';

function Header() {
  return <header className="topbar"><a href="#top" className="brand" aria-label="Priyanshu Macwan, back to top"><span className="brand-mark">P</span><span>Priyanshu Macwan<small>24CS049 <i/> Developer portfolio</small></span></a><a className="github-link" href="https://github.com/Priyanshu-Macwan" target="_blank" rel="noreferrer"><Github size={17}/> GitHub profile <ExternalLink size={13}/></a></header>;
}

function RepoCard({ repo, index }) {
  const updated = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(repo.updated_at));
  return <article className="repo-card" style={{ '--card-order': index }}>
    <div className="repo-card-top"><span className="repo-index">PROJECT / {String(index + 1).padStart(2, '0')}</span><a className="repo-open" href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} on GitHub`}><ArrowUpRight size={18}/></a></div>
    <h3><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a></h3>
    <p className="repo-description">{repo.description || 'A public project from my GitHub profile.'}</p>
    <div className="repo-meta"><span className="language"><i style={{ '--language-color': languageColor(repo.language) }}/> {repo.language || 'Open source'}</span><span><Star size={14}/> {repo.stargazers_count}</span><span><GitFork size={14}/> {repo.forks_count}</span></div>
    <div className="repo-updated"><Clock3 size={13}/> Updated {updated}</div>
  </article>;
}

function languageColor(language) {
  const palette = { JavaScript: '#d9b84f', TypeScript: '#528acb', Python: '#5481a5', HTML: '#dc7751', CSS: '#7e76c8', Java: '#b87047', 'C++': '#6888ae', Go: '#64aeb1' };
  return palette[language] || '#6e8a76';
}

function LoadingState() {
  return <div className="repo-grid" role="status" aria-live="polite"><span className="sr-only">Loading public repositories from GitHub</span>{Array.from({ length: 6 }, (_, index) => <div className="skeleton-card" aria-hidden="true" key={index}><div className="skeleton-line short"/><div className="skeleton-line title"/><div className="skeleton-line body"/><div className="skeleton-line body second"/><div className="skeleton-line footer"/></div>)}</div>;
}

function ErrorState({ message, onRetry }) {
  return <section className="state-card error-state" role="alert"><span className="state-icon"><Activity size={20}/></span><p className="eyebrow">COULD NOT LOAD REPOSITORIES</p><h2>The GitHub request didn’t complete.</h2><p className="state-copy">{message}</p><button className="retry-button" type="button" onClick={onRetry}>Try again <ArrowDownRight size={16}/></button></section>;
}

function RepositoryShowcase() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadRepositories = async () => {
      setStatus('loading');
      setError('');
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (response.status === 403 || response.status === 429) {
          throw new Error('GitHub is temporarily rate-limiting public requests. Wait a little, then try again.');
        }
        if (response.status === 404) {
          throw new Error('The requested GitHub profile was not found.');
        }
        if (!response.ok) {
          throw new Error(`GitHub returned an error (${response.status}). Please try again.`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('GitHub returned an unexpected response. Please try again.');
        setRepos(data);
        setUpdatedAt(new Date());
        setStatus('success');
      } catch (requestError) {
        if (requestError.name === 'AbortError') return;
        setError(requestError.message || 'Check your connection and try again.');
        setStatus('error');
      }
    };
    loadRepositories();
    return () => controller.abort();
  }, [reloadKey]);

  const visibleRepos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return repos;
    return repos.filter(repo => [repo.name, repo.description, repo.language].filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery));
  }, [repos, query]);
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  return <>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="live-dot"/> PRACTICAL 03 <b/> PUBLIC REST API</p><h1>Projects, fetched<br/>straight from <span>GitHub.</span></h1><p className="hero-lede">A live look at the public repositories on my profile. The projects below are loaded from the GitHub API and rendered from its response.</p><a className="hero-cta" href="#repositories">Browse repositories <ArrowDownRight size={17}/></a></div><div className="hero-art" aria-hidden="true"><div className="art-grid"/><div className="art-ring ring-outer"/><div className="art-ring ring-inner"/><div className="art-center"><Terminal size={42}/><span>fetch( )</span></div><div className="art-chip chip-top"><Activity size={14}/> LIVE DATA</div><div className="art-chip chip-bottom"><ShieldCheck size={14}/> PUBLIC API</div><span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span></div><div className="hero-caption"><span>API SOURCE <a href="https://api.github.com/users/Priyanshu-Macwan/repos" target="_blank" rel="noreferrer">api.github.com/users/Priyanshu-Macwan/repos <ExternalLink size={11}/></a></span><span>FETCH · EFFECT · RENDER</span></div></section>

    <section className="stats-bar" aria-label="Repository summary"><div className="stat"><span className="stat-value">{status === 'success' ? repos.length : '—'}</span><span className="stat-label">PUBLIC REPOSITORIES</span></div><div className="stat"><span className="stat-value">{status === 'success' ? totalStars : '—'}</span><span className="stat-label">TOTAL STARS</span></div><div className="stat stat-status"><span className={`status-dot ${status}`}/><span className="stat-label">{status === 'loading' ? 'FETCHING FROM GITHUB' : status === 'error' ? 'REQUEST NEEDS ATTENTION' : `SYNCED ${updatedAt ? new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(updatedAt) : ''}`}</span></div></section>

    <section className="repositories" id="repositories" aria-labelledby="repos-heading" aria-busy={status === 'loading'}><div className="section-header"><div><p className="eyebrow">PUBLIC REPOSITORIES</p><h2 id="repos-heading">A few things I’ve been building<span>.</span></h2><p className="section-copy">Fetched live from my GitHub profile, sorted by recent activity.</p></div><label className="search-box"><Search size={17}/><span className="sr-only">Filter repositories</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter projects…" disabled={status !== 'success'} /></label></div>
      {status === 'loading' && <LoadingState/>}
      {status === 'error' && <ErrorState message={error} onRetry={() => setReloadKey(key => key + 1)}/>}
      {status === 'success' && visibleRepos.length > 0 && <div className="repo-grid" aria-live="polite">{visibleRepos.map((repo, index) => <RepoCard key={repo.id} repo={repo} index={index}/>)}</div>}
      {status === 'success' && visibleRepos.length === 0 && <div className="empty-state"><Search size={20}/><h3>{repos.length ? 'No matching projects' : 'No public repositories yet'}</h3><p>{repos.length ? 'Try a different name, language, or description.' : 'Public repositories will appear here when they are available on GitHub.'}</p></div>}
    </section>
    <footer className="closing-note"><span>BUILT WITH REACT <b>·</b> DATA FROM GITHUB</span><a href="https://github.com/Priyanshu-Macwan" target="_blank" rel="noreferrer">Visit my profile <ArrowUpRight size={14}/></a></footer>
  </>;
}

function App() {
  return <><Header/><main><RepositoryShowcase/></main><footer className="site-footer"><a className="footer-monogram" href="#top">PM<span>.</span></a><span>Priyanshu Macwan <b>·</b> 24CS049</span><span>© {new Date().getFullYear()} PRACTICAL 03</span></footer></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
