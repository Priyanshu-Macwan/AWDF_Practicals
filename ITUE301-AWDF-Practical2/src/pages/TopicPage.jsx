import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { topics } from '../data/topics.js';

export default function TopicPage() {
  const { topicId } = useParams();
  const topic = topics.find(item => item.id === topicId);
  if (!topic) return <section className="not-found"><p className="eyebrow">TOPIC NOT FOUND</p><h1>That topic isn’t here.</h1><Link className="button-link" to="/learning">Return to learning hub</Link></section>;
  const nextTopic = topics[(topics.indexOf(topic) + 1) % topics.length];
  return <article className="content-page detail-page"><Link className="back-link" to="/learning"><ArrowLeft size={15}/> All topics</Link><header className="detail-heading"><p className="eyebrow">{topic.number} / 07 <span>·</span> {topic.category.toUpperCase()}</p><h1>{topic.title}</h1><p className="page-intro">{topic.summary}</p></header><div className="detail-layout"><div className="detail-main"><section><h2>Overview</h2><p>{topic.description}</p></section><section><h2>Key ideas</h2><ul className="idea-list">{topic.points.map(point => <li key={point}><Check size={16}/><span>{point}</span></li>)}</ul></section><aside className="practice-callout"><p className="eyebrow">IN THIS PORTFOLIO</p><p>{topic.practice}</p></aside></div><aside className="detail-aside"><span className="eyebrow">CONTINUE LEARNING</span><Link to={`/learning/${nextTopic.id}`}><span>{nextTopic.number} / 07</span><strong>{nextTopic.title}</strong><ArrowUpRight size={16}/></Link><Link className="all-topics-link" to="/learning">Browse all topics</Link></aside></div></article>;
}
