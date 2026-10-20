import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Code2, Layers3, Sparkles } from 'lucide-react';
import './styles.css';

const projects = [
  { number: '01', title: 'Student Portfolio', description: 'A personal space to introduce myself and bring my work, interests, and learning together.', tags: ['React', 'CSS', 'Vite'], icon: Layers3 },
  { number: '02', title: 'Student Dashboard', description: 'A simple dashboard concept for keeping classes, study goals, and tasks in one place.', tags: ['UI design', 'JavaScript'], icon: Code2 },
];
const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Responsive design'];

function SectionTitle({ eyebrow, children }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{children}</h2></div>;
}

function Header() {
  return <header className="topbar"><a className="brand" href="#home" aria-label="Priyanshu Macwan, home"><span className="brand-mark">P</span><span>Priyanshu Macwan<small>Student portfolio</small></span></a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a className="nav-contact" href="#contact">Get in touch <ArrowUpRight size={15}/></a></nav></header>;
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-copy"><div className="availability"><span/> PERSONAL PORTFOLIO <span className="availability-divider">/</span> 24CS049</div><h1>Curious by nature.<br/><span>Building for the web.</span></h1><p className="hero-intro">Hi, I’m <strong>Priyanshu Macwan</strong> — a student exploring web development and creating thoughtful, useful digital experiences.</p><a className="primary-link" href="#projects">Explore my work <ArrowDownRight size={17}/></a></div><div className="hero-card"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-monogram">PM<span>.</span></div><div className="hero-card-label"><Sparkles size={15}/><span>Learning through making</span></div><div className="hero-card-index">FIG. 01 — PERSONAL PROFILE</div></div><div className="hero-foot"><span>COMPUTER ENGINEERING STUDENT</span><span>DESIGN · CODE · CURIOSITY</span></div></section>;
}

function About() {
  return <section className="section about" id="about"><SectionTitle eyebrow="A LITTLE ABOUT ME">Hello, I’m Priyanshu.</SectionTitle><div className="about-body"><p className="about-lead">I enjoy understanding how things work, then turning ideas into clear, accessible web experiences.</p><div className="about-aside"><p>This portfolio is a snapshot of what I’m learning and making. I’m building my foundations in frontend development one project at a time.</p><div className="student-id"><span>ENROLLMENT NUMBER</span><strong>24CS049</strong></div></div></div></section>;
}

function Projects() {
  return <section className="section projects" id="projects"><SectionTitle eyebrow="SELECTED WORK">Projects in progress</SectionTitle><div className="project-grid">{projects.map(({number,title,description,tags,icon:Icon})=><article className="project-card" key={number}><div className="project-top"><span className="project-number">{number} / 02</span><span className="project-icon"><Icon size={18}/></span></div><h3>{title}<ArrowUpRight size={18}/></h3><p>{description}</p><div className="tag-list">{tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div></section>;
}

function Skills() {
  return <section className="section skills" id="skills"><SectionTitle eyebrow="TOOLS & TECHNOLOGIES">What I’m learning</SectionTitle><div className="skills-layout"><p>Growing a practical toolkit for designing and building on the web.</p><div className="skill-list">{skills.map((skill,index)=><span className="skill" key={skill}><small>0{index+1}</small>{skill}</span>)}</div></div></section>;
}

function Contact() {
  return <section className="contact" id="contact"><div><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let’s make something<br/>meaningful.</h2><p>I’m always interested in learning, sharing ideas, and taking on a new challenge.</p></div><a className="contact-link" href="#projects" aria-label="Explore projects"><ArrowUpRight size={23}/></a></section>;
}

function App() {
  return <><Header/><main><Hero/><About/><Projects/><Skills/><Contact/></main><footer><a className="footer-brand" href="#home">PM<span>.</span></a><span>Priyanshu Macwan <b>·</b> 24CS049</span><span>© {new Date().getFullYear()} <span className="footer-right">BUILT WITH CURIOSITY</span></span></footer></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
