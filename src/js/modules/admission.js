const requestURL = '../../assets/admission.json';
const admissionContainer = document.querySelector('[data-admission]');

if (admissionContainer !== null) {
  const pageName = admissionContainer.dataset.admission;
  let pageContent = '';

  fetch(requestURL)
    .then((request) => request.json())
    .then((data) => {
      const parsedContent = data.admission;
      if (pageName === 'frontend') {
        pageContent = parsedContent.frontend.content;
      } else if (pageName === 'developers') {
        pageContent = parsedContent.developers.content;
      } else if (pageName === 'testers') {
        pageContent = parsedContent.testers.content;
      }

      admissionContainer.innerHTML = pageContent;
    })
    .catch(() => {
      admissionContainer.innerHTML = '<p>Ups something went wrong</p>';
    });
}
