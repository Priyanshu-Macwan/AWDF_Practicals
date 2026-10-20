import { useState } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeading from '../components/PageHeading.jsx';
import { categories, topics } from '../data/topics.js';

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const visibleTopics = selectedCategory === 'All' ? topics : topics.filter(topic => topic.category === selectedCategory);
  return <div className="content-page learning-page">
    <PageHeading eyebrow="PRACTICAL 2 · LEARNING HUB" title="Building better web experiences." intro="Notes on React, accessibility, progressive web apps, performance, security, and testing."/>
    <section aria-labelledby="topic-list-heading"><div className="topic-toolbar"><h2 id="topic-list-heading">Explore the topics</h2><span className="topic-count" aria-live="polite">{visibleTopics.length} {visibleTopics.length === 1 ? 'topic' : 'topics'}</span></div>
      <div className="filter-list" role="group" aria-label="Filter topics by category">{categories.map(category => <button key={category} type="button" className={`filter-button${selectedCategory === category ? ' selected' : ''}`} aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)}>{category}</button>)}</div>
      <div className="topic-grid">{visibleTopics.map(topic => <article className="topic-card" key={topic.id}><div className="topic-card-top"><span className="topic-number">{topic.number} / 07</span><span className="topic-category"><BookOpen size={13}/>{topic.category}</span></div><h3><Link to={`/learning/${topic.id}`}>{topic.title}<ArrowUpRight size={17}/></Link></h3><p>{topic.summary}</p><Link className="text-link" to={`/learning/${topic.id}`}>Read topic <span aria-hidden="true">→</span></Link></article>)}</div>
    </section>
    <aside className="practical-note"><span className="eyebrow">PRACTICAL 2</span><p>React Router connects these pages, while the category filter uses <code>useState</code> to update the visible topics.</p></aside>
  </div>;
}
