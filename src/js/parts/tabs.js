function tabs() {
  // табы
  let tab = document.querySelectorAll('.portfolio-menu li'),
    portfolio = document.querySelector('.portfolio-menu'),
    tabContent = document.querySelectorAll('.portfolio-block'),
    noPortfolio = document.querySelector('.portfolio-no');

  portfolio.addEventListener('click', (event) => {
    let target = event.target,
      tabClass = target.classList[0];
    noPortfolio.style.display = 'block';
    tab.forEach((item) => {
      item.classList.remove('active');
    });
    target.classList.add('active');
    tabContent.forEach((item) => {
      item.style.display = 'none';
      if (item.classList.contains(tabClass)) {
        item.style.display = 'block';
        noPortfolio.style.display = 'none';
      }
    });
  });
}

module.exports = tabs;