import { initVideoModalListeners } from './modules/video';
import { initHeaderListeners, removeHeaderListeners } from './modules/header';
import './modules/mediaLink';
import initParticles from './modules/particles';
import './modules/internal-scroll';
import './modules/schedule';
import './modules/slider';
import './modules/radio-button';
import './modules/admission';
import './modules/file-input';
import './modules/registration-validation';


function handeEventListeners(mq) {
  if (mq.matches) {
    initHeaderListeners();
  } else {
    removeHeaderListeners();
  }
}

const mq = window.matchMedia('(max-width: 1200px)');
handeEventListeners(mq);
mq.addListener(handeEventListeners);

initParticles();

initVideoModalListeners();
