// Particle.js Configuration
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#7c3aed"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.3,
      "random": true
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#7c3aed",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "resize": true
    }
  },
  "retina_detect": true
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('nav.navbar');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navbar.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && navbar.classList.contains('active')) {
    menuToggle.classList.remove('active');
    navbar.classList.remove('active');
  }
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll reveal
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      if (entry.target.classList.contains('skills-progress')) {
        entry.target.style.width = entry.target.dataset.progress + '%';
      }
    }
  });
}, observerOptions);

// Observe all sections and elements with reveal class
document.querySelectorAll('section, .reveal').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});