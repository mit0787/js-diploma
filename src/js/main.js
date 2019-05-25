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

  showSlides(slideIndex);

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
    clearInterval(interval);
    interval = setInterval(plusSlides, 5000, 1);
    if (n > 0) {
      feedbackSlider.forEach((item) => item.classList.remove('fadeInRight'));
      feedbackSlider.forEach((item) => item.classList.add('fadeInLeft'));
    } else {
      feedbackSlider.forEach((item) => item.classList.remove('fadeInleft'));
      feedbackSlider.forEach((item) => item.classList.add('fadeInRight'));
    }
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1);
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

  let height = document.body.getBoundingClientRect().height,
    timeout = setTimeout(() => {
      if (window.pageYOffset < screen.height) {
        console.log(window.pageYOffset);
        window.addEventListener('scroll', openGift);
      }    
    }, 1000);

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
  sendMain(mainForm);

  function sendMain(form) {
    let popup = document.querySelector('.popup-design').cloneNode(true),
      popupContent = popup.querySelector('.popup-content'),
      btn = popup.querySelector('.popup-close'),
      input = form.getElementsByTagName('input');

    popup.querySelector('form').style.display = 'none';
    document.body.appendChild(popup);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      popup.style.display = 'block';
      popupContent.appendChild(statusMassege);
      postData(form)
        .then(() => statusMassege.innerHTML = message.success)
        .catch(() => statusMassege.innerHTML = message.failure);
      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    });

    btn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

  function sendForm(form) {
    let popupContent = form.parentNode,
      input = form.getElementsByTagName('input'),
      btnClose = form.parentNode.querySelector('.popup-close');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      popupContent.appendChild(statusMassege);
      form.style.display = "none";
      postData(form)
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

  // валидация
  let phoneInput = document.querySelectorAll('input[name="phone"]'),
    nameInput = document.querySelectorAll('input[name="name"]'),
    emailInput = document.querySelectorAll('input[name="email"]'),
    textArea = document.querySelectorAll('.input-text');

  phoneInput.forEach(function (item) {
    item.setAttribute('maxlength', '12');
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^\d\+]/g, '');
    });
  });

  nameInput.forEach(function (item) {
    item.setAttribute('maxlength', '50');
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^А-Яа-я]/g, '');
    });
  });

  emailInput.forEach(function (item) {
    item.setAttribute('maxlength', '50');
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[А-Яа-я]/g, '');
    });
  });

  textArea.forEach(function (item) {
    item.setAttribute('maxlength', '150');
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[A-Za-z]/g, '');
    });
  });

  //бургер-меню
  let burgerMenu = document.querySelector('.burger-menu'),
    btnBurger = document.querySelector('.burger');

  document.addEventListener('click', (event) => {
    if (screen.width <= 768) {
      let target = event.target;
      if (btnBurger.contains(event.target)) {
        burgerMenu.classList.toggle('burger-menu_active');
      } else if (!burgerMenu.contains(event.target)) {
        burgerMenu.classList.remove('burger-menu_active');
      }
    }
  });

  window.addEventListener('resize', () => {
    if (screen.width > 768) {
      burgerMenu.classList.remove('burger-menu_active');
    }
  });

  //аккордеон
  let btnAccord = document.querySelectorAll('.accordion-heading'),
    blockAccord = document.querySelectorAll('.accordion-block');

  blockAccord.forEach((item) => {
    item.style.display = 'none';
  });

  btnAccord.forEach((item, i) => {
    item.addEventListener('click', () => {
      blockAccord.forEach((item) => {
        item.style.display = 'none';
      });
      blockAccord[i].style.display = 'block';
    });
  });

  // смена картинок при наведении или тапе
  let imageBlock = document.querySelectorAll('.sizes-block');

  document.addEventListener('mouseover', (event) => {
    let target = event.target;
    imageBlock.forEach((item, i) => {
      let image = item.querySelector('[class^="size"]');
      if (item.contains(event.target)) {
        image.src = `./img/sizes-${i+1}-1.png`;
      } else {
        image.src = `./img/sizes-${i+1}.png`;
      }
    });
  });

  // табы
  let tab = document.querySelectorAll('.portfolio-menu li'),
    portfolio = document.querySelector('.portfolio-menu'),
    tabContent = document.querySelectorAll('.portfolio-block'),
    noPortfolio = document.querySelector('.portfolio-no');
    
  portfolio.addEventListener('click', (event) => {
    let target = event.target,
    tabClass = target.classList[0];
    noPortfolio.style.display = 'block';
    tab.forEach((item) => {
      item.classList.remove('active');
    });
    target.classList.add('active');
    tabContent.forEach((item) => {
      item.style.display = 'none';
      if (item.classList.contains(tabClass)) {
        item.style.display = 'block';
        noPortfolio.style.display = 'none';
      }
    });
  });
});