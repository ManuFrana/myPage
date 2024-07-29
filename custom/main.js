const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");


window.addEventListener('mainpage-content-shown', function () {
  let mainContent = document.querySelector(".showAfterZoom");
  mainContent.style.opacity = 1;
})

window.addEventListener("mainpage-content-hide", function () {
  let mainContent = document.querySelector(".showAfterZoom");
  mainContent.style.opacity = 0;
})

document.addEventListener("DOMContentLoaded", function () {
  const tickers = document.querySelectorAll(".tick");
  const tickerWrapper = document.querySelector(".tickers");
  observer.observe(tickerWrapper);
  dispatchShowContentEvent();
});

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startTickerAfterSomeMsSecconds(500)
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null, // Use the document's viewport as the container
  rootMargin: '0px',
  threshold: 0.1 // Trigger when 10% of the element is in view
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


menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

function dispatchShowContentEvent() {
  const event = new CustomEvent("startAnimationShow", {});
  window.dispatchEvent(event);
}