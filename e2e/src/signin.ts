import { browser, by, element } from "protractor";

export class SignInPage
{
  static PAGE_TITLE = 'Sign in';

  navigateTo()
  {
    return browser.get(`${browser.baseUrl}#/home/signin`);
  }

  getWindowTitle()
  {
    return browser.getTitle();
  }

  fillEmailField(text: string)
  {
    return element(by.css('input[formcontrolname=email]'))
    .sendKeys(text);
  }

  fillPasswordField(text: string)
  {
    return element(by.css('input[formcontrolname=password]'))
    .sendKeys(text);
  }

  login()
  {
    return element(by.css('button[type=submit]'))
    .click();
  }

}
