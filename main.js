const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

window.onload = function() {
  window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", function() {
  const tickers = document.querySelectorAll(".tick");
  const tickerWrapper = document.querySelector(".tickers");
  observer.observe(tickerWrapper);
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
  tickers.forEach( tickers => {
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

/*
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};


ScrollReveal().reveal(".container__left .container__btn", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".container__right h4", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".container__right h2", {
  ...scrollRevealOption,
  delay: 2500,
});
ScrollReveal().reveal(".container__right h3", {
  ...scrollRevealOption,
  delay: 3000,
});
ScrollReveal().reveal(".container__right p", {
  ...scrollRevealOption,
  delay: 3500,
});

ScrollReveal().reveal(".container__right .img-main-1", {
  duration: 1000,
  delay: 3000,
});
ScrollReveal().reveal(".container__right .img-main-2", {
  duration: 1000,
  delay: 3500,
});

if (window.innerWidth < 500) {
  ScrollReveal().reveal(".socials span", {
    ...scrollRevealOption,
    origin: "top",
    delay: 0,
    interval: 100,
  });
} else {
  ScrollReveal().reveal(".socials span", {
    ...scrollRevealOption,
    origin: "top",
    delay: 4000,
    interval: 100,
  });
}


ScrollReveal().reveal(".ratings .ticker-element", {
  ...scrollRevealOption,
  delay: 100,
  interval: 500
});

ScrollReveal().reveal(".services-content-item", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500
});
*/