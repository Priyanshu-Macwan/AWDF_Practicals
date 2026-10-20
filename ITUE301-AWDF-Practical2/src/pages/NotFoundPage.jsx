import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <section className="not-found"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>We couldn’t find that page.</h1><p>It may have moved, or the address may be incorrect.</p><Link className="button-link" to="/">Return home</Link></section>;
}
