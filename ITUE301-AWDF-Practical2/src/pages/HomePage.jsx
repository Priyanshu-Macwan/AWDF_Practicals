import { ArrowDownRight, ArrowUpRight, Code2, Layers3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { number: '01', title: 'Student Portfolio', description: 'A personal space to introduce myself and bring my work, interests, and learning together.', tags: ['React', 'CSS', 'Vite'], icon: Layers3 },
  { number: '02', title: 'Student Dashboard', description: 'A simple dashboard concept for keeping classes, study goals, and tasks in one place.', tags: ['UI design', 'JavaScript'], icon: Code2 },
];

function Projects() {
  return <section className="section projects" id="projects"><div className="section-title"><p className="eyebrow">SELECTED WORK</p><h2>Projects in progress</h2></div><div className="project-grid">{projects.map(({ number, title, description, tags, icon: Icon }) => <article className="project-card" key={number}><div className="project-top"><span className="project-number">{number} / 02</span><span className="project-icon"><Icon size={18}/></span></div><h3>{title}<ArrowUpRight size={18}/></h3><p>{description}</p><div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>;
}

export default function HomePage() {
  return <>
    <section className="hero" id="home"><div className="hero-copy"><div className="availability"><span/> PERSONAL PORTFOLIO <span className="availability-divider">/</span> 24CS049</div><h1>Curious by nature.<br/><span>Building for the web.</span></h1><p className="hero-intro">Hi, I’m <strong>Priyanshu Macwan</strong> — a student exploring web development and creating thoughtful, useful digital experiences.</p><Link className="primary-link" to="/learning">Explore my learning hub <ArrowDownRight size={17}/></Link></div><div className="hero-card"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-monogram">PM<span>.</span></div><div className="hero-card-label"><Sparkles size={15}/><span>Learning through making</span></div><div className="hero-card-index">FIG. 01 — PERSONAL PROFILE</div></div><div className="hero-foot"><span>COMPUTER ENGINEERING STUDENT</span><span>DESIGN · CODE · CURIOSITY</span></div></section>
    <section className="section about" id="about"><div className="section-title"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>Hello, I’m Priyanshu.</h2></div><div className="about-body"><p className="about-lead">I enjoy understanding how things work, then turning ideas into clear, accessible web experiences.</p><div className="about-aside"><p>This portfolio is a snapshot of what I’m learning and making. I’m building my foundations in frontend development one project at a time.</p><div className="student-id"><span>ENROLLMENT NUMBER</span><strong>24CS049</strong></div></div></div></section>
    <Projects/>
    <section className="section skills" id="skills"><div className="section-title"><p className="eyebrow">TOOLS & TECHNOLOGIES</p><h2>What I’m learning</h2></div><div className="skills-layout"><p>Growing a practical toolkit for designing and building on the web.</p><div className="skill-list">{['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Responsive design'].map((skill, index) => <span className="skill" key={skill}><small>0{index + 1}</small>{skill}</span>)}</div></div></section>
    <section className="contact" id="contact"><div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make something<br/>meaningful.</h2><p>I’m always interested in learning, sharing ideas, and taking on a new challenge.</p></div><Link className="contact-link" to="/learning" aria-label="Explore learning topics"><ArrowUpRight size={23}/></Link></section>
  </>;
}
