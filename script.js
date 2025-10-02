// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const searchForm = document.getElementById('search-form');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('show');
}

function closeMobileMenu() {
    navMenu.classList.remove('show');
}

// Event listeners for mobile menu
if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
}

if (navClose) {
    navClose.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Header scroll effect
function handleHeaderScroll() {
    if (window.scrollY >= 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    if (inputElement) {
        inputElement.style.borderColor = 'var(--color-error)';
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = '';
    }
}

function validateContactForm() {
    let isValid = true;
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Clear previous errors
    clearError('name');
    clearError('email');
    clearError('phone');
    clearError('message');
    
    // Validate name
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (phone === '') {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

// Search form functionality
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const destination = document.getElementById('destination').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        
        if (!destination) {
            alert('Please select a destination');
            return;
        }
        
        if (!checkin) {
            alert('Please select a check-in date');
            return;
        }
        
        if (!checkout) {
            alert('Please select a check-out date');
            return;
        }
        
        if (new Date(checkin) >= new Date(checkout)) {
            alert('Check-out date must be after check-in date');
            return;
        }
        
        // Simulate search
        alert(`Searching for packages to ${destination} from ${checkin} to ${checkout}...`);
        
        // Scroll to packages section
        const packagesSection = document.getElementById('packages');
        if (packagesSection) {
            packagesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Hero CTA button functionality
const heroCTA = document.querySelector('.hero__cta');
if (heroCTA) {
    heroCTA.addEventListener('click', function() {
        const packagesSection = document.getElementById('packages');
        if (packagesSection) {
            packagesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Package and destination card interactions
function addCardInteractions() {
    // Package cards
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        const bookButton = card.querySelector('.btn');
        if (bookButton) {
            bookButton.addEventListener('click', function(e) {
                e.preventDefault();
                const packageName = card.querySelector('.package-card__title').textContent;
                const packagePrice = card.querySelector('.package-card__price').textContent;
                alert(`Booking ${packageName} for ${packagePrice}. You will be redirected to the booking page.`);
            });
        }
    });
    
    // Destination cards - add click to learn more
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const destinationName = card.querySelector('.destination-card__title').textContent;
            alert(`Learn more about ${destinationName}. You will be redirected to the destination details page.`);
        });
    });
    
    // Service cards - add hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
}

// Initialize card interactions
addCardInteractions();

// Set minimum date for date inputs (today)
function setMinimumDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput) {
        checkinInput.min = today;
        checkinInput.addEventListener('change', function() {
            if (checkoutInput) {
                checkoutInput.min = this.value;
            }
        });
    }
    
    if (checkoutInput) {
        checkoutInput.min = today;
    }
}

// Initialize date constraints
setMinimumDates();

// Scroll animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.package-card, .destination-card, .service-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// Prevent body scroll when mobile menu is open
function handleBodyScroll() {
    if (navMenu.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Listen for menu toggle
const menuObserver = new MutationObserver(handleBodyScroll);
if (navMenu) {
    menuObserver.observe(navMenu, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
        document.body.style.overflow = '';
    }
}

window.addEventListener('resize', handleResize);

// Add loading state to buttons
function addButtonLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                
                // Remove loading state after animation
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 300);
            }
        });
    });
}

// Initialize button states
addButtonLoadingStates();

// Form real-time validation
function addRealTimeValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && value.length >= 2) {
                clearError('name');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && validateEmail(value)) {
                clearError('email');
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && validatePhone(value)) {
                clearError('phone');
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && value.length >= 10) {
                clearError('message');
            }
        });
    }
}

// Initialize real-time validation
addRealTimeValidation();

// Add testimonial rotation (optional enhancement)
function rotateTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonialCards.length > 1) {
        setInterval(() => {
            testimonialCards.forEach((card, index) => {
                if (index === currentTestimonial) {
                    card.style.transform = 'scale(1.05)';
                    card.style.zIndex = '10';
                } else {
                    card.style.transform = 'scale(1)';
                    card.style.zIndex = '1';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        }, 5000);
    }
}

// Initialize testimonial rotation
setTimeout(rotateTestimonials, 2000);

console.log('TravelLite website initialized successfully!');
