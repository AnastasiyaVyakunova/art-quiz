import {Pages, addElement, wrapperGlobal} from './common.js';
import {loader} from './index.js';
import { getLocalStorage, ContextName } from './LocalStorage.js';

export default class MainPage {
  constructor(div) {
    this.base = div;
    this.volume = 0;
    this.isVolumeOn = 0;
  }
  loadContext() {
    this.volume = Number(getLocalStorage(ContextName.volume));
    this.isVolumeOn = Number(getLocalStorage(ContextName.isVolumeOn));
  }
  artQuiz() 
  {
    loader.goto(Pages.art);
  }
  picQuiz() 
  {
    loader.goto(Pages.pic);
  }
  setting() 
  {
    loader.goto(Pages.setting);
  }

  playSound() {
    const audio = document.querySelector('audio');
    if(this.isVolumeOn === 1) {
      audio.volume = this.volume / 100;
      audio.play();
    }
  }

  render() {
    const textSett = addElement(this.base, 'h2', 'text', 'text-settings');

    const mainMenu = addElement(this.base, 'div', 'main-menu');
    const artistsQuiz = addElement(mainMenu, 'div', 'artists-quiz');
    addElement(artistsQuiz, 'div', 'main-menu-img', 'main-menu-artists');
    const artHeader = addElement(artistsQuiz, 'h2', 'text', 'text-main-menu');
    const artSpanA = addElement(artHeader, 'span', 'text-bold');
    const artSpanQ = addElement(artHeader, 'span');
    artSpanA.textContent = 'Artists';
    artSpanQ.textContent = ' Quiz';

    const picturesQuiz = addElement(mainMenu, 'div', 'pictures-quiz');
    addElement(picturesQuiz, 'div', 'main-menu-img', 'main-menu-pictures');
    const picHeader = addElement(picturesQuiz, 'h2', 'text', 'text-main-menu');
    const picSpanA = addElement(picHeader, 'span', 'text-bold');
    const picSpanQ = addElement(picHeader, 'span');
    picSpanA.textContent = 'Pictures';
    picSpanQ.textContent = ' Quiz';

    const btnWrapper = addElement(this.base, 'div', 'buttons-wrapper');
    const btnSettings = addElement(btnWrapper, 'button', 'buttons', 'buttons-settings');
    btnSettings.textContent = 'Settings';

    let wrapperPlaySound = wrapperGlobal.bind(this, this.playSound);
    let wrapperArtQuiz = wrapperGlobal.bind(this, this.artQuiz);
    let wrapperPicQuiz = wrapperGlobal.bind(this, this.picQuiz);
    let wrapperSetting = wrapperGlobal.bind(this, this.setting);
    
    artistsQuiz.onclick = function() {
      wrapperPlaySound();
      wrapperArtQuiz();
    }
    picturesQuiz.onclick = function() {
      wrapperPlaySound();
      wrapperPicQuiz();
    }
    btnSettings.onclick = function() {
      wrapperPlaySound();
      wrapperSetting();
    }

  }
}