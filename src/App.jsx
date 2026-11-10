import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const SKILLS = [
  { name: 'HTML5', icon: 'html', category: 'Frontend' },
  { name: 'CSS3', icon: 'css', category: 'Frontend' },
  { name: 'JavaScript', icon: 'js', category: 'Frontend' },
  { name: 'React', icon: 'react', category: 'Frontend' },
  { name: 'Git', icon: 'git', category: 'Tools' },
  { name: 'GitHub', icon: 'github', category: 'Tools' },
  { name: 'Responsive Design', icon: 'responsive', category: 'Design' },
  { name: 'UI/UX Fundamentals', icon: 'uiux', category: 'Design' },
];

const SERVICES = [
  {
    title: 'Frontend Web Development',
    description: 'Building performant, accessible, and maintainable user interfaces using modern JavaScript frameworks. Clean component architecture and optimized bundle sizes.',
    icon: 'code'
  },
  {
    title: 'Responsive Website Design',
    description: 'Creating fluid layouts that adapt beautifully across all devices. Mobile-first approach with careful attention to breakpoints, typography scaling, and touch interactions.',
    icon: 'responsive'
  },
  {
    title: 'Landing Page Development',
    description: 'High-converting landing pages with smooth animations, optimized performance, and compelling visual hierarchy. Built for speed and accessibility from the ground up.',
    icon: 'layout'
  },
  {
    title: 'UI Implementation',
    description: 'Translating design systems and Figma mockups into pixel-perfect, production-ready code. Consistent spacing, typography, and component libraries with Storybook documentation.',
    icon: 'ui'
  },
];

const PROJECTS = [
  {
    title: 'Stripe',
    description: 'Developer-first payment platform with exceptional documentation, interactive API references, and beautiful dashboard design. A gold standard for developer experience.',
    url: 'https://stripe.com',
    category: 'Developer Experience',
    brandColor: '#635bff',
    brandGradient: 'linear-gradient(135deg, #635bff 0%, #00c9ff 100%)',
    image: 'https://stripe.com/img/v3/home/hero-illustration.png'
  },
  {
    title: 'Linear',
    description: 'Modern issue tracking with buttery-smooth interactions, keyboard-first navigation, and thoughtful dark mode. Demonstrates the power of native web technologies.',
    url: 'https://linear.app',
    category: 'Productivity Tool',
    brandColor: '#5e6ad2',
    brandGradient: 'linear-gradient(135deg, #5e6ad2 0%, #7c5cbf 100%)',
    image: 'https://linear.app/og-image.png'
  },
  {
    title: 'Notion',
    description: 'Flexible workspace combining docs, databases, and collaboration. Clean typography, nested layouts, and real-time sync showcase advanced frontend architecture.',
    url: 'https://notion.so',
    category: 'Collaboration',
    brandColor: '#000000',
    brandGradient: 'linear-gradient(135deg, #000000 0%, #3d3d3d 100%)',
    image: 'https://www.notion.so/images/meta/notion-social-media-preview.jpg'
  },
  {
    title: 'Vercel',
    description: 'Deployment platform with instant rollbacks, edge functions, and a dashboard that makes complex infrastructure feel simple. Exemplifies performance-oriented design.',
    url: 'https://vercel.com',
    category: 'Developer Platform',
    brandColor: '#000000',
    brandGradient: 'linear-gradient(135deg, #000000 0%, #3d3d3d 100%)',
    image: 'https://assets.vercel.com/image/upload/v1633528474/front/home/og-image.png'
  },
];

const EDUCATION = [
  {
    degree: 'Bachelor of Information Technology',
    institution: 'Meridian University of Technology',
    location: 'San Francisco, CA',
    period: '2025 — 2029 (Expected)',
    description: 'Focus on Software Engineering, Human-Computer Interaction, and Web Technologies. Relevant coursework: Advanced Frontend Development, UI/UX Design Principles, Database Systems, Cloud Computing, and Accessibility Engineering.',
    highlights: [
      'Dean\'s List: Fall 2025, Spring 2026',
      'ACM Student Chapter - Web Development Lead',
      'Capstone: Accessible Design System for Educational Platforms'
    ]
  }
];

