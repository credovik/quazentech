// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Handle click for email contact in sidebar
const emailContact = document.querySelector('.email-contact');
if (emailContact) {
    emailContact.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default action in case it's being blocked
        window.location.href = 'mailto:info@quazentech.com';
    });
}

// Form validation
const contactForm = document.querySelector('.contact-form-alt');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        const subject = encodeURIComponent(`Service Inquiry: ${service}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        window.location.href = `mailto:info@quazentech.com?subject=${subject}&body=${body}`;

        // Optionally, show a confirmation message after the mail client is opened
        alert('Thank you for your message! Your email client should open shortly with the pre-filled message.');
        contactForm.reset();
    });
}

// Function to animate text word by word
function animateTextWordByWord(textElement) {
    const words = textElement.querySelectorAll('span');
    words.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(100%)';
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, index * 100); // Reduced delay between words to 100ms
    });
}

// Function to show text with animation
function showText(textElement) {
    textElement.style.display = 'block';
    textElement.style.opacity = '0';
    setTimeout(() => {
        textElement.style.opacity = '1';
        animateTextWordByWord(textElement);
    }, 50); // Reduced delay to 50ms
}

// Function to hide text
function hideText(textElement) {
    textElement.style.opacity = '0';
    setTimeout(() => {
        textElement.style.display = 'none';
    }, 300); // Reduced hide delay to 300ms
}

// Function to animate hero section
function animateHeroSection() {
    const firstText = document.querySelector('.hero-text');
    const secondText = document.querySelector('.hero-text.second-text');
    
    if (!firstText || !secondText) return;

    // Initial setup
    firstText.style.display = 'block';
    secondText.style.display = 'none';
    
    // Start the animation cycle immediately
    function cycleText() {
        showText(firstText);
        setTimeout(() => {
            hideText(firstText);
            setTimeout(() => {
                showText(secondText);
                setTimeout(() => {
                    hideText(secondText);
                    setTimeout(() => {
                        cycleText(); // Restart the cycle immediately
                    }, 50); // Reduced delay between cycles to 50ms
                }, 3000); // Keep text visible for 3 seconds
            }, 50); // Reduced delay between hide and show to 50ms
        }, 3000); // Keep text visible for 3 seconds
    }

    // Start the cycle
    cycleText();
}

// // Initialize animations when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     // Delay the start of the hero text animation after the preloader is gone
//     const preloader = document.querySelector('.preloader');
    
//     // Hide preloader after content is loaded
//     window.addEventListener('load', () => {
//         setTimeout(() => {
//             preloader.classList.add('fade-out');
//             setTimeout(() => {
//                 preloader.style.display = 'none';
//                 animateHeroSection(); // Start hero section animation after preloader is hidden
//             }, 500);
//         }, 2500); // Show preloader for 2.5 seconds
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', () => {
        // Fade out the preloader smoothly
        preloader.classList.add('fade-out');

        // Wait for the fade-out transition to finish before hiding
        preloader.addEventListener('transitionend', () => {
            preloader.style.display = 'none';
            animateHeroSection(); // Start animations after preloader is fully hidden
        });
    });
});
// Testimonials Slider
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const slideGroups = document.querySelectorAll('.testimonial-slide-group');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    let isAnimating = false;
    const slideInterval = 6000; // 6 seconds between slides

    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update slides
        slideGroups.forEach((group, index) => {
            group.classList.toggle('active', index === currentIndex);
        });

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Auto slide
    function autoSlide() {
        currentIndex = (currentIndex + 1) % slideGroups.length;
        updateSlider();
    }

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentIndex === index) return;
            currentIndex = index;
            updateSlider();
        });
    });

    // Start auto sliding
    let interval = setInterval(autoSlide, slideInterval);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    slider.addEventListener('mouseleave', () => {
        interval = setInterval(autoSlide, slideInterval);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < slideGroups.length - 1) {
                // Swipe left
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right
                currentIndex--;
            }
            updateSlider();
        }
    }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialsSlider();
    // ... existing initialization code ...
});
