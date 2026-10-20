import React, { Component, Suspense, lazy, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './styles.css';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const LearningPage = lazy(() => import('./pages/LearningPage.jsx'));
const TopicPage = lazy(() => import('./pages/TopicPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

class RouteErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <main className="route-error"><p className="eyebrow">PAGE UNAVAILABLE</p><h1>This page couldn’t load.</h1><p>Try the learning hub again.</p><Link className="button-link" to="/learning">Back to learning hub</Link></main>;
    return this.props.children;
  }
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);
  const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="topbar">
      <Link className="brand" to="/" aria-label="Priyanshu Macwan, home"><span className="brand-mark">P</span><span>Priyanshu Macwan<small>Student portfolio · 24CS049</small></span></Link>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
        <NavLink className={navClass} to="/" end>Home</NavLink>
        <NavLink className={navClass} to="/learning">Learning hub</NavLink>
        <NavLink className="nav-contact" to="/#contact">Get in touch <ArrowUpRight size={15}/></NavLink>
      </nav>
    </header>
  </>;
}

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    const isTopic = location.pathname.startsWith('/learning/');
    document.title = isTopic ? 'Topic notes — Priyanshu Macwan' : location.pathname === '/learning' ? 'Learning Hub — Priyanshu Macwan' : location.pathname === '/' ? 'Priyanshu Macwan — Student Portfolio' : 'Page not found — Priyanshu Macwan';
  }, [location.pathname, location.hash]);
  return <><Header/><main id="main-content" tabIndex="-1"><RouteErrorBoundary><Suspense fallback={<div className="loading" role="status" aria-live="polite">Loading page…</div>}><Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/learning" element={<LearningPage/>}/>
    <Route path="/learning/:topicId" element={<TopicPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes></RouteErrorBoundary></main><footer className="site-footer"><Link className="footer-brand" to="/" aria-label="Back to home">PM<span>.</span></Link><span>Priyanshu Macwan <b>·</b> 24CS049</span><span>© {new Date().getFullYear()} <span className="footer-note">BUILT WITH CURIOSITY</span></span></footer></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
