function secondSlider() {
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
      feedbackSlider.forEach((item) => item.classList.remove('fadeInleft'));
      feedbackSlider.forEach((item) => item.classList.add('fadeInRight'));
    });
  
    next.addEventListener('click', () => {
      plusSlides(1);
      feedbackSlider.forEach((item) => item.classList.remove('fadeInRight'));
      feedbackSlider.forEach((item) => item.classList.add('fadeInLeft'));
    });
}

module.exports = secondSlider;