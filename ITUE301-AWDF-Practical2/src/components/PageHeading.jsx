export default function PageHeading({ eyebrow, title, intro }) {
  return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p className="page-intro">{intro}</p>}</div>;
}
