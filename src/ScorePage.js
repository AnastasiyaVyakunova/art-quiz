import {Pages, addElement, wrapperGlobal} from './common.js';
import {loader} from './index.js';
import { setLocalStorage, getLocalStorage, ContextName } from './LocalStorage.js';

export default class ScorePage {
  constructor(div) {
    this.base = div;
    this.id = -1;
    this.volume = 0;
    this.isVolumeOn = 0;
    this.title = 0;
    this.aoq = -1;
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
    this.aoq = getLocalStorage(ContextName.arrayOfQuestion).split(',').map(Number);
  }

  configure(count, title) {
    this.id = count;
    this.title = title;
  }


  render() {
    const btnsWrapper = addElement(this.base, 'div', 'buttons-wrapper', 'buttons-wrapper-categories', 'buttons-wrapper-question');
    const btnHome = addElement(btnsWrapper, 'button', 'buttons', 'buttons-home', 'buttons-home-up');
    btnHome.textContent = 'Home';
    const textSet = addElement(btnsWrapper, 'h2', 'text', 'text-settings');
    textSet.textContent = 'Score';
    const btnCategories = addElement(btnsWrapper, 'button', 'buttons', 'buttons-category', 'buttons-category-up');
    btnCategories.textContent = 'Categories';

    const categoryName = addElement(this.base, 'h2', 'text', 'text-category-name');
    categoryName.textContent = this.title;
    const itemsPic = addElement(this.base, 'div', 'categories', 'categories-main');
    for (let i = 0; i < 10; i++) {
      const pic = addElement(itemsPic, 'div', 'item-picture', 'item-picture-score');
      pic.style.backgroundImage = `url(assets/img/${this.id + i}.jpg)`;
      (async () => {
        let response = await fetch('images.json');
        let data = await response.json();

        const infoPic = addElement(pic, 'div', 'info', 'info-pic');
        const picName = addElement(infoPic, 'div', 'text', 'text-info');
        picName.textContent = data.pictures[this.id + i].name;
        const picAuthor = addElement(infoPic, 'div', 'text', 'text-info');
        picAuthor.textContent = data.pictures[this.id + i].author;
        const picYear = addElement(infoPic, 'div', 'text', 'text-info');
        picYear.textContent = data.pictures[this.id + i].year;

        let isView = false;
        pic.onclick = function() {
          if(isView === false) {
            infoPic.style.bottom = '0px';
            isView = true;
          } else {
            infoPic.style.bottom = '-105px';
            isView = false;
          }
        }
      })();
      
    
      if(this.aoq[i + this.id] !== 1) {
        pic.style.filter = 'grayscale()';
      }
    }

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