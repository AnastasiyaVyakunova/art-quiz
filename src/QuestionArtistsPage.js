import {Pages, addElement, wrapperGlobal} from './common.js';
import {loader} from './index.js';
import { setLocalStorage, getLocalStorage, ContextName } from './LocalStorage.js';

export default class QuestionArtistsPages {
  constructor(div) {
    this.base = div;
    this.id = -1;
    this.rightPlace = -1;
    this.pagination = 0;
    this.volume = 0;
    this.isVolumeOn = 0;
    this.time = 0;
    this.timer = -1;
    this.isTimeOn = 0;
    this.aoq = -1;
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
    this.pagination = 0;
    loader.goto(Pages.main);
  }

  categories() {
    this.pagination = 0;
    loader.goto(Pages.art);
  }

  next() {
    setLocalStorage(ContextName.arrayOfQuestion, this.aoq);
    if (this.pagination !== 10) {
      loader.goto(Pages.questionArtists, this.id + 1);
    } else {
      this.pagination = 0;
      loader.goto(Pages.result, this.id + 1);
    }
  }


  loadContext() {
    this.volume = Number(getLocalStorage(ContextName.volume));
    this.isVolumeOn = Number(getLocalStorage(ContextName.isVolumeOn));
    this.time = Number(getLocalStorage(ContextName.time));
    this.isTimeOn = Number(getLocalStorage(ContextName.isTimeOn));
    this.aoq = getLocalStorage(ContextName.arrayOfQuestion).split(',').map(Number);
  }

  configure(id) {
    this.id = id;
    this.firstId = id - this.pagination;
  }

  getAuthor() {
    (async () => {
      let response = await fetch('images.json');
      let data = await response.json();

      let ul = document.querySelectorAll('.answers-answer');
      let decider = [this.id,  this.id, this.id, this.id];
      for (let i = 0; i < ul.length; i++) {
        let randomNum = this.id;
        while(data.pictures[randomNum].author === data.pictures[this.id].author) {
          randomNum = Math.floor(Math.random() * 241);
          for(let el of decider) {
            if(data.pictures[randomNum].author === data.pictures[el].author) {
              randomNum = this.id;
            }
          }
        }
        decider[i] = randomNum;
        ul[i].textContent = data.pictures[randomNum].author;
      }
      let randomPlace = Math.floor(Math.random() * 4);
      ul[randomPlace].textContent = data.pictures[this.id].author;
      this.rightPlace = randomPlace;

      const pPic = document.querySelector('.popup-picture');
      const pText = document.querySelector('.text-picture-name');
      const pAuthor = document.querySelector('.text-author');
      const pYear = document.querySelector('.text-year');

      pPic.style.backgroundImage = `url(assets/img/${this.id}.jpg)`;
      pText.textContent = data.pictures[this.id].name;
      pAuthor.textContent = data.pictures[this.id].author;
      pYear.textContent = data.pictures[this.id].year;
    })();
  }

  chooseListener(chosen) {
    if(this.isTimeOn === 1) {
      clearTimeout(this.timer);
    }
    const audio = document.querySelectorAll('audio');
    if(this.isVolumeOn === 1) {
      audio[1].volume = this.volume / 100;
      audio[2].volume = this.volume / 100;
    } else {
      audio[1].volume = 0;
      audio[2].volume = 0;
    }

    const overlay = document.querySelector('.overlay');
    const secPopup = document.querySelector('.section-popup');
    overlay.classList.add('overlay-show');
    secPopup.classList.add('section-popup-show');

    const result = document.querySelector('.popup-answer');
    let ul = document.querySelectorAll('.answers-answer');
    let pagination = document.querySelectorAll('.pagination-item');

    if (this.rightPlace === chosen) {
      audio[1].play();
      result.classList.add('popup-answer-correct');
      ul[chosen].classList.add('correct');
      pagination[this.pagination].classList.add('correct');
      this.aoq[this.id] = 1;
      this.pagination++;
    } else {
      audio[2].play();
      result.classList.add('popup-answer-wrong');
      if(chosen !== -1) {
        ul[chosen].classList.add('wrong');
      }
      pagination[this.pagination].classList.add('wrong');
      this.aoq[this.id] = 0;
      this.pagination++;
    }
  }

