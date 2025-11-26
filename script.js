
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

        // Animate skill progress bars when they come into view
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                }
            });
        }, observerOptions);

        // Observe skills section
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });

      
        // Add typing effect to hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

       // Enhanced Mobile menu functionality
function toggleMobileMenu() {
    console.log('Toggle mobile menu called'); // Debug log
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (!mobileNav || !menuBtn) {
        console.error('Mobile nav elements not found');
        return;
    }
    
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
        console.log('Mobile menu opened');
    } else {
        body.style.overflow = '';
        console.log('Mobile menu closed');
    }
}

function closeMobileMenu() {
    console.log('Close mobile menu called'); // Debug log
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (!mobileNav || !menuBtn) {
        console.error('Mobile nav elements not found');
        return;
    }
    
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('active');
    body.style.overflow = '';
    console.log('Mobile menu closed');
}

// ✅ Attach event listeners instead of using inline onclick
window.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('#mobileNav a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});


        // Make functions globally available
        window.toggleMobileMenu = toggleMobileMenu;
        window.closeMobileMenu = closeMobileMenu;

       
        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                typeWriter(heroTitle, originalText, 150);
            }
            
         
          
          
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileNav = document.getElementById('mobileNav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (mobileNav && menuBtn && !menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Add fadeOut animation for cursor trail
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        document.head.appendChild(style);

        // Contact Form
        const form = document.getElementById("contactForm");
        const status = document.getElementById("form-status");

        if (form) {
            form.addEventListener("submit", async function(event) {
                event.preventDefault();
                const data = new FormData(form);
                const name = data.get("name");

                try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        body: data,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        status.style.color = "green";
                        status.innerHTML = "✅ Thank you <b>${name}</b>, I'll contact you soon!"
                        form.reset();
                    } else {
                        status.style.color = "red";
                        status.innerHTML = "❌ Oops! Something went wrong.";
                    }
                } catch (error) {
                    status.style.color = "red";
                    status.innerHTML = "❌ Error! Please try again.";
                }
            });
        }
       