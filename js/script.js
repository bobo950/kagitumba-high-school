// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    observer.observe(element);
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

const countOptions = {
    threshold: 0.5
};

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, countOptions);

counters.forEach(counter => {
    countObserver.observe(counter);
});

function animateCounter(element, target) {
    let count = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count).toLocaleString();
        }
    }, 30);
}

// Stream Tab Switching for Academics Page
const streamTabs = document.querySelectorAll('.stream-tab');
const streamContents = document.querySelectorAll('.stream-content');

streamTabs.forEach(btn => {
    btn.addEventListener('click', () => {
        const streamName = btn.getAttribute('data-stream');
        
        // Remove active class from all buttons
        streamTabs.forEach(b => b.classList.remove('active', 'bg-gradient-to-r', 'from-green-600', 'to-green-700'));
        streamTabs.forEach(b => b.classList.add('bg-gray-100', 'text-gray-700'));
        
        // Hide all stream contents
        streamContents.forEach(content => content.classList.add('hidden'));
        
        // Add active class to clicked button
        btn.classList.remove('bg-gray-100', 'text-gray-700');
        btn.classList.add('active', 'bg-gradient-to-r', 'from-green-600', 'to-green-700', 'text-white');
        
        // Show selected stream content
        const selectedStream = document.getElementById(streamName);
        if (selectedStream) {
            selectedStream.classList.remove('hidden');
        }
    });
});

// Tab Switching for Updates Page
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Hide all tab contents
        tabContents.forEach(content => content.classList.add('hidden'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show selected tab content
        const selectedTab = document.getElementById(tabName + '-tab');
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
        }
    });
});

// Course Filtering for Academics Page
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Filter courses
        courseCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                const cardClass = card.getAttribute('class');
                if (cardClass.includes(filterValue)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Staff Search and Filter
const staffSearch = document.getElementById('staff-search');
const deptFilter = document.getElementById('dept-filter');
const staffCards = document.querySelectorAll('.staff-card');
const sortNameBtn = document.getElementById('sort-name-btn');
const sortDeptBtn = document.getElementById('sort-dept-btn');
const clearFiltersBtn = document.getElementById('clear-filters-btn');
const staffGrid = document.getElementById('staff-grid');

let currentSort = 'default';

if (staffSearch) {
    staffSearch.addEventListener('input', filterStaff);
}

if (deptFilter) {
    deptFilter.addEventListener('change', filterStaff);
}

// Sort by Name
if (sortNameBtn) {
    sortNameBtn.addEventListener('click', () => {
        if (currentSort === 'name-asc') {
            sortStaff('name-desc');
            currentSort = 'name-desc';
        } else {
            sortStaff('name-asc');
            currentSort = 'name-asc';
        }
    });
}

// Sort by Department
if (sortDeptBtn) {
    sortDeptBtn.addEventListener('click', () => {
        if (currentSort === 'dept-asc') {
            sortStaff('dept-desc');
            currentSort = 'dept-desc';
        } else {
            sortStaff('dept-asc');
            currentSort = 'dept-asc';
        }
    });
}

// Clear Filters
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        if (staffSearch) staffSearch.value = '';
        if (deptFilter) deptFilter.value = 'all';
        sortStaff('default');
        currentSort = 'default';
        filterStaff();
    });
}

function filterStaff() {
    const searchTerm = staffSearch ? staffSearch.value.toLowerCase() : '';
    const selectedDept = deptFilter ? deptFilter.value : 'all';
    
    staffCards.forEach(card => {
        const staffName = card.querySelector('h4').textContent.toLowerCase();
        const staffRole = card.querySelector('p.text-yellow-500').textContent.toLowerCase();
        const staffDept = card.getAttribute('data-department');
        
        const matchesSearch = staffName.includes(searchTerm) || staffRole.includes(searchTerm);
        const matchesDept = selectedDept === 'all' || staffDept === selectedDept;
        
        if (matchesSearch && matchesDept) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        } else {
            card.style.display = selectedDept === 'all' && !matchesSearch ? 'none' : 'block';
            card.style.opacity = matchesSearch && matchesDept ? '1' : '0.3';
            card.style.pointerEvents = matchesSearch && matchesDept ? 'auto' : 'none';
        }
    });
}

