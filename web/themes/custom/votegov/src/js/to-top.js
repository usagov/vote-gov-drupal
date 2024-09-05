const btt = document.querySelector('.back-to-top');

let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollComp) {
  if (scrollComp) {
    btt.classList.add('js-scrolled');
  } else {
    btt.classList.remove('js-scrolled');
  }
}

document.addEventListener('scroll', function(e) {
  scrollCompare = window.scrollY - lastKnownScrollPosition;
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(scrollCompare < 0 && window.scrollY > 60);
      ticking = false;
    });

    ticking = true;
  }
});
