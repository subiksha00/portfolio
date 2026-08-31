/* ====================================================
   SUBIKSHA VENUGOPAL - PORTFOLIO
   script.js
   ==================================================== */

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initReveal();
    animateStats();
  }, 2200);
});

/* ============================================================
   PARTICLES
   ============================================================ */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#a855f7', '#3b82f6', '#06b6d4', '#10b981', '#ec4899'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ============================================================
   TYPED TEXT
   ============================================================ */
const typedStrings = [
  'Software Engineer',
  'Digital Marketer',
  'AI Enthusiast',
  'Data Analyst',
  'Problem Solver'
];
let typeIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  if (!typedEl) return;
  const current = typedStrings[typeIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }
  if (!isDeleting && charIdx === current.length) {
    setTimeout(() => { isDeleting = true; type(); }, 2000);
    return;
  }
  if (isDeleting && charIdx === 0) {
    isDeleting = false;
    typeIdx = (typeIdx + 1) % typedStrings.length;
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
setTimeout(type, 2500);

/* ============================================================
   HEADER SCROLL EFFECT
   ============================================================ */
const header = document.getElementById('header');
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  showBackToTop();
  if (scrollIndicator) scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
});

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksEl.classList.toggle('open');
});
navLinksEl?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksEl.classList.remove('open');
  });
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

/* ============================================================
   SKILL BARS ANIMATION
   ============================================================ */
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
      }
    });
  }, { threshold: 0.2 }).observe(skillsSection);
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
const backToTop = document.getElementById('backToTop');
function showBackToTop() {
  backToTop?.classList.toggle('visible', window.scrollY > 400);
}
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('form-submit');
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
    btn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

/* ============================================================
   PARALLAX ORBS
   ============================================================ */
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const mx = (e.clientX / window.innerWidth - 0.5) * 2;
  const my = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const f = (i + 1) * 15;
    orb.style.transform = `translate(${mx * f}px, ${my * f}px)`;
  });
});

/* ============================================================
   PROFILE RING TILT
   ============================================================ */
const profileRing = document.querySelector('.profile-ring');
if (profileRing) {
  profileRing.addEventListener('mousemove', (e) => {
    const r = profileRing.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    profileRing.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
  });
  profileRing.addEventListener('mouseleave', () => { profileRing.style.transform = ''; });
}

/* ============================================================
   PROJECT CARD TILT
   ============================================================ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ============================================================
   TECH PILLS STAGGER
   ============================================================ */
const techStack = document.querySelector('.tech-stack');
if (techStack) {
  const pills = techStack.querySelectorAll('.tech-pill');
  pills.forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
    p.style.transition = 'all 0.4s ease';
  });
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        pills.forEach((pill, i) => setTimeout(() => {
          pill.style.opacity = '1';
          pill.style.transform = 'translateY(0)';
        }, i * 60));
      }
    });
  }, { threshold: 0.3 }).observe(techStack);
}

/* ============================================================
   LOGO GLITCH
   ============================================================ */
