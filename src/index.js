import PageLoader from "./PageLoader.js";
import { setLocalStorage, getLocalStorage, ContextName, ContextDefaultValue} from './LocalStorage.js';

const isInit = Number(getLocalStorage(ContextName.isInit));
if(isInit !== 1) {
  setLocalStorage(ContextName.isInit, ContextDefaultValue.isInit);
  setLocalStorage(ContextName.isVolumeOn, ContextDefaultValue.isVolumeOn);
  setLocalStorage(ContextName.volume, ContextDefaultValue.volume);
  setLocalStorage(ContextName.isTimeOn, ContextDefaultValue.isTimeOn);
  setLocalStorage(ContextName.time, ContextDefaultValue.time);
  setLocalStorage(ContextName.arrayOfQuestion, ContextDefaultValue.arrayOfQuestion);
  setLocalStorage(ContextName.arrayOfPlayedCategories, ContextDefaultValue.arrayOfPlayedCategories);
} 

const mainDiv = document.querySelector('#main'); 
const forPopup = document.querySelector('.for-popup');
export const loader = new PageLoader(mainDiv, forPopup);
loader.startUp();