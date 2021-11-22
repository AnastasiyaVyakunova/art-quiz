import {Pages, addElement, wrapperGlobal} from './common.js';
import {loader} from './index.js';
import { setLocalStorage, getLocalStorage, ContextName } from './LocalStorage.js';

export default class ResultPage {
  constructor(div) {
    this.base = div;
    this.num = -1;
    this.volume = 0;
    this.isVolumeOn = 0;
    this.firstId = -1;
  }

  playSound() {
    const audio = document.querySelector('audio');
    if(this.isVolumeOn === 1) {
      audio.volume = this.volume / 100;
      audio.play();
    }
  }

  home() {
    loader.goto(Pages.main);
  }

  categories() {
    if(this.id < 120) {
      loader.goto(Pages.art);
    } else {
      loader.goto(Pages.pic);
    } 
  }

  loadContext() {
    this.volume = Number(getLocalStorage(ContextName.volume));
    this.isVolumeOn = Number(getLocalStorage(ContextName.isVolumeOn));
  }
  
  configure(id) {
    this.id = id;
    this.firstId = id - 10;
  }

  render() {
    let aopc = getLocalStorage(ContextName.arrayOfPlayedCategories).split(',').map(Number);
    aopc[this.firstId / 10] = 1;
    setLocalStorage(ContextName.arrayOfPlayedCategories, aopc);
    let aoq = getLocalStorage(ContextName.arrayOfQuestion).split(',').map(Number);
    this.num = 0;
    for(let i = this.firstId; i < this.firstId + 10; i++) {
      if(aoq[i] === 1) {
        this.num++;
      }
    }

    const audio = document.querySelectorAll('audio');
    if(this.isVolumeOn === 1) {
      audio[3].volume = this.volume / 100;
      audio[3].play();
    }

    const btnsWrapper = addElement(this.base, 'div', 'buttons-wrapper', 'buttons-wrapper-categories', 'buttons-wrapper-question');
    const btnHome = addElement(btnsWrapper, 'button', 'buttons', 'buttons-home', 'buttons-home-up');
    btnHome.textContent = 'Home';
    const btnCategories = addElement(btnsWrapper, 'button', 'buttons', 'buttons-category', 'buttons-category-up');
    btnCategories.textContent = 'Categories';

    const textCongrad = addElement(this.base, 'h2', 'text', 'text-conrad');
    textCongrad.textContent = 'Congratulations!';

    const textResult = addElement(this.base, 'p', 'text', 'text-result');
    addElement(this.base, 'div', 'picture-good');
    textResult.textContent = `${this.num} / 10`;
    let wrapperPlaySound = wrapperGlobal.bind(this, this.playSound);
    let wrapperHome = wrapperGlobal.bind(this, this.home);
    btnHome.onclick = function() {
      wrapperHome();
      wrapperPlaySound();
    }

    let wrapperCategories = wrapperGlobal.bind(this, this.categories);
    btnCategories.onclick = function() {
      wrapperCategories();
      wrapperPlaySound();
    }

  }
}