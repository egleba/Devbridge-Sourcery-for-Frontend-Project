const buttonMedia = document.querySelector('.nav__media-link');
const pageTesters = document.querySelector('.page-testers');
const pageDevelopers = document.querySelector('.page-developers');
const pageFrontend = document.querySelector('.page-frontend');

const desktopMinWidth = getComputedStyle(document.documentElement).getPropertyValue('--desktop-min-width');
const tabletMinWidth = getComputedStyle(document.documentElement).getPropertyValue('--tablet-min-width');
const desktop = window.matchMedia(`(min-width:${desktopMinWidth}`);
const tablet = window.matchMedia(`(min-width:${tabletMinWidth})`);

if (pageTesters || pageDevelopers || pageFrontend) {
  buttonMedia.addEventListener('click', (event) => {
    event.preventDefault();
    let gutter;
    if (desktop.matches) {
      gutter = -80;
    } else if (tablet.matches) {
      gutter = 50;
    } else {
      gutter = 20;
    }
    const mediaContainer = document.querySelector('#media-section');
    const mediaContainerRect = mediaContainer.getBoundingClientRect();
    const mediaScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const mediaOffsetTop = mediaContainerRect.top + mediaScrollTop - gutter;
    window.scrollTo(0, mediaOffsetTop);
  });
}
