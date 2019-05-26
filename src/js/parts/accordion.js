function accordion() {
  //аккордеон
  let btnAccord = document.querySelectorAll('.accordion-heading'),
    blockAccord = document.querySelectorAll('.accordion-block');

  blockAccord.forEach((item) => {
    item.style.display = 'none';
  });

  btnAccord.forEach((item, i) => {
    item.addEventListener('click', () => {
      btnAccord.forEach((item, i) => {
        item.classList.remove('active');
      });
      blockAccord.forEach((item) => {
        item.style.display = 'none';
      });
      item.classList.add('active');
      blockAccord[i].style.display = 'block';
    });
  });
}

module.exports = accordion;