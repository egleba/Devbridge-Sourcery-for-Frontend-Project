function internalScroll() {
  const introBtn = document.querySelector('.intro__button');
  const academiesSection = document.querySelector('.academies');
  const arrow = document.querySelector('.academies__arrow-link');
  const academiesList = document.querySelector('.academies-list');

  if (academiesSection !== null) {
    introBtn.addEventListener('click', () => {
      academiesSection.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }

  if (academiesList !== null) {
    arrow.addEventListener('click', () => {
      academiesList.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }
}

internalScroll();
