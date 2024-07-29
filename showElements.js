document.addEventListener("DOMContentLoaded", function () {
  const tickers = document.querySelectorAll(".tick");
  const tickerWrapper = document.querySelector(".tickers");
  const services = document.querySelector(".services-content-item");
  observer.observe(tickerWrapper);
  observer.observe(services);
});

const toServicios = document.getElementById("toServicios");

toServicios.addEventListener("click", (e) => {
  let servicios = document.querySelector("#servicios");
  servicios.scrollIntoView({
    behavior: 'smooth'
});
})

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.className.includes('services-content-item')) {
        revealElements('.services-content-item', 500, 250);
      } else {
        startTickerAfterSomeMsSecconds(500)
      }
      
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 // Activar cuando el 10% del element esta en la view
});


async function startTickerAfterSomeMsSecconds(ms) {
  await new Promise(r => setTimeout(r, ms));
  animateTicker(document.querySelectorAll(".tick"));
}

async function animateTicker(tickers) {
  let speed = 150;
  tickers.forEach(tickers => {
    const animate = () => {
      const value = +tickers.getAttribute('finish');
      const data = +tickers.innerText;

      const time = value / speed;
      if (data < value) {
        tickers.innerText = Math.ceil(data + time);
        setTimeout(animate, 15);
      } else {
        tickers.innerText = value + "+";
      }
    }
    animate();
  });
}



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