const CONTACT_INFO = {
  email: 'ethan.carter@demo.university',
  location: 'San Francisco Bay Area',
  availability: 'Open to internships & junior roles'
};

const CURRENT_YEAR = new Date().getFullYear();

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved || (prefersDark ? 'dark' : 'light');
  });
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('portfolio-theme', next);
  };

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const scrollToSection = (href) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-inner">
        <a href="#home" className="navbar-brand" aria-label="Ethan Carter - Home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M10 12h12M10 16h8M10 20h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="brand-text">Ethan Carter</span>
        </a>

        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`hamburger ${isOpen ? 'open' : ''}`} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'light' ? (
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>

        <div id="navbar-menu" className={`navbar-menu ${isOpen ? 'open' : ''}`} role="menubar">
          <ul className="navbar-list" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  className="navbar-link"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {isOpen && (
          <div
            className="navbar-backdrop"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="section-label">Hello, I'm</span>
          <h1 id="hero-title" className="hero-name">Ethan Carter</h1>
          <p className="hero-headline">Frontend Developer & Web Designer</p>
          <span className="badge" aria-label="Currently seeking opportunities">
            <span className="badge-dot" aria-hidden="true"></span>
            Open to Work
          </span>
          <p className="hero-description">
            Crafting accessible, performant, and delightful web experiences.
            Passionate about clean code, thoughtful design systems, and building interfaces
            that people genuinely enjoy using.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View Projects
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="code-card">
            <div className="code-header">
              <div className="code-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="code-filename">portfolio.jsx</span>
            </div>
            <pre className="code-content"><code>{`const developer = {
  name: "Ethan Carter",
  role: "Frontend Developer",
  focus: ["React", "CSS", "Accessibility"],
  currently: "Building elegant UIs",
  motto: "Code with care, design with intent"
};`}</code></pre>
            <div className="code-output">
              <span className="prompt">$</span> npm run dev
              <span className="output">→ Server ready at localhost:5173</span>
            </div>
          </div>
          <div className="floating-cards">
            <div className="float-card float-card-1">
              <svg className="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              <span>React</span>
            </div>
            <div className="float-card float-card-2">
              <svg className="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5 5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
              <span>Design</span>
            </div>
            <div className="float-card float-card-3">
              <svg className="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section-alt" aria-labelledby="about-title">
      <div className="container">
        <header className="section-header">
          <span className="section-label">About Me</span>
          <h2 id="about-title" className="section-title">Get to know me better</h2>
          <p className="section-subtitle">
            A few highlights from my journey as a developer and designer
          </p>
        </header>

        <div className="about-grid">
          <div className="about-content">
            <p className="about-text">
              I'm a Bachelor of Information Technology student at Meridian University of Technology,
              specializing in frontend development and user interface design. My journey started with
              curiosity about how websites work, and evolved into a passion for creating digital
              experiences that are both beautiful and accessible.
            </p>
            <p className="about-text">
              I believe the best interfaces are invisible — they let users accomplish their goals
              without friction. This philosophy drives my focus on semantic HTML, thoughtful CSS
              architecture, and JavaScript that enhances rather than complicates.
            </p>
            <p className="about-text">
              When I'm not coding, you'll find me exploring design systems, contributing to open
              source documentation, or sketching wireframes for side projects. I'm currently seeking
              internship opportunities where I can grow alongside experienced engineers.
            </p>
          </div>

          <div className="about-highlights">
            <h3 className="highlights-title">What I'm Into</h3>
            <ul className="highlights-list">
              <li className="highlight-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <div>
                  <strong>Accessible by Default</strong>
                  <span>WCAG 2.1 AA compliance, semantic HTML, keyboard navigation</span>
                </div>
              </li>
              <li className="highlight-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <div>
                  <strong>Design Systems</strong>
                  <span>Component libraries, tokens, Storybook, Figma sync</span>
                </div>
              </li>
              <li className="highlight-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <div>
                  <strong>Performance</strong>
                  <span>Code splitting, lazy loading, Core Web Vitals optimization</span>
                </div>
              </li>
              <li className="highlight-item">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div>
                  <strong>Mentorship & Community</strong>
                  <span>ACM chapter lead, peer code reviews, tech talks</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skillIcons = {
    html: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 14h-2v-4h2v4zm-4-4h2v-8h-2v8zm8 0h2v-4h-2v4z"/>
      </svg>
    ),
    css: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 14h-2v-4h2v4zm-4-4h2v-8h-2v8zm8 0h2v-4h-2v4z"/>
      </svg>
    ),
    js: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.06 4.94a2 2 0 0 1 0 2.83l-5.1 5.1a2 2 0 0 1-2.83 0L5.05 14.9a2 2 0 0 1 0-2.83l4.04-4.04a2 2 0 0 1 2.83 0l5.1 5.1z"/>
        <path d="M14.07 10.93a2 2 0 0 1 0 2.83l-3.1 3.1a2 2 0 0 1-2.83 0l-4.04-4.04a2 2 0 0 1 0-2.83l4.04-4.04a2 2 0 0 1 2.83 0l3.1 3.1z"/>
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M15.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L15.5 3.5z"/>
        <path d="M14 2v4m0 0h4m-4 0l3 3"/>
        <path d="M10 18v4m0 0h4m-4 0l3-3"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    ),
    responsive: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="5" y="3" width="14" height="10" rx="2"/>
        <path d="M12 13v8M8 21h8"/>
        <rect x="17" y="5" width="6" height="12" rx="1"/>
      </svg>
    ),
    uiux: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    layout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    ui: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  };

  const categoryColors = {
    Frontend: 'var(--color-violet)',
    Tools: 'var(--color-violet-light)',
    Design: 'var(--color-violet-dark)',
  };

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Skills</span>
          <h2 id="skills-title" className="section-title">Technologies & Tools</h2>
          <p className="section-subtitle">
            Technologies I work with regularly and continue to deepen my expertise in
          </p>
        </header>

        <div className="skills-grid" role="list">
          {SKILLS.map((skill) => (
            <article
              key={skill.name}
              className="skill-card card"
              role="listitem"
              style={{ '--skill-color': categoryColors[skill.category] }}
            >
              <div className="skill-icon" aria-hidden="true">
                {skillIcons[skill.icon]}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <span className="skill-category">{skill.category}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const serviceIcons = {
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    responsive: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="5" y="3" width="14" height="10" rx="2"/>
        <path d="M12 13v8M8 21h8"/>
        <rect x="17" y="5" width="6" height="12" rx="1"/>
      </svg>
    ),
    layout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    ui: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  };

  return (
    <section id="services" className="section section-alt" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Services</span>
          <h2 id="services-title" className="section-title">What I Offer</h2>
          <p className="section-subtitle">
            Professional frontend services delivered with attention to detail and best practices
          </p>
        </header>

        <div className="services-grid" role="list">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="service-card card"
              role="listitem"
            >
              <div className="service-icon" aria-hidden="true">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-glow" aria-hidden="true"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Featured Web Experiences</span>
          <h2 id="projects-title" className="section-title">Inspiration & References</h2>
          <p className="section-subtitle">
            These are exceptional <strong>external websites</strong> I study for inspiration and learning.
            They are <em>not</em> my own work — each represents industry-leading frontend craft.
          </p>
        </header>

        <div className="projects-grid" role="list">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="project-card card"
              role="listitem"
              style={{ '--brand-color': project.brandColor, '--brand-gradient': project.brandGradient }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                aria-label={`Visit ${project.title} website (opens in new tab)`}
              >
                <div className="project-preview" aria-hidden="true">
                  <img
                    src={project.image}
                    alt=""
                    className="project-image"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="project-fallback" aria-hidden="true">
                    <div className="fallback-gradient" />
                    <div className="fallback-pattern">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="fallback-bar" style={{ '--i': i }} />
                      ))}
                    </div>
                  </div>
                  <div className="preview-badge">{project.category}</div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <span className="project-cta">
                    Visit Website
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <p className="projects-disclaimer" role="note">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          All websites listed above are property of their respective owners. This section showcases
          external references for educational and inspirational purposes only.
        </p>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section section-alt" aria-labelledby="education-title">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Education</span>
          <h2 id="education-title" className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            Fictional university information for demonstration purposes
          </p>
        </header>

        <div className="education-timeline">
          {EDUCATION.map((edu, index) => (
            <article key={index} className="education-card card">
              <div className="education-marker" aria-hidden="true">
                <span className="marker-dot"></span>
                <span className="marker-line"></span>
              </div>
              <div className="education-content">
                <div className="education-header">
                  <div>
                    <h3 className="education-degree">{edu.degree}</h3>
                    <p className="education-institution">{edu.institution}</p>
                  </div>
                  <div className="education-meta">
                    <time className="education-period">{edu.period}</time>
                    <span className="education-location">{edu.location}</span>
                  </div>
                </div>
                <p className="education-description">{edu.description}</p>
                <ul className="education-highlights" role="list">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i} className="education-highlight">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="education-note" role="note">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p>
            <strong>Note:</strong> Meridian University of Technology is a fictional institution created
            for this university portfolio demonstration. All academic information shown is
            fabricated for educational purposes.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validate = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = 'Valid email required';
    if (!data.subject.trim()) newErrors.subject = 'Subject is required';
    if (!data.message.trim()) newErrors.message = 'Message is required';
    else if (data.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Contact</span>
          <h2 id="contact-title" className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Currently open to internships and junior frontend roles. Feel free to reach out!
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-info-title">Get In Touch</h3>
            <p className="contact-info-text">
              I'm always interested in hearing about new projects, collaboration opportunities,
              or just chatting about frontend development and design.
            </p>

            <div className="contact-methods">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="contact-method"
              >
                <div className="method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="method-content">
                  <span className="method-label">Email</span>
                  <span className="method-value">{CONTACT_INFO.email}</span>
                </div>
              </a>

              <div className="contact-method">
                <div className="method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="method-content">
                  <span className="method-label">Location</span>
                  <span className="method-value">{CONTACT_INFO.location}</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div className="method-content">
                  <span className="method-label">Availability</span>
                  <span className="method-value">{CONTACT_INFO.availability}</span>
                </div>
              </div>
            </div>

            <div className="contact-note" role="note">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <p>Demo contact information only. Email link opens your default mail client.</p>
            </div>
          </div>

          <form className="contact-form card" ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span id="name-error" className="form-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={`form-input ${errors.subject ? 'error' : ''}`}
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, etc."
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <span id="subject-error" className="form-error" role="alert">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                aria-invalid={!!errors.message}
              />
              {errors.message ? (
                <span id="message-error" className="form-error" role="alert">{errors.message}</span>
              ) : (
                <span id="message-hint" className="form-hint">Minimum 10 characters</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary form-submit"
              disabled={status === 'success'}
            >
              {status === 'success' ? (
                <>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Message Sent (Demo)
                </>
              ) : (
                'Send Message'
              )}
            </button>

            {status === 'success' && (
              <div className="form-success" role="status" aria-live="polite">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Thanks! This is a demo form — no message was actually sent. In a real implementation, this would connect to a backend service.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="footer-logo" aria-label="Ethan Carter - Back to top">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="currentColor"/>
                  <path d="M10 12h12M10 16h8M10 20h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="brand-text">Ethan Carter</span>
            </a>
            <p className="footer-tagline">Frontend Developer & Web Designer</p>
            <p className="footer-demo-notice">University Portfolio Demonstration</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <h4 className="footer-nav-title">Navigation</h4>
            <ul className="footer-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-nav-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-nav" aria-label="Connect">
            <h4 className="footer-nav-title">Connect</h4>
            <ul className="footer-nav-list">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="footer-nav-link">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {CURRENT_YEAR} Ethan Carter. Built with React + Vite for university demonstration.
          </p>
          <button
            className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main" role="main">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;