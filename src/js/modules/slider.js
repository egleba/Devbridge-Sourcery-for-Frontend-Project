/* eslint-disable */
import Glide from "@glidejs/glide";

const sliderSum = document.querySelectorAll(".glide__slide").length;
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

function handleSlider() {
  let slider = new Glide(".testimonials__content", {
    type: "slider",
    perView: 3,
    slidesToScroll: 1,
    startAt: 0,
    gap: 0,
    bound: true,
    rewind: false,
    breakpoints: {
      1200: {
        perView: 1
      }
    }
  });

  slider.on('mount.before', () => {
    prevButton.style.display = "none";
  });
  slider.on('run', () => {
    if (slider.index !== 0) {
      prevButton.style.display = "block";
    } else {
      prevButton.style.display = "none";
    }
    if (slider.index < sliderSum - slider.settings.perView) {
      nextButton.style.display = "block";
    } else {
      nextButton.style.display = "none";
    }
  });
  slider.on('resize', () => {
    slider.go('<<');
  });

  slider.mount();
}


if (document.querySelectorAll(".page-testers").length !== 0) {
  handleSlider();
}
/* eslint-enable */
