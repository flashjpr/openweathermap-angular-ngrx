import { browser, by, element } from 'protractor';

export class AppPage {
  heading = element(by.id('nav'));
  searchInputBox = element(by.id('city'));
  searchInputRequiredError = element(by.id('searchInputRequiredError'));
  searchInputMinLengthError = element(by.id('searchInputMinLengthError'));
  searchInputInvalidInputError = element(by.id('searchInputInvalidInputError'));

  searchCityBtn = element(by.id('searchCityBtn'));
  cityOutputTable = element(by.id('cityOutputTable'));

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

}
