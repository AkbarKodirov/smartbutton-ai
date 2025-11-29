// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Simple fade-in on scroll (lightweight, no external lib)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity .8s ease, transform .8s ease';
  observer.observe(el);
});

// Smooth scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});
// ————— NEW: Problem Section Animations —————
const problemObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate diagram steps sequentially
      document.querySelectorAll('.diagram-item').forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 300);
      });

      // Animate text paragraphs
      document.querySelectorAll('.reveal-text').forEach((p, index) => {
        setTimeout(() => {
          p.classList.add('visible');
        }, 800 + index * 400);
      });

      problemObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const problemSection = document.querySelector('#problem');
  if (problemSection) problemObserver.observe(problemSection);
});
