/* eslint-disable */
import Glide from "@glidejs/glide";

const trackDiv = document.querySelector(".schedule__track-div");
const monthsContainer = document.querySelector(".schedule__months-container");
const arrows = document.querySelectorAll(".glide__arrow");

function handleCarousel() {
  let glide = new Glide(".glide", {
    type: "carousel",
    startAt: 0,
    perView: 2,
    gap: 30
  });

  function toggleGlideArrows() {
    arrows.forEach(arrow => {
      arrow.classList.toggle("active");
    });
  }

  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 1200px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // On media query change:
  function WidthChange(mq) {
    // cardToggle function has to be declared here and not in global scope, as per Glide docs: https://glidejs.com/docs/events/
    function cardToggle() {
      const arrows = document.querySelectorAll(".card__arrow");
      const cards = document.querySelectorAll(".schedule__card");
      const cardsTop = document.querySelectorAll(".card__top");
      const cardsTopLower = document.querySelectorAll(".card__top--lower");
      const cardsBottom = document.querySelectorAll(".card__bottom");

      for (let index = 0; index < cardsTop.length; index++) {
        const cardTop = cardsTop[index];

        // Event listener on mouse click:
        cardTop.addEventListener("click", () => {
          handlEvent();
        });

        // Event listener on keyboard button enter:
        cardTop.addEventListener("keyup", e => {
          if (e.keyCode === 13) {
            handlEvent();
          }
        });

        // Handling the event:
        function handlEvent() {
          arrows[index].classList.toggle("expanded");
          cards[index].classList.toggle("expanded");
          cardTop.classList.toggle("expanded");
          cardsTopLower[index].classList.toggle("expanded");
          cardsBottom[index].classList.toggle("expanded");
          cards[index].getAttribute("aria-expanded") === "true"
            ? cards[index].setAttribute("aria-expanded", "false")
            : cards[index].setAttribute("aria-expanded", "true");
        }
      }
    }

    if (mq.matches && monthsContainer.childElementCount > 2) {
      glide.mount();
      toggleGlideArrows();
      cardToggle();
      trackDiv.classList.add("carousel");
    } else if (!mq.matches && monthsContainer.childElementCount > 2) {
      glide.destroy();
      cardToggle();
      toggleGlideArrows();
      trackDiv.classList.remove("carousel");
    } else {
      cardToggle();
      trackDiv.classList.remove("carousel");
    }
  }
}

if (document.querySelector(".schedule") !== null) {
  handleCarousel();
}
/* eslint-enable */
