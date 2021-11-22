import MainPage from "./MainPage.js";
import SettingsPages from "./SettingsPages.js";
import ArtistsCategoriesPages from "./ArtistsCategoriesPages.js";
import PicturesCategoriesPages from "./PicturesCategoriesPages.js";
import {Pages} from './common.js'
import QuestionArtistsPages from "./QuestionArtistsPage.js";
import QuestionPicturesPages from "./QuestionPicturesPage.js";
import ResultPage from "./ResultPage.js";
import ScorePage from "./ScorePage.js";


export default class PageLoader {
  constructor(div, div2) {
    this.base = div;
    this.forPopup = div2;
    this.mainPage = new MainPage(this.base);
    this.settingPage = new SettingsPages(this.base); 
    this.artistsCategories = new ArtistsCategoriesPages(this.base);
    this.picturesCategories = new PicturesCategoriesPages(this.base);
    this.questionArtists = new QuestionArtistsPages(this.base);
    this.questionPictures = new QuestionPicturesPages(this.base);
    this.result = new ResultPage(this.base);
    this.score = new ScorePage(this.base);
    this.currentPage = this.mainPage;
    this.volume 
  }

  hide() {
    this.forPopup.textContent = '';
    this.forPopup.classList.remove('hide-block');
    this.base.classList.add('hide-block');
    setTimeout(this.remove, 500, this);
  }
  remove(self) {
    self.base.textContent = '';
    self.reload();
  }

  reload() {
    this.currentPage.loadContext();
    this.currentPage.render();
    this.base.classList.remove('hide-block');
  }
  startUp() {
    this.currentPage.loadContext();
    this.currentPage.render();
  }
  
  goto(state, ...args) {
    switch(state) {
      case Pages.main:
        this.currentPage = this.mainPage;
        break;
      case Pages.art:
        this.currentPage = this.artistsCategories;
      break;
      case Pages.pic:
        this.currentPage = this.picturesCategories;
      break;
      case Pages.setting:
        this.currentPage = this.settingPage;
      break;
      case Pages.questionArtists:
        this.currentPage = this.questionArtists;
        this.currentPage.configure(...args);
      break;
      case Pages.questionPictures:
        this.currentPage = this.questionPictures;
        this.currentPage.configure(...args);
      break;
      case Pages.result:
        this.currentPage = this.result;
        this.currentPage.configure(...args);
      break;
      case Pages.score:
        this.currentPage = this.score;
        this.currentPage.configure(...args);
      break;
    }
    this.hide();
  }
}
