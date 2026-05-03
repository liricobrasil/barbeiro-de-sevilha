// Cards mostram teaser da bio (3 linhas via line-clamp). Click no botão "Ler mais"
// abre um modal estilizado com a bio completa.

export function initCastBios() {
  const cards = document.querySelectorAll('.artist-card');
  const modal = document.querySelector('.bio-modal');
  if (!cards.length || !modal) return;

  const card     = modal.querySelector('.bio-modal-card');
  const photo    = modal.querySelector('.bio-modal-photo');
  const role     = modal.querySelector('.bio-modal-role');
  const name     = modal.querySelector('.bio-modal-name');
  const voice    = modal.querySelector('.bio-modal-voice');
  const bio      = modal.querySelector('.bio-modal-bio');
  const closeBtn = modal.querySelector('.bio-modal-close');

  let lastFocused = null;

  function open(sourceCard) {
    lastFocused = document.activeElement;

    const photoStyle = sourceCard.querySelector('.artist-photo-frame')?.getAttribute('style') || '';
    photo.setAttribute('style', photoStyle);

    role.textContent  = sourceCard.querySelector('.role-badge-sm')?.textContent.trim() || '';
    name.textContent  = sourceCard.querySelector('.artist-card-name')?.textContent.trim() || '';
    voice.textContent = sourceCard.querySelector('.artist-voice-badge')?.textContent.trim() || '';
    bio.innerHTML     = sourceCard.querySelector('.artist-card-bio')?.innerHTML || '';

    modal.hidden = false;
    document.body.classList.add('modal-open');
    closeBtn.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  cards.forEach((c) => {
    const body = c.querySelector('.artist-card-body');
    if (!body) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bio-toggle';
    btn.textContent = 'Ler mais';
    btn.setAttribute(
      'aria-label',
      `Ler bio completa de ${c.querySelector('.artist-card-name')?.textContent.trim() || 'artista'}`
    );
    btn.addEventListener('click', () => open(c));
    body.appendChild(btn);
  });

  closeBtn.addEventListener('click', close);

  // Click fora do card-modal fecha
  modal.addEventListener('click', (e) => {
    if (!card.contains(e.target)) close();
  });

  // ESC fecha
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}
