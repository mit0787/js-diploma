function forms() {
  // формы
  let mainForm = document.getElementById('main-form'),
    consultForm = document.getElementById('consultation-form'),
    designForm = document.getElementById('design-form'),
    popup = document.querySelector('.popup-design').cloneNode(true),
    popupForm = popup.querySelector('form'),
    message = {
      loading: '<div style="display: block; min-height: 150px;"><h4 style="margin-bottom: 25px; text-align: center;">Загрузка...</h4><img  style="width: 70px; margin: auto;" src="./img/loader.gif"></div>',
      success: '<div style="display: block; min-height: 150px;"><h4 style="margin-bottom: 25px; text-align: center;">Спасибо! Скоро мы с вами свяжемся</h4><img  style="width: 70px; margin: auto;" src="./img/face.svg"></div>',
      failure: '<div style="display: block; min-height: 150px;"><h4 style="margin-bottom: 25px; text-align: center;">Что-то пошло не так...</h4><img  style="width: 70px; margin: auto;" src="./img/error.svg"></div>',
    };

  document.body.appendChild(popup);
  popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup-close')) {
      this.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  sendForm(designForm);
  sendForm(consultForm);
  sendForm(mainForm);

  function sendForm(form) {
    let input = form.getElementsByTagName('input');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      popup.style.display = 'block';
      if (form.parentNode.classList.contains('popup-content')) {
        form.parentNode.parentNode.parentNode.style.display = 'none';
      }
      postData(form)
        .then(() => popupForm.innerHTML = message.success)
        .catch(() => popupForm.innerHTML = message.failure);
      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }
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
          popupForm.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200) {
          resolve();
        } else {
          reject();
        }
      };
      request.send(json);
    });
  }
}

module.exports = forms;