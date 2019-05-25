function forms() {
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
}

module.exports = forms;