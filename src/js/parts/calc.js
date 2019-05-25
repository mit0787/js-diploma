function calc() {
  // калькулятор
  let size = document.getElementById('size'),
    material = document.getElementById('material'),
    options = document.getElementById('options'),
    promocode = document.querySelector('.promocode'),
    price = document.querySelector('.calc-price'),
    sizePrice = 0,
    materialPrice = 0,
    optionsPrice = 0,
    promo = 0,
    defaultValue = price.innerHTML;

  size.addEventListener('change', function () {
    sizePrice = +this.value;
    let sum = (sizePrice + materialPrice + optionsPrice) * (100 - promo) / 100;
    if (materialPrice > 0 && !isNaN(sizePrice) && !isNaN(materialPrice)) {
      price.innerHTML = sum;
    } else {
      price.innerHTML = defaultValue;
    }
  });

  material.addEventListener('change', function () {
    materialPrice = +this.value;
    let sum = (sizePrice + materialPrice + optionsPrice) * (100 - promo) / 100;
    if (sizePrice > 0 && !isNaN(sizePrice) && !isNaN(materialPrice)) {
      price.innerHTML = sum;
    } else {
      price.innerHTML = defaultValue;
    }
  });

  options.addEventListener('change', function () {
    optionsPrice = +this.value;
    if (isNaN(optionsPrice)) {
      optionsPrice = 0;
    }
    let sum = (sizePrice + materialPrice + optionsPrice) * (100 - promo) / 100;
    if (sizePrice > 0 && materialPrice > 0) {
      price.innerHTML = sum;
    }
  });

  promocode.addEventListener('input', function () {
    if (this.value === 'IWANTPOPART') {
      promo = 30;
    } else {
      promo = 0;
    }
    let sum = (sizePrice + materialPrice + optionsPrice) * (100 - promo) / 100;
    if (sizePrice > 0 && materialPrice > 0) {
      price.innerHTML = sum;
    }
  });
}

module.exports = calc;