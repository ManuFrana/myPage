function revealElements(selector, delay = 0, interval = 0) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.remove('hidden');
      element.classList.add('visible');
    }, delay + index * interval);
  });
}


function startAnimationShow() {
  revealElements('.container__right', 0);
  revealElements('nav', 0);
  revealElements('.container__left h1', 150);
  revealElements('.container__left .container__btn', 250);
  revealElements('.container__right h2', 325);
  revealElements('.container__right h3', 500);
  revealElements('.container__right h4', 575);
  revealElements('.container__right p', 750);
  revealElements('.container__right .img-main-1', 625, 500);
  revealElements('.container__right .img-main-2', 750, 500);
  //revealElements('.ratings .ticker-element', 100, 500);
  //revealElements('.services-content-item', 1000, 500);
  if (window.innerWidth < 500) {
    revealElements('.socials span', 0, 100);
  } else {
    revealElements('.socials span', 850, 100);
  }
}

function hideElements(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.classList.remove('visible');
    element.classList.add('hidden');
  });
}

function hide() {
  hideElements('.container__right');
  hideElements('nav');
  hideElements('.container__left h1');
  hideElements('.container__left .container__btn');
  hideElements('.container__right h2');
  hideElements('.container__right h3');
  hideElements('.container__right h4');
  hideElements('.container__right p');
  hideElements('.container__right .img-main-1');
  hideElements('.container__right .img-main-2');
  if (window.innerWidth < 500) {
    hideElements('.socials span');
  } else {
    hideElements('.socials span');
  }
}


window.addEventListener('startAnimationShow', function () {
  document.querySelector(".showAfterZoom").style.opacity = 1;
  document.querySelector("nav").style.opacity = 1;
  startAnimationShow();
})

window.addEventListener("mainpage-content-hide", function () {
  hide();
  document.querySelector("nav").style.opacity = 0;
})

ScrollReveal().reveal(".services-content-item", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500
});