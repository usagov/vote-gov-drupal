const btt = document.querySelector('.back-to-top');

let lastKnownScrollPosition = 0;

function doSomething() {
  scrollCompare = window.scrollY - lastKnownScrollPosition;
  lastKnownScrollPosition = window.scrollY;
  scrollComp = scrollCompare < 0 && window.scrollY > 60;

  if (scrollComp) {
      btt.classList.add('js-scrolled');
  } else {
    btt.classList.remove('js-scrolled');
  }
}

const throttle = (func, timeFrame) => {
  let lastTime = 0;
  return function () {
    const now = new Date();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  }
}

const throttledFunction = throttle(doSomething, 500);

document.addEventListener('scroll', throttledFunction);
