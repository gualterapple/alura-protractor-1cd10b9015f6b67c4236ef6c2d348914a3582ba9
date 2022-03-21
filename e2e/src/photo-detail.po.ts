import { browser } from "protractor";

export class PhotoDetailPage
{

  static PAGE_TITLE = 'Photo detail';

  getWindowTitle()
  {
    return browser.getTitle();
  }
}
