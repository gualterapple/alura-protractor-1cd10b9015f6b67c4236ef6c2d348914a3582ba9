import { browser, by, element } from "protractor";

export class SignUpPage
{
  static PAGE_TITLE = 'Sign up';

  navigateTo()
  {
    return browser.get(`${browser.baseUrl}#/home/signup`);
  }

  getWindowTitle()
  {
    return browser.getTitle();
  }

  fillField(control: string, text: string)
  {
    return element(by.formControlName(control))
    .sendKeys(text);
  }

  register()
  {
    return element(by.css('button[type=submit]'))
    .click();
  }

}
