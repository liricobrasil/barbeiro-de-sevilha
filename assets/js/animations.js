// Animações de entrada por scroll + contador animado das stats da Companhia.

const ENTRY_SELECTORS = [
  '.section-header',
  '.artist-card',
  '.aria-card',
  '.pillar',
  '.stat-card',
  '.maestro-feature',
  '.info-card',
  '.equipe-col',
].join(', ');

export function initEntryAnimations() {
  const elements = document.querySelectorAll(ENTRY_SELECTORS);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

export function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const original = el.textContent;
        const target = parseInt(original, 10);
        if (!Number.isNaN(target)) animateCounter(el, target, 1200, original);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => observer.observe(el));
}

function animateCounter(el, end, duration, finalText) {
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(end * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = finalText;
  }

  requestAnimationFrame(tick);
}
