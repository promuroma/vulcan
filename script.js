gsap.registerPlugin(ScrollTrigger);

// HERO animation
gsap.from(".hero h1", {
  opacity: 0,
  y: -40,
  duration: 1
});

gsap.from(".hero p", {
  opacity: 0,
  y: 20,
  delay: 0.3,
  duration: 1
});

// SECTIONS fade in
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    duration: 0.8
  });
});

// CARDS animation
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".card",
    start: "top 85%"
  },
  opacity: 0,
  y: 30,
  stagger: 0.2
});

// NAVBAR animation
gsap.from(".navbar", {
  y: -50,
  opacity: 0,
  duration: 1
});

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}