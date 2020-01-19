const isActive = 'is-active';
const isHidden = 'is-hidden';
const isDisabled = 'is-disabled';
const header = document.querySelector('.header');
const headerExpanded = 'header--expanded';
const headerContainer = document.querySelector('.container--header');
const headerLogoLink = document.querySelector('.header__logo-link');
const navMenu = document.querySelector('.nav__menu');
const navMenuMobile = 'nav__menu-mobile';
const navMenuMobileExpanded = 'nav__menu-mobile--expanded';
const navMediaLink = document.querySelector('.nav__media-link');
const navMenuIcon = document.querySelector('.nav__menu-icon');
const navMenuIconRotate = 'nav__menu-icon--rotate';
const navSubmenu = document.querySelector('.nav__submenu');
const navSubmenuActive = 'nav__submenu--active';
const navSubmenuButton = document.querySelector('.nav__submenu-button');
const navSubmenuButtonActive = 'dropdown-active';
const jsMenuToggle = document.querySelector('.js-menu-toggle');
const jsSubmenuToggle = document.querySelector('.js-submenu-toggle');
const scrollLockToggle = 'toggle-scroll-lock';
const mediaSection = document.getElementById('media-section');

const toggleClickMenu = (e) => {
  e.target.classList.toggle(isActive);

  navMenu.classList.toggle(navMenuMobileExpanded);
  headerLogoLink.classList.toggle(isHidden);
  headerContainer.classList.toggle(isDisabled);
  header.classList.toggle(headerExpanded);
  document.body.classList.toggle(scrollLockToggle);
  const isAriaExpanded = e.target.getAttribute('aria-expanded') === 'true';
  e.target.setAttribute('aria-expanded', isAriaExpanded ? 'false' : 'true');
};

const toggleClickMenuDropdownOpen = (e) => {
  e.target.classList.toggle(navSubmenuButtonActive);

  navSubmenu.classList.toggle(navSubmenuActive);
  navMenuIcon.classList.toggle(navMenuIconRotate);
};

export const initHeaderListeners = () => {
  const button = jsMenuToggle;
  const buttonDropdown = jsSubmenuToggle;

  button.addEventListener('click', toggleClickMenu);
  buttonDropdown.addEventListener('click', toggleClickMenuDropdownOpen);
};

export const removeHeaderListeners = () => {
  const buttonRemoved = jsMenuToggle;
  const buttonDropdownRemoved = jsSubmenuToggle;

  buttonRemoved.removeEventListener('click', toggleClickMenu);
  buttonDropdownRemoved.removeEventListener('click', toggleClickMenuDropdownOpen);
};

function handleScreenWidthChange(mq) {
  if (mq.matches) {
    headerLogoLink.classList.remove(isHidden);
    headerContainer.classList.remove(isDisabled);
    navMenu.classList.toggle(navMenuMobile);
    navSubmenu.classList.remove(navSubmenuActive);
    jsMenuToggle.classList.remove(isActive);
    navMenuIcon.classList.remove(navMenuIconRotate);
    navSubmenuButton.classList.remove(navSubmenuButtonActive);
    header.classList.remove(headerExpanded);
    navMenu.classList.remove(navMenuMobileExpanded);
    document.body.classList.remove(scrollLockToggle);
  } else {
    navMenu.classList.add(navMenuMobile);
    if (mediaSection) {
      navMediaLink.addEventListener('click', () => {
        document.body.classList.remove(scrollLockToggle);
        headerLogoLink.classList.remove(isHidden);
        headerContainer.classList.remove(isDisabled);
        navSubmenu.classList.remove(navSubmenuActive);
        jsMenuToggle.classList.remove(isActive);
        navMenuIcon.classList.remove(navMenuIconRotate);
        navSubmenuButton.classList.remove(navSubmenuButtonActive);
        header.classList.remove(headerExpanded);
        navMenu.classList.remove(navMenuMobileExpanded);
      });
    }
  }
}

const mq = window.matchMedia('(min-width: 1200px)');
handleScreenWidthChange(mq);
mq.addListener(handleScreenWidthChange);
