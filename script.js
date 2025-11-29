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
// ===== PROBLEM SECTION V6: Chart + Typing animation (professional) =====
(function(){
  // load Chart.js if not present
  async function loadChartLib(){
    if (window.Chart) return window.Chart;
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      s.onload = () => resolve(window.Chart);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // Chart + typing setup
  document.addEventListener('DOMContentLoaded', async () => {
    // TYPING TEXT LINES (polished, concise)
    const lines = [
      "Global context: public reports estimate around 8–10 million children reported missing worldwide each year.",
      "Local reality: verified, centralized national statistics for Uzbekistan are limited or not publicly centralized — a data gap we must acknowledge.",
      "Why this matters: when incidents happen (or when children go off expected routes), parents and schools often learn too late.",
      "SmartButton.AI addresses both extremes: discreet early‑warning for critical emergencies and day‑to‑day school‑time presence & geofence monitoring for peace of mind."
    ];

    // typing element
    const typedEl = document.getElementById('typedText');

    // start typing only after chart is drawn a bit, to sync visuals
    // load chart lib, then draw chart
    try {
      await loadChartLib();

      // DATA (transparent): global counts (millions) — public estimates (e.g., ICMEC)
      const years = ['2019','2020','2021','2022','2023','2024'];
      const globalSeries = [8.1, 8.4, 8.7, 9.1, 9.6, 10.1]; // millions (estimate from public reports)
      // Uzbekistan series here is a *safety-tech adoption % illustrative estimate* (not crime counts)
      // This is intentionally an adoption/coverage proxy to show local gap and opportunity.
      const uzbAdoptionPct = [3, 5, 8, 12, 18, 26]; // illustrative (%)

      const ctx = document.getElementById('safetyChart').getContext('2d');

      // gradient for global area
      const grad = ctx.createLinearGradient(0,0,0,420);
      grad.addColorStop(0, 'rgba(59,130,246,0.14)');
      grad.addColorStop(1, 'rgba(59,130,246,0.02)');

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            {
              label: 'Global estimates (millions)',
              data: globalSeries,
              borderColor: '#3b82f6',
              backgroundColor: grad,
              borderWidth: 3.5,
              tension: 0.36,
              pointRadius: 5,
              pointBackgroundColor: '#3b82f6',
              yAxisID: 'y_global',
              fill: true
            },
            {
              label: 'Uzbekistan adoption (%) — illustrative',
              data: uzbAdoptionPct,
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239,68,68,0.06)',
              borderWidth: 3,
              tension: 0.32,
              pointRadius: 4,
              pointBackgroundColor: '#ef4444',
              borderDash: [6,4],
              yAxisID: 'y_percent'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 8000, easing: 'easeOutQuart' }, // slower, smoother
          plugins: {
            legend: { position: 'top', labels: { font: { size: 13 } } },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(ctx){
                  if (ctx.dataset.yAxisID === 'y_percent') {
                    return ctx.dataset.label + ': ' + ctx.parsed.y + '%';
                  } else {
                    return ctx.dataset.label + ': ~' + ctx.parsed.y + 'M';
                  }
                }
              }
            }
          },
          interaction: { mode: 'index', intersect: false },
          scales: {
            y_global: {
              type: 'linear',
              position: 'left',
              grid: { color: 'rgba(11,33,64,0.06)' },
              ticks: {
                callback: v => v + 'M',
                color: '#0b2140'
              }
            },
            y_percent: {
              type: 'linear',
              position: 'right',
              grid: { display: false },
              ticks: {
                callback: v => v + '%',
                color: '#0b2140'
              },
              min: 0,
              max: Math.max(...uzbAdoptionPct) * 1.3
            },
            x: {
              grid: { display: false },
              ticks: { color: '#0b2140' }
            }
          }
        }
      });

      // Reveal datasets sequentially for emphasis (fade-in)
      chart.data.datasets.forEach(ds => ds.hidden = true);
      chart.update();

      setTimeout(()=> { chart.getDatasetMeta(0).hidden = false; chart.update(); }, 400);
      setTimeout(()=> { chart.getDatasetMeta(1).hidden = false; chart.update(); }, 1400);

      // Typing animation: start after a short delay to sync with chart reveal
      let li = 0, ci = 0;
      function typeStep(){
        if (li >= lines.length) return;
        const line = lines[li];
        if (ci < line.length) {
          typedEl.innerHTML += line.charAt(ci);
          ci++;
          setTimeout(typeStep, 45);
        } else {
          typedEl.innerHTML += "\n\n";
          li++; ci = 0;
          setTimeout(typeStep, 650);
        }
      }
      // small delay to let chart appear first
      setTimeout(() => typeStep(), 1200);

    } catch (err) {
      console.error('Problem section script error', err);
    }
  });
})();


