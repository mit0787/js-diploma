function modals() {
  // закрытие модальных окон
  let btnClose = document.querySelectorAll('.popup-close');

  btnClose.forEach((item) => {
    let modal = item.parentNode.parentNode.parentNode;

    item.addEventListener('click', () => {
      closePopup();
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closePopup();
      }
    });

    function closePopup() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  function openModal(modal) {
    modal.style.display = 'block';
    clearTimeout(consultTimer);
    document.body.style.overflow = 'hidden';
    window.removeEventListener('scroll', openGift);
  }

  // модальное окно заказа
  let btnsDesign = document.querySelectorAll('.button-design'),
    popupDesign = document.querySelector('.popup-design');

  btnsDesign.forEach((item) => {
    item.addEventListener('click', () => {
      openModal(popupDesign);
    });
  });

  // модальное окно консультации с открытием по таймеру
  let btnsConsult = document.querySelectorAll('.button-consultation'),
    popupConsult = document.querySelector('.popup-consultation'),
    consultTimer = setTimeout(openConsult, 60000);

  btnsConsult.forEach((item) => {
    item.addEventListener('click', () => {
      openModal(popupConsult);
    });
  });

  function openConsult() {
    openModal(popupConsult);
  }

  // модальное окно подарка с открытием при прокрутке вниз страницы
  let btnsGift = document.querySelector('.fixed-gift'),
    popupGift = document.querySelector('.popup-gift');

  btnsGift.addEventListener('click', () => {
    openModal(popupGift);
    btnsGift.style.display = 'none';
  });

  let height = document.body.getBoundingClientRect().bottom + window.pageYOffset;

  window.addEventListener('scroll', openGift);

  function openGift() {
    if (window.pageYOffset + window.outerHeight > height) {
      openModal(popupGift);
      btnsGift.style.display = 'none';
      window.removeEventListener('scroll', openGift);
    }
  }
}

module.exports = modals;