document.querySelectorAll('.nav-logo').forEach(logo => {
  logo.addEventListener('mouseenter', () => { logo.style.animation = 'glitch 0.3s ease'; });
  logo.addEventListener('animationend', () => { logo.style.animation = ''; });
});
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes glitch {
    0%  { transform: translate(0); }
    20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
    40% { transform: translate(-2px,-2px); filter: hue-rotate(180deg); }
    60% { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
    80% { transform: translate(2px,-2px); filter: hue-rotate(360deg); }
    100%{ transform: translate(0); filter: none; }
  }
`;
document.head.appendChild(glitchStyle);

/* ============================================================
   CERTIFICATE LIGHTBOX MODAL
   ============================================================ */
const certCards = Array.from(document.querySelectorAll('.cert-img-card'));
const modal = document.getElementById('certModal');
const modalImg = document.getElementById('certModalImg');
const modalTitle = document.getElementById('certModalTitle');
const modalIssuer = document.getElementById('certModalIssuer');
const modalDate = document.getElementById('certModalDate');
const modalId = document.getElementById('certModalId');
const modalClose = document.getElementById('certModalClose');
const modalPrev = document.getElementById('certModalPrev');
const modalNext = document.getElementById('certModalNext');
const modalBdrop = document.getElementById('certModalBackdrop');

let currentCertIdx = 0;

function openModal(idx) {
  currentCertIdx = idx;
  const card = certCards[idx];
  modalImg.style.opacity = '0';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  modalImg.src = card.dataset.img;
  modalImg.alt = card.dataset.title;
  modalTitle.textContent = card.dataset.title;
  modalIssuer.textContent = card.dataset.issuer;
  modalDate.textContent = '📅 ' + card.dataset.date;
  modalId.textContent = card.dataset.id ? '🆔 ' + card.dataset.id : '';

  modalImg.onload = () => {
    modalImg.style.transition = 'opacity 0.35s';
    modalImg.style.opacity = '1';
  };

  modalPrev.style.display = certCards.length > 1 ? 'flex' : 'none';
  modalNext.style.display = certCards.length > 1 ? 'flex' : 'none';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function gotoModal(idx) {
  openModal((idx + certCards.length) % certCards.length);
}

// Open on card click
certCards.forEach((card, i) => card.addEventListener('click', () => openModal(i)));

// Close controls
modalClose?.addEventListener('click', closeModal);
modalBdrop?.addEventListener('click', closeModal);
modalPrev?.addEventListener('click', (e) => { e.stopPropagation(); gotoModal(currentCertIdx - 1); });
modalNext?.addEventListener('click', (e) => { e.stopPropagation(); gotoModal(currentCertIdx + 1); });

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!modal?.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') gotoModal(currentCertIdx - 1);
  if (e.key === 'ArrowRight') gotoModal(currentCertIdx + 1);
});

// Touch/swipe support
let touchStartX = 0;
modal?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
modal?.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 50) gotoModal(dx < 0 ? currentCertIdx + 1 : currentCertIdx - 1);
});

console.log('%c🚀 Portfolio by Subiksha Venugopal', 'color: #a855f7; font-size: 18px; font-weight: bold;');
console.log('%c📧 vsubikshavsubiksha@gmail.com', 'color: #3b82f6; font-size: 14px;');
console.log('%c📞 +91 90430 50664', 'color: #10b981; font-size: 14px;');

/* ============================================================
   PRIVACY & SECURITY SETTINGS
   ============================================================ */

// Prevent Right Click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Prevent Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  // Disable F12
  if (e.key === 'F12' || e.keyCode === 123) {
    e.preventDefault();
  }
  // Disable Ctrl+U / Cmd+U (View Source)
  if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
    e.preventDefault();
  }
  // Disable Ctrl+Shift+I / Cmd+Option+I (Dev Tools)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
    e.preventDefault();
  }
  // Disable Ctrl+Shift+J / Cmd+Option+J (Dev Tools Console)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'j' || e.key === 'J')) {
    e.preventDefault();
  }
  // Disable Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
    e.preventDefault();
  }
  // Disable Print Screen (PrtScrn)
  if (e.key === 'PrintScreen' || e.keyCode === 44) {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText(''); // Clear clipboard
  }
  // Disable Win+Shift+S (Snipping Tool on Windows)
  if (e.metaKey && e.shiftKey && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText('');
  }
});

// Disable Image Dragging
document.addEventListener('dragstart', (e) => {
  if (e.target.nodeName === 'IMG') {
    e.preventDefault();
  }
});

// Disable Text Selection globally via JS
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');

// Check local storage for theme preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

themeToggle?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('portfolio-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('portfolio-theme', 'light');
  }
});

/* ============================================================
   PROJECT DETAILS MODAL
   ============================================================ */
let projectsData = {};

const pm = document.getElementById('projectModal');
const pmClose = document.getElementById('projectModalClose');
const pmBackdrop = document.getElementById('projectModalBackdrop');
const pmImg = document.getElementById('pmImg');
const pmTitle = document.getElementById('pmTitle');
const pmDesc = document.getElementById('pmDesc');
const pmBadges = document.getElementById('pmBadges');
const pmTech = document.getElementById('pmTech');
const pmLiveLink = document.getElementById('pmLiveLink');
const pmGithubLink = document.getElementById('pmGithubLink');

async function fetchGitHubProjects() {
  const grid = document.getElementById('github-projects-grid');
  const loader = document.getElementById('projectsLoader');
  
  if (!grid) return;

  try {
    const response = await fetch('https://api.github.com/users/subiksha00/repos?sort=updated&per_page=6');
    if (!response.ok) throw new Error('Failed to fetch projects');
    const repos = await response.json();
    
    // Clear loader
    grid.innerHTML = '';
    
    repos.forEach((repo, index) => {
      // Store in projectsData for modal
      projectsData[repo.name] = {
        title: repo.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        desc: repo.description || 'A project developed and maintained by Subiksha V.',
        tech: repo.language ? [repo.language] : ['Code'],
        badges: repo.topics && repo.topics.length > 0 ? repo.topics : ['GitHub'],
        img: '', // Placeholder
        liveLink: repo.homepage || '',
        githubLink: repo.html_url
      };

      // Generate Card HTML
      const delay = index * 0.1;
      const card = document.createElement('div');
      card.className = `project-card reveal-left visible`;
      card.style.animationDelay = `${delay}s`;
      card.innerHTML = `
        <div class="project-glow"></div>
        <div class="project-number">0${index + 1}</div>
        <div class="project-header">
          <div class="project-icon">📁</div>
          <div class="project-badges">
            ${projectsData[repo.name].badges.slice(0, 2).map(b => `<span class="project-badge">${b}</span>`).join('')}
          </div>
        </div>
        <h3 class="project-title">${projectsData[repo.name].title}</h3>
        <p class="project-desc">${projectsData[repo.name].desc.substring(0, 150)}${projectsData[repo.name].desc.length > 150 ? '...' : ''}</p>
        <div class="project-tech">
          ${projectsData[repo.name].tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <button class="project-link open-project-modal" data-project="${repo.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Re-attach event listeners for modals
    attachModalListeners();

  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    if (loader) loader.innerHTML = '<p>Error loading projects. Please check my GitHub profile directly!</p>';
  }
}

function attachModalListeners() {
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectsData[projectId];
      if (!data) return;

      pmTitle.textContent = data.title;
      pmDesc.textContent = data.desc;
      
      // Set image or hide if empty
      if (data.img) {
        pmImg.src = data.img;
        pmImg.style.display = 'block';
      } else {
        pmImg.removeAttribute('src');
        pmImg.style.display = 'none';
        pmImg.parentElement.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.5rem; opacity: 0.5;">Project Preview Coming Soon</div>';
      }

      pmBadges.innerHTML = data.badges.map(b => `<span>${b}</span>`).join('');
      pmTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
      
      pmLiveLink.href = data.liveLink;
      if (data.liveLink) {
        pmLiveLink.style.display = 'inline-flex';
      } else {
        pmLiveLink.style.display = 'none';
      }

      pmGithubLink.href = data.githubLink;

      pm.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

// Fetch on load
window.addEventListener('DOMContentLoaded', fetchGitHubProjects);

function closeProjectModal() {
  pm.classList.remove('open');
  document.body.style.overflow = '';
}

pmClose?.addEventListener('click', closeProjectModal);
pmBackdrop?.addEventListener('click', closeProjectModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && pm?.classList.contains('open')) {
    closeProjectModal();
  }
});