  scheduler(timer, sec) {
    if(this.time === sec) {
      this.chooseListener(-1);
      timer.textContent = `0:0`
    } else {
      timer.textContent = `0:${this.time - sec}`
      let wrapperScheduler = wrapperGlobal.bind(this, this.scheduler, timer, sec + 1);
      this.timer = setTimeout(wrapperScheduler, 1000);
    }
  }

  render() {
    const forPopup = document.querySelector('.for-popup');
    const popup = addElement(forPopup, 'div', 'popup');
    addElement(popup, 'div', 'overlay');
    const sectionPopup = addElement(popup, 'section', 'section', 'section-popup');
    addElement(sectionPopup, 'div', 'popup-answer');
    addElement(sectionPopup, 'div', 'popup-picture');
    addElement(sectionPopup, 'h2', 'text', 'text-picture-name');
    addElement(sectionPopup, 'p', 'text', 'text-author');
    addElement(sectionPopup, 'p', 'text', 'text-year');
    const btnNext = addElement(sectionPopup, 'button', 'buttons', 'buttons-next');
    btnNext.textContent = 'Продолжить';

    this.base.classList.add('container-artists');

    const btnsWrapper = addElement(this.base, 'div', 'buttons-wrapper', 'buttons-wrapper-categories', 'buttons-wrapper-question');
    const btnHome = addElement(btnsWrapper, 'button', 'buttons', 'buttons-home', 'buttons-home-up');
    btnHome.textContent = 'Home';
    const question = addElement(btnsWrapper, 'h2', 'text', 'text-question');
    question.textContent = 'Кто автор данной картины?';
    const btnCategories = addElement(btnsWrapper, 'button', 'buttons', 'buttons-category', 'buttons-category-up');
    btnCategories.textContent = 'Categories';

    if(this.isTimeOn === 1) {
      const timer = addElement(this.base, 'div', 'text', 'text-timer');
      timer.textContent = `0:${this.time}`;
      let wrapperScheduler = wrapperGlobal.bind(this, this.scheduler, timer, 1);
      this.timer = setTimeout(wrapperScheduler, 1000);
    }

    const artPic = addElement(this.base, 'div', 'artists-pictures');
    artPic.style.backgroundImage = `url(assets/full/${this.id}full.jpg)`;

    const pagination = addElement(this.base, 'div', 'pagination');
    for (let i = 0; i < 10; i++) {
      const itemPag = addElement(pagination, 'div', 'pagination-item');
      if(this.firstId + i < this.id) {
        if(this.aoq[this.firstId + i] === 1) {
          itemPag.classList.add('correct');
        } else if(this.aoq[this.firstId + i] === 0) {
          itemPag.classList.add('wrong');
        }
      }
    }

    const answers = addElement(this.base, 'div', 'answers');
    const answWrapper = addElement(answers, 'ul', 'answers-wrapper');
    let wrapperPlaySound = wrapperGlobal.bind(this, this.playSound);
    let wrapperChoose = wrapperGlobal.bind(this, this.chooseListener);
    for (let i = 0; i < 4; i++) {
      let li = addElement(answWrapper, 'li', 'answers-answer');
      li.id = `${i + 1}`;
      li.onclick = function() {
        wrapperChoose(i);
      }
    }

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

    let wrapperNext = wrapperGlobal.bind(this, this.next);
    btnNext.onclick = function() {
      forPopup.classList.add('hide-block');
      wrapperNext();
      wrapperPlaySound();
    }

    this.getAuthor();
  }
}