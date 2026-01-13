/**
 * Portfolio Website JavaScript
 * Handles interactivity for navigation, animations, and mobile menu
 * Author: Jaruwan Sungsuwan Portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initSkillBars();
    initActiveNavHighlight();
    initNavbarScrollEffect();
});

/**
 * Mobile Navigation Toggle
 * Handles hamburger menu click for mobile devices
 */
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on nav links
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(function(item) {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/**
 * Smooth Scroll for Navigation Links
 * Provides smooth scrolling effect when clicking nav links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                // Scroll to top if href is "#"
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 * Adds fade-in animation to elements as they enter viewport
 */
function initScrollAnimations() {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll(
        '.section, .timeline-item, .skill-category, .experience-card, .project-card, .certification-card, .contact-item, .about-text, .about-stats'
    );
    
    animatedElements.forEach(function(element) {
        element.classList.add('fade-in');
    });
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Remove from observing list after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * Skill Bars Animation
 * Animates skill bars when they enter viewport
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create intersection observer for skill bars
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                
                // Reset width to 0 first, then animate to final value
                entry.target.style.width = '0%';
                
                setTimeout(function() {
                    entry.target.style.width = width;
                }, 100);
                
                // Remove from observing list after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all skill bars
    skillBars.forEach(function(skillBar) {
        observer.observe(skillBar);
    });
}

/**
 * Active Navigation Highlight
 * Highlights current section in navigation based on scroll position
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(function(navItem) {
                    navItem.classList.remove('active');
                    
                    if (navItem.getAttribute('href') === '#' + sectionId) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', highlightNavItem);
    
    // Initial call
    highlightNavItem();
}

/**
 * Navbar Scroll Effect
 * Changes navbar appearance on scroll
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional - currently disabled)
        // Uncomment below code to enable hide/show behavior
        /*
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleScroll);
}

/**
 * Utility Functions
 * Additional helper functions for various interactions
 */

// Add loading animation completion class when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add active class styles for navigation (optional CSS required)
// This can be extended with additional CSS in the styles.css file

/**
 * Console Welcome Message
 * Displays welcome message in console for developers
 */
console.log(
    '%c Welcome to Jaruwan Sungsuwan\'s Portfolio! ',
    'background: #2563eb; color: white; padding: 10px; font-size: 14px; border-radius: 5px;'
);

console.log(
    '%c Built with HTML, CSS, and JavaScript ',
    'background: #1f2937; color: #9ca3af; padding: 8px; font-size: 12px; border-radius: 5px;'
);
