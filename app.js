// Data
const portfolioData = {
    name: "Dhayalan Balasubramanian",
    role: "Computer Engineer",
    about: "A passionate computer engineer...",
    profilePic: "pictures/4754648_BALASUBRAMANIAN, DHAYA_2381 (2).JPG",
    social: {
        github: "https://github.com/yourusername",
        linkedin: "https://www.linkedin.com/in/dhayalan-balasubramanian-15a662263/",
    },
    projects: [
        {
            title: "Blood Oxygen Saturation Monitor",
            description: "First ever PIC 24 library for this sensor utilizing I2C communication.",
            image: "pictures/Screenshot 2024-11-19 at 9.45.29 AM.png",
            technologies: ["C", "12C Communication", "Assembly"],
            github: "https://github.com/DhayalaCode/Pulse-Ox-Monitor",
            demo: "https://github.com/DhayalaCode/Pulse-Ox-Monitor"
        },
        {
            title: "Project 2",
            description: "Mobile app development using React Native",
            image: "/api/placeholder/400/200",
            technologies: ["React Native", "Firebase"],
            github: "https://github.com/yourusername/project2",
            demo: "https://project2-demo.com"
        }
    ]
};

// DOM Elements
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('#theme-toggle');
const projectsContainer = document.querySelector('#projects-container');
const hamburgerMenu = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Initialize the website
function initializeWebsite() {
    loadProjects();
    setupEventListeners();
    setupAnimations();
    updateUserInfo();
}

// Load projects into the DOM
function loadProjects() {
    projectsContainer.innerHTML = '';
    portfolioData.projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fab fa-github"></i> GitHub
                </a>
                <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Hamburger menu
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
    e.target.reset();
}

// Setup animations
function setupAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    // Observe all animatable elements
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

// Update user information
function updateUserInfo() {
    document.querySelector('#user-name').textContent = portfolioData.name;
    document.querySelector('#user-role').textContent = portfolioData.role;
    document.querySelector('#user-about').textContent = portfolioData.about;

    // Set profile picture if available
    const profilePic = document.querySelector('#profile-pic');
    if (portfolioData.profilePic) {
        profilePic.src = portfolioData.profilePic;
    } else {
        profilePic.src = 'pictures/4754648_BALASUBRAMANIAN, DHAYA_2381 (2).JPG'; // Placeholder if no picture is set
    }

    // Update social links
    Object.entries(portfolioData.social).forEach(([platform, url]) => {
        const link = document.querySelector(`#${platform}-link`);
        if (link) link.href = url;
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Handle theme switching
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
}