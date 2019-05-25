function blocks() {
  // подгрузка блоков
  let styleBlock = document.querySelectorAll('.styles-block'),
    btnStyles = document.querySelector('.button-styles');

  btnStyles.addEventListener('click', function () {
    this.style.display = 'none';
    styleBlock.forEach((item) => {
      let styleParent = item.parentNode,
        newStyles = styleBlock[0].parentNode.classList;
      if (styleParent.classList.contains('styles-2')) {
        let itemClass = styleParent.classList;
        styleParent.classList.remove(...itemClass);
        styleParent.classList.add(...newStyles);
      }
    });
  });
}

module.exports = blocks;