function sortStaff(sortType) {
    if (!staffGrid) return;
    
    const cards = Array.from(staffGrid.querySelectorAll('.staff-card'));
    
    switch(sortType) {
        case 'name-asc':
            cards.sort((a, b) => {
                const nameA = a.querySelector('h4').textContent;
                const nameB = b.querySelector('h4').textContent;
                return nameA.localeCompare(nameB);
            });
            break;
        case 'name-desc':
            cards.sort((a, b) => {
                const nameA = a.querySelector('h4').textContent;
                const nameB = b.querySelector('h4').textContent;
                return nameB.localeCompare(nameA);
            });
            break;
        case 'dept-asc':
            cards.sort((a, b) => {
                const deptA = a.getAttribute('data-department');
                const deptB = b.getAttribute('data-department');
                if (deptA !== deptB) {
                    return deptA.localeCompare(deptB);
                }
                // Secondary sort by name
                const nameA = a.querySelector('h4').textContent;
                const nameB = b.querySelector('h4').textContent;
                return nameA.localeCompare(nameB);
            });
            break;
        case 'dept-desc':
            cards.sort((a, b) => {
                const deptA = a.getAttribute('data-department');
                const deptB = b.getAttribute('data-department');
                if (deptA !== deptB) {
                    return deptB.localeCompare(deptA);
                }
                // Secondary sort by name
                const nameA = a.querySelector('h4').textContent;
                const nameB = b.querySelector('h4').textContent;
                return nameA.localeCompare(nameB);
            });
            break;
        case 'default':
        default:
            // Reset to original order
            cards.sort((a, b) => {
                return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'));
            });
            break;
    }
    
    // Re-append cards in sorted order
    cards.forEach(card => staffGrid.appendChild(card));
}

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Smooth Navigation and Active Link Highlighting
const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        // Add active styling like extracurricular page
        link.classList.remove('text-white');
        link.classList.add('text-yellow-300');
        const underline = link.querySelector('span');
        if (underline) {
            underline.classList.remove('w-0', 'hover:w-full');
            underline.classList.add('w-full');
        }
    }
});

// Hero Slideshow Functionality
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.slide-indicator');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
    });
    
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('bg-yellow-400');
        indicator.classList.add('bg-white/50');
    });
    
    slides[index].classList.remove('opacity-0');
    slides[index].classList.add('opacity-100');
    
    if (indicators[index]) {
        indicators[index].classList.remove('bg-white/50');
        indicators[index].classList.add('bg-yellow-400');
    }
    
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Initialize slideshow
if (slides.length > 0) {
    showSlide(0);
    startSlideshow();
    
    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });
    
    // Pause on hover
    const slideshowContainer = document.getElementById('hero-slideshow');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
}

// Newsletter Signup (on Updates page)
const newsletterForm = document.querySelector('form:has(input[type="email"])');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Thank you for subscribing! Check your email for confirmation.');
            emailInput.value = '';
        }
    });
}

// Lazy load images (if images are added)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add keyboard accessibility for dropdown menus
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            select.form?.requestSubmit();
        }
    });
});

// Prevent form spam with simple rate limiting
const formSubmissions = new Map();

function canSubmitForm(formId) {
    const now = Date.now();
    const lastSubmission = formSubmissions.get(formId) || 0;
    const timeSinceLastSubmission = now - lastSubmission;
    
    if (timeSinceLastSubmission < 3000) { // 3 second cooldown
        return false;
    }
    
    formSubmissions.set(formId, now);
    return true;
}

// Add page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle navigation history for better back button experience
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.scrollTo(0, 0);
    }
});

// Accessibility: Announce navigation changes to screen readers
function announceNavigation(pageName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Navigated to ${pageName}`;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
}

// Print page styles
const style = document.createElement('style');
style.innerHTML = `
    @media print {
        nav, footer, .no-print {
            display: none !important;
        }
        
        body {
            line-height: 1.6;
        }
    }
`;
document.head.appendChild(style);
