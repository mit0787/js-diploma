function forms() {
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
}

module.exports = forms;