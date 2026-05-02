// =============================================
// O BARBEIRO DE SEVILHA — PROGRAMA MUSICAL
// Interatividade e Animações
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // INTERSECTION OBSERVER — Animações de entrada
  // =============================================
  const animatedElements = document.querySelectorAll(
    '.section-header, .artist-card, .aria-card, .pillar, .stat-card, .maestro-feature, .info-card, .equipe-col'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Também animar maestro-feature e info-card
  const extraElements = document.querySelectorAll('.maestro-feature, .info-card, .equipe-col');
  extraElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // =============================================
  // NAVEGAÇÃO ATIVA — Highlight conforme scroll
  // =============================================
  const navLinks = document.querySelectorAll('.hero-nav a');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // =============================================
  // NAVEGAÇÃO FIXA — Aparecer após hero
  // =============================================
  const heroNav = document.querySelector('.hero-nav');
  const hero = document.querySelector('.hero');

  function handleNavFixed() {
    const heroHeight = hero ? hero.offsetHeight : 0;
    if (window.scrollY > heroHeight - 60) {
      heroNav.classList.add('nav-fixed');
    } else {
      heroNav.classList.remove('nav-fixed');
    }
  }

  window.addEventListener('scroll', handleNavFixed);

  // =============================================
  // CARDS DE ARTISTAS — Expansão de bio
  // =============================================
  const artistCards = document.querySelectorAll('.artist-card');

  artistCards.forEach((card) => {
    const bio = card.querySelector('.artist-card-bio');
    if (bio) {
      const fullText = bio.innerHTML;
      const shortText = truncateText(bio.textContent, 120);

      if (bio.textContent.length > 120) {
        bio.innerHTML = shortText + '...';
        bio.dataset.full = fullText;
        bio.dataset.short = shortText + '...';
        bio.dataset.expanded = 'false';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'bio-toggle';
        toggleBtn.textContent = 'Ler mais';
        toggleBtn.setAttribute('aria-expanded', 'false');

        toggleBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          const isExpanded = bio.dataset.expanded === 'true';
          if (isExpanded) {
            bio.innerHTML = bio.dataset.short;
            toggleBtn.textContent = 'Ler mais';
            bio.dataset.expanded = 'false';
            toggleBtn.setAttribute('aria-expanded', 'false');
          } else {
            bio.innerHTML = bio.dataset.full;
            toggleBtn.textContent = 'Ler menos';
            bio.dataset.expanded = 'true';
            toggleBtn.setAttribute('aria-expanded', 'true');
          }
        });

        card.querySelector('.artist-card-body').appendChild(toggleBtn);
      }
    }
  });

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim();
  }

  // =============================================
  // ÁRIAS — Tooltip com informação adicional
  // =============================================
  const ariaCards = document.querySelectorAll('.aria-card');
  ariaCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.borderLeftColor = 'var(--vinho)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.borderLeftColor = 'var(--dourado)';
    });
  });

  // =============================================
  // CONTADOR ANIMADO — Stats da Companhia
  // =============================================
  const statNumbers = document.querySelectorAll('.stat-number');

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          // Apenas anima se for número puro
          if (!isNaN(parseInt(text))) {
            animateCounter(el, 0, parseInt(text), 1200);
          }
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => statsObserver.observe(el));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    const originalText = el.textContent;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = originalText;
      }
    }

    requestAnimationFrame(update);
  }

  // =============================================
  // SCROLL SUAVE — Para links de âncora
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 60;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // =============================================
  // GALERIA — Placeholder interativo
  // =============================================
  const galleryItems = document.querySelectorAll('.gallery-placeholder');
  galleryItems.forEach((item) => {
    item.style.cursor = 'pointer';
    item.title = 'Foto a ser adicionada';
  });

  // =============================================
  // INDICADOR DE PROGRESSO DE LEITURA
  // =============================================
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #6B1A2A, #C9A84C);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease;
  `;
  document.body.prepend(progressBar);

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // =============================================
  // BOTÃO VOLTAR AO TOPO
  // =============================================
  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.title = 'Voltar ao topo';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 46px;
    height: 46px;
    background: var(--vinho, #6B1A2A);
    color: #F5E6B8;
    border: 2px solid #C9A84C;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(44,24,16,0.3);
  `;

  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.style.opacity = '1';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'translateY(10px)';
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backToTop.addEventListener('mouseenter', function () {
    this.style.background = '#C9A84C';
    this.style.color = '#4A0F1C';
  });

  backToTop.addEventListener('mouseleave', function () {
    this.style.background = 'var(--vinho, #6B1A2A)';
    this.style.color = '#F5E6B8';
  });

  // =============================================
  // NAVEGAÇÃO FIXA — CSS adicional
  // =============================================
  const style = document.createElement('style');
  style.textContent = `
    .hero-nav.nav-fixed {
      position: fixed;
      bottom: auto;
      top: 0;
      z-index: 1000;
      background: rgba(44, 24, 16, 0.95);
      backdrop-filter: blur(15px);
      box-shadow: 0 2px 20px rgba(0,0,0,0.3);
    }

    .hero-nav a.active {
      background: rgba(201, 168, 76, 0.2);
      color: #F5E6B8;
    }

    .bio-toggle {
      background: none;
      border: 1px solid #6B1A2A;
      color: #6B1A2A;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.78rem;
      cursor: pointer;
      margin-top: 8px;
      font-family: 'EB Garamond', serif;
      transition: all 0.2s ease;
    }

    .bio-toggle:hover {
      background: #6B1A2A;
      color: #F5E6B8;
    }

    .maestro-feature.visible,
    .info-card.visible,
    .equipe-col.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // =============================================
  // EFEITO PARALLAX LEVE NO HERO
  // =============================================
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', function () {
    if (heroContent) {
      const scrolled = window.scrollY;
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
    }
  });

  console.log('🎭 O Barbeiro de Sevilha — Programa Musical carregado com sucesso!');
});
