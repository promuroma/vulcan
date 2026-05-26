gsap.registerPlugin(ScrollTrigger);

function splitText(element) {
  if (!element) return [];
  const text = element.textContent.trim();
  const words = text.split(' ');
  element.textContent = '';

  const wrapper = document.createElement('span');
  wrapper.className = 'split-text';
  wrapper.style.whiteSpace = 'pre-wrap';

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'split-word';
    span.textContent = word + (index < words.length - 1 ? ' ' : '');
    wrapper.append(span);
  });

  element.append(wrapper);
  return wrapper.querySelectorAll('.split-word');
}

const heroTitleWords = splitText(document.querySelector('.hero h1'));
const heroCopyWords = splitText(document.querySelector('.hero-text'));

const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTimeline
  .from('.eyebrow', { opacity: 0, y: 20, duration: 0.65 })
  .from(heroTitleWords, { opacity: 0, y: 32, stagger: 0.05, duration: 0.7 }, '-=0.45')
  .from(heroCopyWords, { opacity: 0, y: 24, stagger: 0.04, duration: 0.55 }, '-=0.45')
  .from('.hero-actions .button', { opacity: 0, y: 20, stagger: 0.12, duration: 0.45 }, '-=0.35');

// SECTIONS fade in
gsap.utils.toArray('.section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    duration: 0.8
  });
});

// CARDS animation
gsap.from('.card', {
  scrollTrigger: {
    trigger: '.card',
    start: 'top 85%'
  },
  opacity: 0,
  y: 30,
  stagger: 0.2
});

// NAVBAR animation
gsap.from('.navbar', {
  y: -50,
  opacity: 0,
  duration: 1
});

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');

if (menuToggle && navLinks && menuOverlay) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    menuOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    navLinks.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fermer le menu');
    menuOverlay.classList.add('open');
    document.body.classList.add('menu-open');
  };

  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  menuOverlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}