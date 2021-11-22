import {Pages, addElement, wrapperGlobal} from './common.js';
import {loader} from './index.js';
import { setLocalStorage, getLocalStorage, ContextName } from './LocalStorage.js';

export default class ArtistsCategoriesPages {
  constructor(div) {
    this.base = div;
    this.volume = 0;
    this.isVolumeOn = 0;
    this.aoq = -1;
    this.aopc = -1;
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

  score(count, title) {
    loader.goto(Pages.score, count, title);
  }

  loadContext() {
    this.volume = Number(getLocalStorage(ContextName.volume));
    this.isVolumeOn = Number(getLocalStorage(ContextName.isVolumeOn));
    this.aoq = getLocalStorage(ContextName.arrayOfQuestion).split(',').map(Number);
    this.aopc = getLocalStorage(ContextName.arrayOfPlayedCategories).split(',').map(Number);
  }

  itemListener(id) {
    loader.goto(Pages.questionArtists, id);
  }

  renderItem(base, count, title) {
    const item = addElement(base, 'div', 'item', 'item-main');
    item.id = `${count}`;
    const itemPic = addElement(item, 'div', 'item-picture', 'item-picture-main');
    itemPic.style.backgroundImage = `url(assets/img/${count}.jpg)`;
    const iheader = addElement(item, 'div', 'item-header');
    const ititle = addElement(iheader, 'div', 'item-title');
    const titleWr = addElement(ititle, 'div', 'item-title-wrapper');
    titleWr.textContent = `${title}`;
    const itotal = addElement(iheader, 'div', 'item-total');
    const textTotal = addElement(itotal, 'div', 'text-total');

    let num = 0;
    if(this.aopc[count / 10] === 1) {
      for(let i = count; i < count + 10; i++) {
        if(this.aoq[i] === 1) {
          num++;
        }
      }
      textTotal.textContent = `${num}/10`;
      const info = addElement(itemPic, 'div', 'info', 'info-result');
      const btnScore = addElement(info, 'button', 'buttons', 'buttons-score');
      btnScore.textContent = 'Score';
      let wrapperScore = wrapperGlobal.bind(this, this.score, count, title);
      btnScore.onclick = function(event) {
        if (event.target.tagName === 'BUTTON') {
          wrapperPlaySound();
          wrapperScore();
        }
      }
    } else {
      itemPic.style.filter = 'grayscale()';
    }

    let wrapperItem = wrapperGlobal.bind(this, this.itemListener, count);
    let wrapperPlaySound = wrapperGlobal.bind(this, this.playSound);
    item.onclick = function(event) {
      if (event.target.tagName === 'DIV') {
        wrapperPlaySound();
        wrapperItem();
      }
    }
  }

  render() {
    const btnWrapper = addElement(this.base, 'div', 'buttons-wrapper', 'buttons-wrapper-categories');
    const btnHome = addElement(btnWrapper, 'button', 'buttons', 'buttons-home');
    btnHome.textContent = 'Home';
    const textCat = addElement(btnWrapper, 'h2', 'text', 'text-settings');
    textCat.textContent = 'Categories';
    addElement(btnWrapper, 'div', 'insert');

    const categoriesMain = addElement(this.base, 'div', 'categories', 'categories-main');

    let wrapperRenderItem1 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 0, 'Portrait');
    let wrapperRenderItem2 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 10, 'Landscape');
    let wrapperRenderItem3 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 20, 'Still Life');
    let wrapperRenderItem4 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 30, 'Graphic');
    let wrapperRenderItem5 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 40, 'Antique');
    let wrapperRenderItem6 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 50, 'Avant-Garde');
    let wrapperRenderItem7 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 60, 'Renaissance');
    let wrapperRenderItem8 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 70, 'Surrealism');
    let wrapperRenderItem9 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 80, 'Kitsch');
    let wrapperRenderItem10 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 90, 'Minimalism');
    let wrapperRenderItem11 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 100, 'Avangard');
    let wrapperRenderItem12 = wrapperGlobal.bind(this, this.renderItem, categoriesMain, 110, 'Industrial');

    wrapperRenderItem1();
    wrapperRenderItem2();
    wrapperRenderItem3();
    wrapperRenderItem4();
    wrapperRenderItem5();
    wrapperRenderItem6();
    wrapperRenderItem7();
    wrapperRenderItem8();
    wrapperRenderItem9();
    wrapperRenderItem10();
    wrapperRenderItem11();
    wrapperRenderItem12();


    let wrapperHome = wrapperGlobal.bind(this, this.home);
    let wrapperPlaySound = wrapperGlobal.bind(this, this.playSound);
    btnHome.onclick = function() {
      wrapperPlaySound();
      wrapperHome();
    }
  }
}