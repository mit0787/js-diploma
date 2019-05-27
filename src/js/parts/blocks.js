function blocks() {
  let styleBlock = document.querySelectorAll('.styles-2'),
    btnStyles = document.querySelector('.button-styles');

  btnStyles.addEventListener('click', function () {
    this.style.display = 'none';
    styleBlock.forEach((item) => {
      item.style.display = 'block';
    });
  });
}

module.exports = blocks;