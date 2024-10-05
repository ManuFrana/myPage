
 // PREPARO ZOOM
gsap.registerPlugin(ScrollTrigger);


let showContent = false;
let mainImage = document.querySelector(".zoom-image-container");
const visualGuide = document.getElementById("visual-guide");

let defaultZoom = 370;
if (window.innerWidth < 500) {
  defaultZoom = 230;
}

/***
 * LOADER
 */
window.addEventListener("load", function () {

 
  this.prepareZoomAnimation();

  let resources = document.querySelectorAll("img");
  let imagsLoaded = 0;

  function imagesLoaded() {
    imagsLoaded++;
    if (imagsLoaded === resources.length) {
      hideLoader();
    }
  }

  resources.forEach(res => {
    if (res.complete) {
      imagesLoaded();
    } else {
      res.addEventListener("load", imagesLoaded);
      res.addEventListener("error", imagesLoaded);
    }
  })

  if (resources.length === 0) {
    hideLoader();
  }
});


function hideLoader() {
  let loader = document.getElementById("loader");
  loader.style.display = "none";
}

/*
ZOOM SCRIPT
*/


function prepareZoomAnimation() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".zoom-wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.05) {
            visualGuide.style.opacity = visualGuide.style.opacity - progress;
          } else {
            visualGuide.style.opacity = 1;
          }
          if (progress >= 0.90) {
            triggerShowPageContentLogic();
          } else {
            if (showContent) {
              mainImage.style.visibility = "visible";
              dispatchHideContentEvent();
            }
          }
        }
      }
    })
    .to(".zoom-in-image", {
      scale: 2,
      z: defaultZoom,
      transformOrigin: "center center",
      ease: "power1.inOut",
    })
    .to(
      ".section.first-content",
      {
        scale: 1.1,
        transformOrigin: "center center",
        ease: "power1.inOut",

      },
      "<"
    );
}

function triggerShowPageContentLogic() {
  showContent = true;
  mainImage.style.visibility = "hidden";
  dispatchShowContentEvent();
}

function dispatchShowContentEvent() {
  const event = new CustomEvent("startAnimationShow", {});
  window.dispatchEvent(event);
}

function dispatchHideContentEvent() {
  const event = new CustomEvent("mainpage-content-hide", {});
  window.dispatchEvent(event);
}



/*
SHOW ELEMENT LOGIC
*/
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateObservedElement(entry.target.className);
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 // Activar cuando el 10% del element esta en la view
});


document.addEventListener("DOMContentLoaded", function () {
  const tickers = document.querySelectorAll(".tick");
  const tickerWrapper = document.querySelector(".tickers");
  const callToAction = document.querySelector(".callToAction");
  const faq = document.querySelector(".faq-title");
  observer.observe(tickerWrapper);
  observer.observe(faq);
  observer.observe(callToAction);
});

const toServicios = document.getElementById("toServicios");
const faqDetails = document.querySelectorAll("details");

faqDetails.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      item.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
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

async function revealElements(selector, delay = 0, interval = 0) {
  const elements = document.querySelectorAll(selector);
  await elements.forEach((element, index) => {
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
  hideElements('details')
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

async function addTypeWritterEffect(selector, delay = 0, interval = 0) {
  const elements = document.querySelectorAll(selector);
  await elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('typewritter');
    }, delay + index * interval);
  });
}

function animateObservedElement(className) {
  switch (className) {
    case 'tickers':
      startTickerAfterSomeMsSecconds(500);
      break;
    case 'faq-title':
      revealElements('details', 150, 300);
      break;
    case 'callToAction':
      revealElements('.callToActionWrapper', 100, 300);
      revealElements('.main-text-title', 900, 300);
      addTypeWritterEffect('.main-text-title', 900, 300);
      revealElements('.main-text-desc', 2400, 500);
      revealElements('.card', 2400, 600);
      break;
    default:
      break;
  }
}

async function scrollToElement(elementId) {
  let element = await document.getElementById(elementId);
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY,
    behavior: 'smooth'
  });
}

/*
MAIN
*/

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});