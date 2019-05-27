function blocks() {
  // подгрузка блоков
  let styleBlock = document.querySelectorAll('.styles-block'),
    btnStyles = document.querySelector('.button-styles'),
    style = styleBlock[0].parentNode.className;

  btnStyles.addEventListener('click', function () {
    this.style.display = 'none';
    styleBlock.forEach((item) => {
      let parent = item.parentNode;
      parent.className = style;
    });
  });
}

module.exports = blocks;