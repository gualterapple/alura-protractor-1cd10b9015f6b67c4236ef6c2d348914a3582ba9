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

  fillEmailField(text: string)
  {
    return element(by.css('input[formcontrolname=email]'))
    .sendKeys(text);
  }

  fillFullNameField(text: string)
  {
    return element(by.css('input[formcontrolname=fullName]'))
    .sendKeys(text);
  }

  fillUserNameField(text: string)
  {
    return element(by.css('input[formcontrolname=userName]'))
    .sendKeys(text);
  }

  fillPasswordField(text: string)
  {
    return element(by.css('input[formcontrolname=password]'))
    .sendKeys(text);
  }

  register()
  {
    return element(by.css('button[type=submit]'))
    .click();
  }

}
