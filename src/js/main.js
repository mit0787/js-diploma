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

  // формы
  let mainForm = document.getElementById('main-form'),
    consultForm = document.getElementById('consultation-form'),
    designForm = document.getElementById('design-form'),
    statusMassege = document.createElement('div'),
    message = {
      loading: 'Загрузка...',
      success: '<div style="display: flex; flex-direction: column; justify-content: space-between;"><p style="margin: auto;">Спасибо! Скоро мы с вами свяжемся</p><img  style="width: 70px; margin: auto;" src="./img/face.svg"></div>',
      failure: '<div style="display: flex; flex-direction: column; justify-content: space-between;"><p style="margin: auto;">Что-то пошло не так...</p><img  style="width: 70px; margin: auto;" src="./img/error.svg"></div>',
    };

  sendForm(designForm);
  sendForm(consultForm);

  function sendForm(form) {
    let popupContent = form.parentNode,
      input = form.getElementsByTagName('input'),
      btnClose = form.parentNode.querySelector('.popup-close');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      popupContent.appendChild(statusMassege);
      form.style.display = "none";
      postData(consultForm)
        .then(() => statusMassege.innerHTML = message.success)
        .catch(() => statusMassege.innerHTML = message.failure);
      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    });
    btnClose.addEventListener('click', function () {
      form.style.display = "block";
      statusMassege.innerHTML = "";
    });
  }

  function postData(data) {
    let formData = new FormData(data);
    let obj = {};
    formData.forEach(function (value, key) {
      obj[key] = value;
    });
    let json = JSON.stringify(obj);

    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/json; charset = utf-8');
      request.onreadystatechange = function () {
        if (request.readyState < 4) {
          statusMassege.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200) {
          resolve();
        } else {
          reject();
        }
      };
      request.send(json);
    });
  }
});