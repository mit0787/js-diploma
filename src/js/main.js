'use strict';

window.addEventListener('DOMContentLoaded', function () {
  // верхний слайдер
  let mainSlider = document.querySelectorAll('.main-slider-item'),
    currentSlide = 0,
    slideInterval = setInterval(flipSlide, 5000);

    showSlide(mainSlider);

  function flipSlide() {
    mainSlider[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % mainSlider.length;
    mainSlider[currentSlide].style.display = 'block';
  }

  function showSlide(slides) {
    slides.forEach(item => {
      item.style.display = 'none';
    });
    slides[0].style.display = 'block';
  }

  // нижний слайдер
  let feedbackSlider = document.querySelectorAll('.feedback-slider-item'),
    prev = document.querySelector('.main-prev-btn'),
    next = document.querySelector('.main-next-btn'),
    slideIndex = 1,
    interval = setInterval(plusSlides, 5000, 1);

    showSlide(feedbackSlider);

    function showSlides(n) {
      if (n > feedbackSlider.length) {
        slideIndex = 1;
      }
  
      if (n < 1) {
        slideIndex = feedbackSlider.length;
      }
      feedbackSlider.forEach((item) => item.style.display = 'none');
      feedbackSlider[slideIndex - 1].style.display = 'block';
    }
  
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
  
    prev.addEventListener('click', () => {
      plusSlides(-1);
      feedbackSlider.forEach((item) => item.classList.remove('fadeInleft'));
      feedbackSlider.forEach((item) => item.classList.add('fadeInRight'));
    });
  
    next.addEventListener('click', () => {
      plusSlides(1);
      feedbackSlider.forEach((item) => item.classList.remove('fadeInRight'));
      feedbackSlider.forEach((item) => item.classList.add('fadeInLeft'));
    });

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

  let height = document.body.getBoundingClientRect().bottom;

  window.addEventListener('scroll', openGift);

  function openGift() {
    if (window.pageYOffset + window.outerHeight > height) {
      openModal(popupGift);
      btnsGift.style.display = 'none';
      window.removeEventListener('scroll', openGift);
    }
  }

  function openModal(modal) {
    modal.style.display = 'block';
    clearTimeout(consultTimer);
    document.body.style.overflow = 'hidden';
    window.removeEventListener('scroll', openGift);
  }
});