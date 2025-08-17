
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

        // Add parallax effect to floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.floating-element');
            const speed = 0.5;

            parallax.forEach(element => {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
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

        // Mobile menu functionality
        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            mobileNav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        }

        function closeMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('active');
        }

        // Create particle system
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random starting position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                
                // Random size variation
                const size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Mouse cursor trail effect
        let mouseTrail = [];
        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });

            // Limit trail length
            if (mouseTrail.length > 20) {
                mouseTrail.shift();
            }

            // Create trail effect
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.width = '6px';
            trail.style.height = '6px';
            trail.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent)';
            trail.style.borderRadius = '50%';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.animation = 'fadeOut 0.5s ease-out forwards';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 500);
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



        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                typeWriter(heroTitle, originalText, 150);
            }
            
            // Initialize particle system
            createParticles();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileNav = document.getElementById('mobileNav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                closeMobileMenu();
            }
        });
    
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96e8fb28961bf64c',t:'MTc1NTA5NjE2OC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();


// Contact Form

const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // ⛔ stop redirect
  const data = new FormData(form);
  const name = data.get("name"); // get the name from input

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.style.color = "green";
      status.innerHTML = `✅ Thank you <b>${name}</b>, I’ll contact you soon!`;
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


//  https://formspree.io/f/mjkodywr