/*
  Back to top button scroll interaction.
 */

(() => {
  const backToTop = document.querySelector('.back-to-top');
  const topOffset = 60;
  let lastKnownScrollPosition = 0;
  let ticking = false;

  const scrollFunction = (inverted) => {
    if (inverted) {
      backToTop.classList.add('js-scrolled');
    } else {
      backToTop.classList.remove('js-scrolled');
    }
  }

  document.addEventListener('scroll', (e) => {
    scrollCompare = window.scrollY <= lastKnownScrollPosition;
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        scrollFunction(scrollCompare && window.scrollY > topOffset);
        ticking = false;
      });

      ticking = true;
    }
  });

})();
