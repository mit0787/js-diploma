function images() {
  // смена картинок при наведении или тапе
  let imageBlock = document.querySelectorAll('.sizes-block');

  document.addEventListener('mouseover', (event) => {
    let target = event.target;
    imageBlock.forEach((item, i) => {
      let image = item.querySelector('[class^="size"]');
      if (item.contains(event.target)) {
        image.src = `./img/sizes-${i+1}-1.png`;
      } else {
        image.src = `./img/sizes-${i+1}.png`;
      }
    });
  });
}

module.exports = images;