import { browser, by, element } from "protractor";

const path = require('path');
const image = '../../../src/assets/img/home.jpg';

export class PhotoUploadPage
{
  static PAGE_TITLE = 'Photo upload';

  navigateTo()
  {
    return browser.get(`${browser.baseUrl}#/p/add`);
  }

  getWindowTitle()
  {
    return browser.getTitle();
  }

  fillDesciptionField(text: string)
  {
    return element(by.css('textarea[formcontrolname=description]'))
    .sendKeys(text);
  }

  upload()
  {
    return element(by.css('button[type=submit]'))
    .click();
  }

  selectImage()
  {
    const absolutePathImage = path.resolve(__dirname, image);
    console.log(absolutePathImage);
    return element(by.css('input[formcontrolname=file]'))
    .sendKeys(absolutePathImage);
  }

}
