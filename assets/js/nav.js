// Nav do hero: scroll spy (link ativo conforme seção visível),
// nav fixa após o hero, e smooth scroll para âncoras internas.

const SCROLL_OFFSET = 60;

export function initNav() {
  const heroNav = document.querySelector('.hero-nav');
  const hero = document.querySelector('.hero');
  const navLinks = document.querySelectorAll('.hero-nav a');
  const sections = document.querySelectorAll('section[id]');

  if (!heroNav || !hero) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    if (scrollY > hero.offsetHeight - SCROLL_OFFSET) {
      heroNav.classList.add('nav-fixed');
    } else {
      heroNav.classList.remove('nav-fixed');
    }

    let currentId = '';
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 100) currentId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
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

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
