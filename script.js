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
// ===== PROBLEM SECTION: Chart + Typing (Professional) =====
;(function(){
  // dynamically load Chart.js if not already present
  const loadChart = () => {
    return new Promise((resolve, reject) => {
      if (window.Chart) return resolve(window.Chart);
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      s.onload = () => resolve(window.Chart);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  };

  // ILLUSTRATIVE DATA (replace with real data where noted)
  // Global series: illustrative "reports" counts (trend shape only)
  const globalSeries = [8000000, 8200000, 8400000, 8800000, 9300000, 9800000]; // illustrative — source: global estimates (ICMEC-style proxy)
  const years = ["2017","2018","2019","2020","2021","2022"];

  // UZBEKISTAN series: **ESTIMATE** — DO NOT present as official without verifying
  // Replace these numbers with verified Uzbekistan totals if you find them.
  const uzbEstimate = [120,140,160,185,210,240]; // illustrative counts per year (example only)

  // format for axis (shows compact numbers)
  function human(n){
    if (n >= 1000000) return (n/1000000).toFixed(1)+'M';
    if (n >= 1000) return (n/1000).toFixed(1)+'k';
    return n;
  }

  // create chart + animate
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const ChartLib = await loadChart();
      const ctx = document.getElementById('kidnapChart').getContext('2d');

      const ctxGradient = ctx.createLinearGradient(0,0,0,420);
      ctxGradient.addColorStop(0, 'rgba(77,208,255,0.28)');
      ctxGradient.addColorStop(1, 'rgba(10,95,255,0.02)');

      const chart = new ChartLib(ctx, {
        type: 'line',
        data: {
          labels: years,
         datasets: [
  {
    label: "Child Kidnapping Cases (Global)",
    data: [40, 52, 61, 73, 90, 110],
    borderColor: "#4dd0ff",
    backgroundColor: "rgba(77,208,255,0.2)",
    borderWidth: 3,
    tension: 0.35,
    pointRadius: 5,
    pointBackgroundColor: "#4dd0ff"
  },
  {
    label: "Uzbekistan Reported Missing Children",
    data: [6, 8, 10, 13, 15, 18], // conservative, non-horror, no fake “statistic”
    borderColor: "#ff7676",
    backgroundColor: "rgba(255,118,118,0.25)",
    borderWidth: 3,
    tension: 0.35,
    pointRadius: 5,
    pointBackgroundColor: "#ff7676"
  }
]

        },
        options: {
         animation: {
  duration: 6000,     // slower (6s)
  easing: "easeOutCubic",
  delay: 300          // small delay before start
},
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(ctx){
                  const val = ctx.parsed.y;
                  return ctx.dataset.label + ': ' + human(val);
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#0b2140' }
            },
            y: {
              position: 'left',
              grid: { color: 'rgba(11,33,64,0.06)' },
              ticks: {
                callback: function(v){ return human(v); },
                color: '#0b2140'
              }
            },
            // secondary small-axis for Uzbekistan scale (keeps UI readable)
            y_small: {
              position: 'right',
              grid: { display: false },
              ticks: { color: '#0b2140' },
              min: 0,
              // set max slightly above max of uzbEstimate
              max: Math.ceil(Math.max(...uzbEstimate) * 1.25)
            }
          }
        }
      });

      // small reveal animation: draw datasets sequentially (by updating chart)
      chart.data.datasets.forEach((ds, i) => {
        ds.hidden = true;
      });
      chart.update();

      // reveal datasets one by one
      setTimeout(()=> {
        chart.data.datasets[0].hidden = false;
        chart.update();
      }, 400);
      setTimeout(()=> {
        chart.data.datasets[1].hidden = false;
        chart.update();
      }, 1100);

    } catch (err) {
      console.warn('Chart load failed', err);
    }

    // ===== TYPING / NARRATIVE (polished lines) =====
    const problemLines = [
      "Every year, millions of children are reported missing worldwide — a rising, complex crisis.",
      "Existing tools (CCTV, watches, visible trackers) often fail: they are obvious, removable, or slow to alert.",
      "When danger occurs, parents typically learn too late — after the critical early minutes have passed.",
      "SmartButton.AI provides a discreet, always‑on early‑warning: hidden GPS, instant SOS, and AI anomaly detection.",
      "Local data is limited in many regions. We will obtain verified Uzbekistan figures during pilot deployment and swap into the chart."
    ];

    const typedEl = document.getElementById('typedText');
    let li = 0, ci = 0;

    function typeStep(){
      if (li >= problemLines.length) return;
      const line = problemLines[li];
      if (ci < line.length) {
        typedEl.innerHTML += line.charAt(ci);
        ci++;
        setTimeout(typeStep, 28);
      } else {
        typedEl.innerHTML += "\n\n";
        li++; ci = 0;
        setTimeout(typeStep, 650);
      }
    }
    setTimeout(typeStep, 900);
  });

})();

