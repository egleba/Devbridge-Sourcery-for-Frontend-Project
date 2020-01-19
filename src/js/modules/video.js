const allModals = document.querySelectorAll('[data-modal]');

const showModal = (modal) => {
  modal.classList.add('video-modal--active');
};

const hideModal = (modal) => {
  modal.classList.remove('video-modal--active');
};

const addPreventScrollingClass = () => {
  document.body.classList.add('-modal-opened');
};

const removePreventScrollingClass = () => {
  document.body.classList.remove('-modal-opened');
};

export const initVideoModalListeners = () => {
  allModals.forEach((modal) => {
    const {
      dataset: {
        modal: id,
      },
    } = modal;

    const openBtn = document.querySelector(`[data-id="${id}"]`);
    const openBtn1 = document.querySelector(`[data-id1="${id}"]`);
    const closeBtn = document.querySelector(`[data-closeId="${id}"]`);

    if (openBtn !== null) {
      openBtn.addEventListener('click', () => {
        showModal(modal);

        addPreventScrollingClass();
      });
    }

    if (openBtn1 !== null) {
      openBtn1.addEventListener('click', () => {
        showModal(modal);

        addPreventScrollingClass();
      });
    }

    closeBtn.addEventListener('click', () => {
      hideModal(modal);
      removePreventScrollingClass();
    });

    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('video-modal')) {
        modal.classList.remove('video-modal--active');
        removePreventScrollingClass();
      }
    });

    document.onkeydown = (evt) => {
      if (evt.keyCode === 27) {
        modal.classList.remove('video-modal--active');
        removePreventScrollingClass();
      }
    };
  });
};
