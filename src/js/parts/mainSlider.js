function mainSlider() {
  // верхний слайдер
  let mainSlider = document.querySelectorAll('.main-slider-item'),
    currentSlide = 0,
    slideInterval = setInterval(flipSlide, 5000);

    showSlide(mainSlider);

  function flipSlide() {
    mainSlider[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % mainSlider.length;
    mainSlider[currentSlide].style.display = 'block';
  }

  function showSlide(slides) {
    slides.forEach(item => {
      item.style.display = 'none';
    });
    slides[0].style.display = 'block';
  }

  // нижний слайдер
  let feedbackSlider = document.querySelectorAll('.feedback-slider-item'),
    prev = document.querySelector('.main-prev-btn'),
    next = document.querySelector('.main-next-btn'),
    slideIndex = 1,
    interval = setInterval(plusSlides, 5000, 1);

    showSlide(feedbackSlider);

    function showSlides(n) {
      if (n > feedbackSlider.length) {
        slideIndex = 1;
      }
  
      if (n < 1) {
        slideIndex = feedbackSlider.length;
      }
      feedbackSlider.forEach((item) => item.style.display = 'none');
      feedbackSlider[slideIndex - 1].style.display = 'block';
    }
  
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
  
    prev.addEventListener('click', () => {
      plusSlides(-1);
    });
  
    next.addEventListener('click', () => {
      plusSlides(1);
    });

}

module.exports = mainSlider;