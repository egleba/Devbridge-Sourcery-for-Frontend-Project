const radioOptions = document.querySelectorAll('.radio__option');
const hoveredClass = 'radio--hovered';
const checkedHoveredClass = 'radio--checked-hovered';
const focusedClass = 'radio--focused';
const checkedFocusedClass = 'radio--checked-focused';


function mouseOver(option, radioInput) {
  if (radioInput.disabled) {
    return;
  }
  if (radioInput.checked) {
    option.classList.add(checkedHoveredClass);
  } else {
    option.classList.add(hoveredClass);
  }
}

function mouseOut(option) {
  option.classList.remove(checkedHoveredClass, hoveredClass);
}

function focusIn(option, radioInput) {
  if (radioInput.disabled) {
    return;
  }
  if (!radioInput.checked) {
    option.classList.add(focusedClass);
  } else {
    option.classList.add(checkedFocusedClass);
  }
}

function focusOut(option) {
  option.classList.remove(checkedFocusedClass, focusedClass);
}

function onClick(option, radioInput) {
  if (radioInput.disabled) {
    return;
  }
  option.classList.remove(checkedFocusedClass, focusedClass);
  if (radioInput.checked) {
    option.classList.add(checkedFocusedClass);
  } else {
    option.classList.add(focusedClass);
  }
}

radioOptions.forEach((option) => {
  const radioInput = option.firstElementChild.firstElementChild;
  option.addEventListener('mouseover', () => { mouseOver(option, radioInput); });
  option.addEventListener('mouseout', () => { mouseOut(option); });
  option.addEventListener('focusin', () => { focusIn(option, radioInput); });
  option.addEventListener('focusout', () => { focusOut(option); });
  option.addEventListener('click', () => { onClick(option, radioInput); });
});
