document.addEventListener('DOMContentLoaded', () => {
  // ===== Navbar scroll effect =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== Mobile nav toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ===== Active nav link on scroll =====
  const sections = document.querySelectorAll('.section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => item.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(section => observerNav.observe(section));

  // ===== Scroll animations =====
  const animElements = document.querySelectorAll('.animate-on-scroll');
  const observerAnim = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animElements.forEach(el => observerAnim.observe(el));

  // ===== Weight bar animation =====
  const weightBars = document.querySelectorAll('.weight-bar-fill');
  const observerBars = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.dataset.width;
        setTimeout(() => {
          target.style.width = width + '%';
        }, 200);
      }
    });
  }, { threshold: 0.5 });

  weightBars.forEach(bar => observerBars.observe(bar));

  // ===== Solution toggles =====
  document.querySelectorAll('.solution-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const exercise = btn.closest('.exercise');
      const solution = exercise.querySelector('.solution-content');
      const isOpen = solution.classList.contains('open');
      
      solution.classList.toggle('open');
      btn.classList.toggle('open');
      btn.textContent = isOpen ? 'הצג פתרון' : 'הסתר פתרון';
    });
  });

  // ===== Quiz answer toggles =====
  document.querySelectorAll('.quiz-item').forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.quiz-answer');
      answer.classList.toggle('open');
    });
  });

  // ===== Back to top =====
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== KaTeX rendering =====
  renderMathInPage();
});

function renderMathInPage() {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      trust: true
    });
  }
}
