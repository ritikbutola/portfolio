// Navigation active state
document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.replace(/^\//, '');

    navLinks.forEach(link => {
        // Remove all active classes first
        link.classList.remove('active');
        
        // Add active class to current page link
        const linkPath = link.getAttribute('href').replace(/^\//, '');
        if (
            linkPath === currentPath ||
            (linkPath === 'index.html' && (currentPath === '' || currentPath === 'index.html')) ||
            (linkPath.endsWith('.html') && currentPath === linkPath.replace('.html', '')) ||
            (currentPath.endsWith('.html') && linkPath === currentPath.replace('.html', ''))
        ) {
            link.classList.add('active');
        }
    });

    // Add hover effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-3px)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0)';
        });
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize elements with opacity 0 and transform
    const elements = document.querySelectorAll('.intro-text, .profile-card, .video-wrapper');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial scroll check
    window.dispatchEvent(new Event('scroll'));

    // Project card click selection
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove .selected from all cards
            projectCards.forEach(c => c.classList.remove('selected'));
            // Add .selected to the clicked card
            this.classList.add('selected');
        });
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('light-theme')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.intro-text, .profile-card, .video-wrapper');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}); 