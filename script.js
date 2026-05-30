document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SIMULATED SYSTEM LOADER
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');
  
  let progress = 0;
  const loadingPhrases = [
    "INITIALIZING SYSTEM...",
    "LOADING ARSENAL...",
    "COMPILING PROJECTS...",
    "ESTABLISHING NEURAL LINK...",
    "SYSTEM READY."
  ];

  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5; // Random increments
    
    if (progress > 100) progress = 100;
    
    // Update progress bar
    if (loaderFill) loaderFill.style.width = `${progress}%`;
    
    // Rotate terminal phrases based on progress
    if (loaderText) {
      if (progress < 25) loaderText.innerText = loadingPhrases[0];
      else if (progress < 50) loaderText.innerText = loadingPhrases[1];
      else if (progress < 75) loaderText.innerText = loadingPhrases[2];
      else if (progress < 95) loaderText.innerText = loadingPhrases[3];
      else loaderText.innerText = loadingPhrases[4];
    }

    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
      }, 400); // Slight delay for smooth visual transition
    }
  }, 100);

  // 2. NAV NAVIGATION GLOW EFFECT ON SCROLL
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. HAMBURGER MOBILE MENU TOGGLE
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // 4. TECH SKILLS BARS FILL ANIMATION ON SCROLL
  const skillBars = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // 5. ANIMATING STATS/NUMBERS INCREMENT
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        let current = 0;
        const increment = target / 30; // Speed control
        
        const updateCount = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current);
            setTimeout(updateCount, 25);
          } else {
            entry.target.innerText = target;
          }
        };
        updateCount();
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statObserver.observe(num));

  // 6. CUSTOM CURSOR & TRAIL ANIMATIONS (Desktop Only)
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');

  if (window.innerWidth > 768 && cursor && cursorTrail) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Slight smooth delay layout for trail
      setTimeout(() => {
        cursorTrail.style.left = `${e.clientX}px`;
        cursorTrail.style.top = `${e.clientY}px`;
      }, 50);
    });
  }

  // 7. INTERSECTION OBSERVER FOR REVEAL EFFECTS
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Handle custom delay properties if present
        const delay = entry.target.getAttribute('data-delay');
        if (delay) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
        } else {
          entry.target.classList.add('visible');
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // 8. HERO AUTO-TYPING TERMINAL EFFECTS
  const typedTextSpan = document.getElementById('typedText');
  const roles = ["Frontend Developer", "Computer Science Student", "UI/UX Enthusiast"];
  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < roles[roleIndex].length) {
      if(typedTextSpan) typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if(typedTextSpan) typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 500);
    }
  }

  if(typedTextSpan) setTimeout(type, 1500);

  // 9. BACKGROUND BACKGROUND HERO PARTICLES CANVAS
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 10. CONTACT FORM SUBMISSION TEST LOGIC
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    });
  }
});