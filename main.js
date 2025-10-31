// Project data
const projects = [
    {
        title: "Project 1",
        description: "A brief description of project 1 and its key features.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "#"
    },
    {
        title: "Project 2",
        description: "A brief description of project 2 and its key features.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "#"
    },
    {
        title: "Project 3",
        description: "A brief description of project 3 and its key features.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["Python", "Django", "PostgreSQL"],
        link: "#"
    }
];

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const projectGrid = document.querySelector('.project-grid');
const contactForm = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Create project cards
function createProjectCards() {
    projectGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="skill-tags">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="cta-button" target="_blank" rel="noopener noreferrer">View Project</a>
            </div>
        </div>
    `).join('');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Form submission handling
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    createProjectCards();
    updateActiveNavLink();
    currentYear.textContent = new Date().getFullYear();
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    contactForm.addEventListener('submit', handleFormSubmit);
    
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

    // Close mobile menu when clicking a nav link
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});