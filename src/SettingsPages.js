import {Pages, addElement, wrapperGlobal} from './common.js';
import {loader} from './index.js';
import { setLocalStorage, getLocalStorage, ContextName } from './LocalStorage.js';

export default class SettingsPages {
  constructor(div) {
    this.base = div;
    this.isVolumeOn = 1;
    this.isTimeOn = -1;
    this.volume = 0;
    this.time = 5;
  }
  loadContext() {
    this.isVolumeOn = Number(getLocalStorage(ContextName.isVolumeOn));
    this.volume = Number(getLocalStorage(ContextName.volume));
    this.isTimeOn = Number(getLocalStorage(ContextName.isTimeOn));
    this.time = Number(getLocalStorage(ContextName.time));
  }
  save() {
    setLocalStorage(ContextName.isVolumeOn, this.isVolumeOn);
    setLocalStorage(ContextName.volume, this.volume);
    setLocalStorage(ContextName.isTimeOn, this.isTimeOn);
    setLocalStorage(ContextName.time, this.time);
    loader.goto(Pages.main);
  }

  coloring(element) {
    const value = (element.value - element.min) / (element.max - element.min) * 100;
    element.style.background = `linear-gradient(to right, #030303 0%, #030303 ${value}%, #ffffff ${value}%, #ffffff 100%)`;
  }

  playSound() {
    const audio = document.querySelector('audio');
    if(this.isVolumeOn === 1) {
      audio.volume = this.volume / 100;
      audio.play();
    }
  }

  changeVolume(element) {
    this.volume = element.value;
  }
  changeTime(element) {
    this.time = element.value;
  }
  setIsVolumeOn() {
    this.isVolumeOn = -this.isVolumeOn;
  }
  setIsTimeOn() {
    this.isTimeOn = -this.isTimeOn;
  }
  
  setChecked(element, elementDisabling) {
    if(element.hasAttribute('checked')) {
      element.removeAttribute('checked');
      elementDisabling.setAttribute('disabled', 'disabled');
    } else {
      element.setAttribute('checked', 'checked');
      elementDisabling.removeAttribute('disabled');
    }
  }

  render() {
    const textSett = addElement(this.base, 'h2', 'text', 'text-settings');
    textSett.textContent = 'Settings';

    const mainMenu = addElement(this.base, 'div', 'main-menu');

    const volSet = addElement(mainMenu, 'div', 'settings', 'volume-settings');
    addElement(volSet, 'div', 'volume-label');
    const volHeader = addElement(volSet, 'h2', 'text', 'text--bold');
    volHeader.textContent = 'Volume';
    const tvWrapper = addElement(volSet, 'div', 'time-wrapper');
    const vWrapper = addElement(tvWrapper, 'div', 'volume-wrapper');
    const volBtn = addElement(vWrapper, 'button', 'volume-label', 'volume--label');
    const volPrgs = addElement(vWrapper, 'input', 'progress');
    volPrgs.type = 'range';
    volPrgs.min = '0';
    volPrgs.max = '100';
    volPrgs.step = '1';
    volPrgs.value = this.volume;
    this.coloring(volPrgs);
    const volCheck = addElement(tvWrapper, 'input', 'check', 'check-volume');
    volCheck.type = 'checkbox';
    volCheck.id = 'check-volume';
    const volLabel = addElement(tvWrapper, 'label', 'label', 'label-volume');
    volLabel.setAttribute('for', 'check-volume');
    const volOnOff = addElement(tvWrapper, 'h2', 'text', 'text-label');
    volOnOff.textContent = 'on/off';

    const timeSet = addElement(mainMenu, 'div', 'settings', 'time-settings');
    addElement(timeSet, 'div', 'time-label');
    const timeHeader = addElement(timeSet, 'h2', 'text', 'text--bold');
    timeHeader.textContent = 'Time';
    const tWrapper = addElement(timeSet, 'div', 'time-wrapper');
    const inWrapper = addElement(tWrapper, 'div', 'input-wrapper');
    const timePrgs = addElement(inWrapper, 'input', 'progress', 'progress-timer');
    timePrgs.type = 'range';
    timePrgs.min = '5';
    timePrgs.max = '30';
    timePrgs.step = '5';
    timePrgs.value = this.time;
    this.coloring(timePrgs);
    const timeValue = addElement(inWrapper, 'div', 'text', 'text-timer-value');
    timeValue.textContent = timePrgs.value;
    const timeCheck = addElement(tWrapper, 'input', 'check', 'check-time');
    timeCheck.type = 'checkbox';
    timeCheck.id = 'check-time';
    const timeLabel = addElement(tWrapper, 'label', 'label');
    timeLabel.setAttribute('for', 'check-time');
    const timeOnOff = addElement(tWrapper, 'h2', 'text', 'text-label');
    timeOnOff.textContent = 'on/off';

    const btnWrapper = addElement(this.base, 'div', 'buttons-wrapper');
    const btnSave = addElement(btnWrapper, 'button', 'buttons', 'buttons-save');
    btnSave.textContent = 'Save';
    this.setChecked(volCheck, volPrgs);
    
    if(this.isVolumeOn === -1) {
      this.setChecked(volCheck, volPrgs);
    }
    this.setChecked(timeCheck, timePrgs);
    if(this.isTimeOn === -1) {
      this.setChecked(timeCheck, timePrgs);
    }

    // ----------- EVENTS ---------------
    let wrapperPlaySound = wrapperGlobal.bind(this, this.playSound);
    let wrapperSave = wrapperGlobal.bind(this, this.save);
    btnSave.onclick = function() {
      wrapperPlaySound();
      wrapperSave();
    }

    let wrapperVolCheck = wrapperGlobal.bind(this, this.setChecked, volCheck, volPrgs);
    let wrapperSetIsVolumeOn = wrapperGlobal.bind(this, this.setIsVolumeOn);
    volCheck.onchange = function() {
      wrapperVolCheck();
      wrapperPlaySound();
      wrapperSetIsVolumeOn();
    } 
    let wrapperVolPrgs = wrapperGlobal.bind(this, this.coloring, volPrgs);
    let wrapperVolumeChange = wrapperGlobal.bind(this, this.changeVolume, volPrgs);
    volPrgs.oninput = function() {
      wrapperVolPrgs();
      wrapperVolumeChange();
      wrapperPlaySound();
    }
    volBtn.onclick = function() {
      if(volCheck.hasAttribute('checked')) {
        volPrgs.value = 0;
        wrapperVolPrgs();
        wrapperPlaySound();
        wrapperVolumeChange();
      }
    }
   
    let wrapperTimeCheck = wrapperGlobal.bind(this, this.setChecked, timeCheck, timePrgs);
    let wrapperSetIsTimeOn = wrapperGlobal.bind(this, this.setIsTimeOn);
    timeCheck.onchange = function () {
      wrapperTimeCheck();
      wrapperPlaySound();
      wrapperSetIsTimeOn();
    }
    let wrapperTimePrgs = wrapperGlobal.bind(this, this.coloring, timePrgs);
    let wrapperTimeChange = wrapperGlobal.bind(this, this.changeTime, timePrgs);
    timePrgs.oninput = function() {
      wrapperTimePrgs();
      timeValue.textContent = timePrgs.value;
      wrapperTimeChange();
      wrapperPlaySound();
    } 

  }
}