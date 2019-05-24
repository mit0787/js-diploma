function accordion() {
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
}

module.exports = accordion;