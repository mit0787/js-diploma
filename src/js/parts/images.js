function images() {
  // смена картинок при наведении или тапе
  let imageBlock = document.querySelectorAll('.sizes-block');

  document.addEventListener('mouseover', (event) => {
    let target = event.target;
    imageBlock.forEach((item, i) => {
      let image = item.querySelector('img[class^="size"]');
      let text = item.querySelectorAll('p');
      if (item.contains(event.target)) {
        image.src = `./img/sizes-${i+1}-1.png`;
        text.forEach((item) => {
          item.style.display = 'none';
          if (item.classList.contains('sizes-hit')) {
            item.style.display = 'block';
          }
        });
      } else {
        image.src = `./img/sizes-${i+1}.png`;
        text.forEach((item) => {
          item.style.display = 'block';
        });
      }
    });
  });
}

module.exports = images;