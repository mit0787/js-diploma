function validation() {
  // валидация
  let phoneInput = document.querySelectorAll('input[name="phone"]'),
    nameInput = document.querySelectorAll('input[name="name"]'),
    emailInput = document.querySelectorAll('input[name="email"]'),
    textArea = document.querySelectorAll('.input-text');

  phoneInput.forEach(function (item) {
    item.addEventListener("input", mask, false);
    item.addEventListener("focus", mask, false);
    item.addEventListener("blur", mask, false);
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

  function mask(event) {
    let matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
    if (event.type == "blur") {
      if (this.value.length == 2) {
        this.value = "";
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }
}

module.exports = validation;