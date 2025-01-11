document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Dropdown functionality
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const menuTitle = item.querySelector('.menu-title');
        
        menuTitle.addEventListener('click', () => {
            // Close other open menus
            menuItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current menu
            item.classList.toggle('active');
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    // Get modal elements
    const modal = document.getElementById('eligibilityModal');
    const btn = document.getElementById('eligibilityBtn');
    const span = document.getElementsByClassName('close-modal')[0];

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    // Close modal
    span.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    }

    const cards = document.querySelectorAll('.highlight-card');
    const dots = document.querySelectorAll('.nav-dot');
    const container = document.querySelector('.highlight-cards');
    let currentIndex = 2; // Start with eligibility card (index 2)

    function updateSlider(index) {
        if (index < 0 || index >= cards.length) return;
        
        currentIndex = index;
        
        // Remove active class from all cards and dots
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current card and dot
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        
        // Calculate and apply transform
        const cardWidth = cards[0].offsetWidth;
        const containerWidth = container.parentElement.offsetWidth;
        const gap = 48; // 3rem gap
        const offset = (containerWidth / 2) - (cardWidth / 2) - (cardWidth * currentIndex + currentIndex * gap);
        container.style.transform = `translateX(${offset}px)`;
    }

    // Add click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Initialize with eligibility card
    updateSlider(2);  // Initialize with index 2 (Eligibility)

    // Handle scroll events for card navigation
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            if (e.deltaY > 0) {
                updateSlider(Math.min(currentIndex + 1, cards.length - 1));
            } else {
                updateSlider(Math.max(currentIndex - 1, 0));
            }
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        }
    }, { passive: false });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            updateSlider(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
            updateSlider(currentIndex + 1);
        }
    });

    // Touch swipe functionality
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', () => {
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < cards.length - 1) {
                updateSlider(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                updateSlider(currentIndex - 1);
            }
        }
    });

    // Mouse drag functionality
    let isDragging = false;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });

    container.addEventListener('mouseup', () => {
        if (!isDragging) return;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < cards.length - 1) {
                updateSlider(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                updateSlider(currentIndex - 1);
            }
        }
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#800000"
        },
        "shape": {
          "type": "circle"
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#800000",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.6
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });

    // Course Level Cards Scrolling
    document.addEventListener('DOMContentLoaded', function() {
        const courseGrid = document.querySelector('.course-grid');
        const cards = document.querySelectorAll('.course-level-card');
        
        if (!courseGrid || cards.length === 0) return;

        // Set initial active card
        cards[0].classList.add('active');

        // Update active card on scroll
        let isScrolling;
        courseGrid.addEventListener('scroll', function() {
            window.clearTimeout(isScrolling);

            isScrolling = setTimeout(function() {
                const centerX = courseGrid.offsetLeft + courseGrid.clientWidth / 2;
                
                let closestCard = null;
                let closestDistance = Infinity;

                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const cardCenterX = rect.left + rect.width / 2;
                    const distance = Math.abs(centerX - cardCenterX);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestCard = card;
                    }
                });

                cards.forEach(card => card.classList.remove('active'));
                if (closestCard) {
                    closestCard.classList.add('active');
                }
            }, 50);
        });

        // Handle wheel scrolling
        courseGrid.addEventListener('wheel', function(e) {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                e.preventDefault();
                courseGrid.scrollLeft += e.deltaY;
            }
        });
    });

    // Add Student Life modal functionality
    const studentLifeModal = document.getElementById('studentLifeModal');
    const studentLifeCloseBtn = studentLifeModal.querySelector('.close-modal');

    studentLifeCloseBtn.onclick = function() {
        studentLifeModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == studentLifeModal) {
            studentLifeModal.style.display = "none";
        }
    }

    // Add FAQ modal functionality
    const faqModal = document.getElementById('faqModal');
    const faqCloseBtn = faqModal.querySelector('.close-modal');

    faqCloseBtn.onclick = function() {
        faqModal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    // Update window click handler to handle both modals
    window.onclick = function(event) {
        if (event.target == studentLifeModal) {
            studentLifeModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
        if (event.target == faqModal) {
            faqModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    // Add FAQ questions retractable functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const wasActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle the clicked item
            if (!wasActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Prevent modal content scroll from affecting main page
    document.querySelectorAll('.modal-content').forEach(modal => {
        modal.addEventListener('wheel', (e) => {
            e.stopPropagation();
        });
    });

    // When opening FAQ modal
    document.querySelector('button[onclick="document.getElementById(\'faqModal\').style.display=\'block\'"]')
        .addEventListener('click', () => {
            document.body.style.overflow = 'hidden';
        });

    // Testimonials slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-arrows .prev');
    const nextBtn = document.querySelector('.testimonial-arrows .next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active');
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
        });

        testimonialDots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        testimonialCards[index].style.transform = 'translateX(0)';
        testimonialCards[index].style.opacity = '1';
        testimonialDots[index].classList.add('active');
    }

    // Add click handlers for testimonial navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Add click handlers for testimonial arrows
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-advance testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Initialize first testimonial
    showTestimonial(0);
});
