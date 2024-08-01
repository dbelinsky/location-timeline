import { parseCoordinates } from './utils';

// eslint-disable-next-line import/prefer-default-export
export function showModal(message, callback, text) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
      <div class="modal__content">
        <div class="modal__text">Что-то пошло не так</div>
        <p class="modal__text">${message}</p>
        <div class="modal__text">Широта и долгота через запятую</div>
        <input type="text" class="manual__coords" placeholder="51.50851, -0.12572">
        <div class="modal__btns">
          <button class="close__modal">Отмена</button>
          <button class="submit__coords">Ок</button>
        </div>
      </div>
  `;
  document.body.appendChild(modal);

  document.querySelector('.submit__coords').addEventListener('click', () => {
    const coordsInput = document.querySelector('.manual__coords').value.trim();
    try {
      const coords = parseCoordinates(coordsInput);
      callback(text, coords);
      document.body.removeChild(modal);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Неверный формат координат.');
    }
  });

  document.querySelector('.close__modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}
