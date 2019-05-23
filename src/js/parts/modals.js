function modals() {
  // закрытие модальных окон
  let btnClose = document.querySelectorAll('.popup-close');

  btnClose.forEach((item) => {
    let modal = item.parentNode.parentNode.parentNode;

    item.addEventListener('click', () => {
      closePopup();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePopup();
      }
    });

    function closePopup() {
      modal.style.display = 'none';
    }
  });

  // модальное окно заказа
  let btnsDesign = document.querySelectorAll('.button-design'),
    popupDesign = document.querySelector('.popup-design');

  btnsDesign.forEach((item) => {
    item.addEventListener('click', () => {
      popupDesign.style.display = 'block';
    });
  });

  // модальное окно консультации
  let btnsConsult = document.querySelectorAll('.button-consultation'),
    popupConsult = document.querySelector('.popup-consultation');

  btnsConsult.forEach((item) => {
    item.addEventListener('click', () => {
      popupConsult.style.display = 'block';
    });
  });
}

module.exports = modals;