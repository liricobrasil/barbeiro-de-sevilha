// Efeito tilt 3D nos cards: o card "se inclina" na direção do mouse,
// como se reagisse ao olhar do usuário. Aplica perspective + rotateX/Y
// e preserva a rotação base (--rot) dos polaroids.

const TILT_INTENSITY = 8;     // graus máximos de inclinação
const PERSPECTIVE = 1000;     // px (maior = inclinação mais sutil)

const SELECTOR = [
  '.aria-card',
  '.artist-card',
  '.info-card',
  '.pillar',
  '.stat-card',
].join(', ');

function getBaseRot(el) {
  return getComputedStyle(el).getPropertyValue('--rot').trim() || '0deg';
}

export function initCardTilt() {
  const cards = document.querySelectorAll(SELECTOR);
  if (!cards.length) return;

  cards.forEach((card) => {
    let scheduled = false;
    let mouseX = 0;
    let mouseY = 0;

    card.addEventListener('mouseenter', () => {
      // Desliga transition pra o card seguir o mouse instantaneamente
      card.style.transition = 'transform 0s';
    });

    card.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (scheduled) return;
      scheduled = true;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        // Posição normalizada do mouse em relação ao centro (-1 a +1)
        const dx = (mouseX - rect.left - cx) / cx;
        const dy = (mouseY - rect.top - cy) / cy;

        // Eixo X é controlado pelo Y do mouse (mouse em cima → card inclina pra trás)
        const rotX = dy * -TILT_INTENSITY;
        // Eixo Y é controlado pelo X do mouse (mouse na direita → card vira pra direita)
        const rotY = dx * TILT_INTENSITY;

        const baseRot = getBaseRot(card);

        card.style.transform =
          `perspective(${PERSPECTIVE}px) ` +
          `rotateX(${rotX}deg) ` +
          `rotateY(${rotY}deg) ` +
          `rotate(${baseRot})`;

        scheduled = false;
      });
    });

    card.addEventListener('mouseleave', () => {
      // Religa transition pra a volta ao neutro ser suave (CSS retoma o controle)
      card.style.transition = '';
      card.style.transform = '';
    });
  });
}
