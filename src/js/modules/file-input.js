const fileInput = document.querySelector('.file-input__input');
const fileInputFieldTextContent = document.querySelector('.file-input__content');
const fileInputButton = document.querySelector('.file-input__button');
const fileInputIcon = document.querySelector('.file-input__icon--add');
const fileInputIconClear = document.querySelector('.file-input__icon--clear');
const fileInputLabel = document.querySelector('.file-input__label');
const fileInputText = document.querySelector('.file-input__text');

const colorFormPlaceholder = '#868686';
const colorMainText = '#3e3c4e';
const colorMainPrimary = '#584dfc';
const colorFormBorder = '#5c5c5c';

function handeFileInput() {
  fileInput.onchange = function uploadFileName() {
    fileInputFieldTextContent.textContent = this.files[0].name;
    if (fileInputFieldTextContent.value !== '') {
      fileInputIcon.style.display = 'none';
      fileInputIconClear.style.display = 'block';
      fileInputButton.style.display = 'block';
      fileInputFieldTextContent.style.color = colorMainText;
    }
  };
}

function handleFileInputClearButton() {
  fileInputButton.addEventListener('click', () => {
    fileInputFieldTextContent.innerHTML = 'Upload your resume';
    fileInput.value = '';
    fileInputIcon.style.display = 'block';
    fileInputIconClear.style.display = 'none';
    fileInputButton.style.display = 'none';
    fileInputFieldTextContent.style.color = colorFormPlaceholder;
  });
}

function handleFileInputOnNavigation() {
  fileInputFieldTextContent.innerHTML = 'Upload your resume';
  fileInputFieldTextContent.style.color = colorFormPlaceholder;
  fileInput.value = '';
  fileInputIconClear.style.display = 'none';
  fileInputButton.style.display = 'none';
  fileInputIcon.style.display = 'block';
}

function handleStates() {
  fileInput.onfocus = function onFocus() {
    fileInputText.style.color = colorMainPrimary;
  };
  fileInput.onblur = function onFocus() {
    fileInputText.style.color = colorFormBorder;
  };

  if (fileInput.disabled !== true) {
    fileInputLabel.onmouseover = function onMouseOver() {
      fileInputText.style.color = colorMainPrimary;
    };
    fileInputLabel.onmouseout = function onMouseOut() {
      fileInputText.style.color = colorFormBorder;
    };
  }
}
if (fileInput) {
  window.onload = handleFileInputOnNavigation;
  handleStates();
  handeFileInput();
  handleFileInputClearButton();
}
