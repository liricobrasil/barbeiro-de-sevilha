// Bios dos artistas: trunca em N caracteres e adiciona botão "Ler mais / Ler menos".

const TRUNCATE_AT = 180;

export function initCastBios() {
  const cards = document.querySelectorAll('.artist-card');

  cards.forEach((card) => {
    const bio = card.querySelector('.artist-card-bio');
    const body = card.querySelector('.artist-card-body');
    if (!bio || !body) return;

    const fullHTML = bio.innerHTML;
    const fullText = bio.textContent.trim();
    if (fullText.length <= TRUNCATE_AT) return;

    const shortText = fullText.slice(0, TRUNCATE_AT).trimEnd() + '…';
    bio.textContent = shortText;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'bio-toggle';
    toggle.textContent = 'Ler mais';
    toggle.setAttribute('aria-expanded', 'false');

    let expanded = false;
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      if (expanded) {
        bio.innerHTML = fullHTML;
        toggle.textContent = 'Ler menos';
      } else {
        bio.textContent = shortText;
        toggle.textContent = 'Ler mais';
      }
      toggle.setAttribute('aria-expanded', String(expanded));
    });

    body.appendChild(toggle);
  });
}
