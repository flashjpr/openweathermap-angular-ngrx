import { AppPage } from './app.po';
import {browser, protractor} from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the correct heading text', () => {
    page.navigateTo();
    expect(page.heading.getText()).toEqual('AgileSphere coding test - The Weather App');
  });

  it('should not allow to click the search button if there is no input', () => {
    page.navigateTo();
    expect(page.searchCityBtn.isEnabled()).toBe(false);
  });

  it('should not allow to click the search button if the input is 1 char long', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('L');
    expect(page.searchCityBtn.isEnabled()).toBe(false);
  });

  it('should not allow to click the search button if the input is contains special characters', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('London$');
    expect(page.searchCityBtn.isEnabled()).toBe(false);
  });

  it('should not allow to click the search button if the input is contains numbers', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('London 2');
    expect(page.searchCityBtn.isEnabled()).toBe(false);
  });

  it('should allow to click the search button if the input contains multiple words', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('New York');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
  });

  it('should show the weather forecast table for a valid input', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('London');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.cityOutputTable), 3500);
  });

  it('should display a city only once if searched more than once', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('London');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.cityOutputTable), 3500);

    page.searchInputBox.sendKeys('London');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(page.cityOutputTable, 'London'), 3500);

    page.searchInputBox.sendKeys('London');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.cityOutputTable), 3500);

    page.searchInputBox.sendKeys('London');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(page.cityOutputTable, 'London'), 3500);

    expect(page.cityOutputTable.$$('tr').count()).toBe(2);
  });

  it('should show the weather forecast for two cities for a valid inputs', () => {
    page.navigateTo();
    page.searchInputBox.sendKeys('London');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.cityOutputTable), 3500);
    expect(page.cityOutputTable.$$('tr').get(1).$$('td').getText()).toContain('London');

    page.searchInputBox.sendKeys('Berlin');
    expect(page.searchCityBtn.isEnabled()).toBe(true);
    page.searchCityBtn.click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(page.cityOutputTable, 'Berlin'), 3500);
    expect(page.cityOutputTable.$$('tr').get(2).$$('td').getText()).toContain('Berlin');
  });

});
