// ===========================
// AG LOGISTICS & TRANSPORT
// Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ──────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── Active Nav Link ──────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Mobile Menu ───────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Scroll Reveal ─────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── Animated Counter ─────────────────────────────────
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const countersObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current  = 0;
        const step   = Math.ceil(target / 60);
        const timer  = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 20);
        countersObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countersObserver.observe(el));

  // ── Contact Form ──────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn     = form.querySelector('.form-submit');
      const success = document.getElementById('formSuccess');
      btn.disabled      = true;
      btn.innerHTML     = '<span>⏳</span> Sending…';
      setTimeout(() => {
        form.style.display    = 'none';
        success.style.display = 'block';
      }, 1400);
    });
  }

  // ── Smooth anchor scroll ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
