/* ================================================================
   main.js — Python Learning Hub Core Logic
   ================================================================ */

'use strict';

/* ── Navbar ──────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNavLink();
});

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

function updateActiveNavLink() {
  const sections = ['home', 'topics', 'features', 'about'];
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    const link = document.getElementById('nav-' + id);
    if (!el || !link) return;
    const inView = scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight;
    link.classList.toggle('active', inView);
  });
}

/* ── Scroll Reveal ───────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = (i % 4) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Smooth Scroll ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

/* ── Progress Tracker ────────────────────────────── */
const TOPICS = [
  { id: 'variables',      label: '🔤' },
  { id: 'control_flow',   label: '🔀' },
  { id: 'functions',      label: '⚙️' },
  { id: 'data_structures',label: '📦' },
  { id: 'oop',            label: '🏛' },
  { id: 'file_handling',  label: '📂' },
];

function getProgress() {
  try { return JSON.parse(localStorage.getItem('pylearn_progress') || '{}'); }
  catch { return {}; }
}

function renderProgress() {
  const prog = getProgress();
  const dotsEl = document.getElementById('progress-dots');
  const barEl  = document.getElementById('progress-bar');
  const txtEl  = document.getElementById('progress-text');
  if (!dotsEl) return;

  dotsEl.innerHTML = '';
  const done = TOPICS.filter(t => prog[t.id]).length;
  const pct  = Math.round((done / TOPICS.length) * 100);

  TOPICS.forEach(t => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' + (prog[t.id] ? ' done' : '');
    dot.textContent = t.label;
    dot.title = t.id.replace(/_/g, ' ');
    dotsEl.appendChild(dot);
  });

  if (barEl) barEl.style.width = pct + '%';
  if (txtEl) txtEl.textContent = pct + '% Complete';
}

renderProgress();

/* ── Animated Counter for Hero Stats ─────────────── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1400;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const vals = e.target.querySelectorAll('.hero-stat-value');
    const data = [
      { val: 6,   suffix: '' },
      { val: 30,  suffix: '+' },
      { val: 100, suffix: '%' },
    ];
    vals.forEach((el, i) => {
      if (data[i]) animateCounter(el, data[i].val, data[i].suffix);
    });
    statsObserver.unobserve(e.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── Console message ─────────────────────────────── */
console.log('%c🐍 Python Learning Hub', 'color:#a78bfa;font-size:1.2rem;font-weight:bold;');
console.log('%cWelcome! Built with HTML, CSS & Vanilla JS.', 'color:#94a3b8;');
