
document.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 0);
  });

window.addEventListener("load", function() {

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


