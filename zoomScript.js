console.clear();

gsap.registerPlugin(ScrollTrigger);


let showContent = false;
let mainImage = document.querySelector(".zoom-image-container");

let defaultZoom = 370;
if (window.innerWidth < 500) {
    defaultZoom = 230;
}


window.addEventListener("load", () => {
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
});

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
