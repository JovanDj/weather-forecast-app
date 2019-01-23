import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }
}
