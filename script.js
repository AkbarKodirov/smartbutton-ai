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

// your old JS code above…

// ===== ANIMATED LINE CHART =====
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('kidnapChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["2015", "2017", "2019", "2021", "2023", "2025"],
      datasets: [{
        label: "Child Kidnapping Cases (Global)",
        data: [40, 52, 61, 73, 90, 110],
        borderColor: "#4dd0ff",
        backgroundColor: "rgba(77,208,255,0.2)",
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 5,
        pointBackgroundColor: "#4dd0ff"
      }]
    },
    options: {
      animation: {
        duration: 2200,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: "white" },
          grid: { display: false }
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.1)" }
        }
      }
    }
  });
});

// ===== TYPING ANIMATION =====
const problemLines = [
  "Every year, child kidnapping incidents continue to rise worldwide.",
  "Current safety tools like watches and CCTVs fail in real‑time situations.",
  "Most devices are easily removed, disabled, or too noticeable.",
  "Parents receive alerts only after danger has already escalated.",
  "We need a hidden, intelligent early‑warning system — before harm happens."
];

let lineIndex = 0;
let charIndex = 0;
const typedText = document.getElementById("typedText");

function typeEffect() {
  if (lineIndex < problemLines.length) {
    if (charIndex < problemLines[lineIndex].length) {
      typedText.innerHTML += problemLines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 35);
    } else {
      typedText.innerHTML += "<br><br>";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeEffect, 600);
    }
  }
}

window.onload = () => {
  setTimeout(typeEffect, 1000);
};
