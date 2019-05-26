function blocks() {
  // подгрузка блоков
  let styleBlock = document.querySelectorAll('.styles-block'),
    btnStyles = document.querySelector('.button-styles');

  btnStyles.addEventListener('click', function () {
    this.style.display = 'none';
    styleBlock.forEach((item) => {
      let styleParent = item.parentNode;
      if (styleParent.classList.contains('styles-2')) {
        styleParent.classList.remove(...styleParent.classList);
        styleParent.classList.add(...styleBlock[0].parentNode.classList);
      }
    });
  });
}

module.exports = blocks;