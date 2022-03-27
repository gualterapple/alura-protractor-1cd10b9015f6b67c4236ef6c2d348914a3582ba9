import { browser, by, element, protractor } from "protractor";

export class HomePage
{
  static PAGE_TITLE = 'Timeline';

  navigateTo()
  {
    return browser.get(`${browser.baseUrl}#/user/flavio`);
  }

  getWindowTitle()
  {
    return browser.getTitle();
  }

  getPhotoListSize()
  {
    return element
    .all(by.css('.photo'))
    .count();
  }

  fillSearchInputWith(text: string)
  {
    return element(by.css('ap-search input[type=search]')).sendKeys(text);
  }

  clickOnFirstItemFromPhotoList(){
    return element.all(by.css('.photo'))
    .first()
    .sendKeys(protractor.Key.ENTER);
  }

}
