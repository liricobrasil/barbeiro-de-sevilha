// UI: barra de progresso de leitura, botão "voltar ao topo", parallax leve no hero.
// Tudo coalescido num único listener de scroll com rAF throttling.

const BACK_TO_TOP_THRESHOLD = 400;
const PARALLAX_FADE_DISTANCE = 600;

export function initScrollUI() {
  const progress = document.querySelector('.reading-progress');
  const backToTop = document.querySelector('.back-to-top');
  const heroContent = document.querySelector('.hero-content');

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    if (progress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progress.style.width = ratio + '%';
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > BACK_TO_TOP_THRESHOLD);
    }

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = String(Math.max(0, 1 - scrollY / PARALLAX_FADE_DISTANCE));
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    },
    { passive: true }
  );

  update();
}
