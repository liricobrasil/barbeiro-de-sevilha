// Entry point. Inicializa todos os módulos quando o DOM está pronto.

import { initEntryAnimations, initStatsCounter } from './animations.js';
import { initNav, initSmoothScroll } from './nav.js';
import { initCastBios } from './cast-bio.js';
import { initScrollUI } from './ui.js';

function init() {
  initEntryAnimations();
  initStatsCounter();
  initNav();
  initSmoothScroll();
  initCastBios();
  initScrollUI();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
