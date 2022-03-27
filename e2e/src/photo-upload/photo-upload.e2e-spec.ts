import { browser, logging } from 'protractor';
import { HomePage } from '../home/home.po';
import { PhotoUploadPage } from './photo-upload.po';

describe('Photo Upload Page', () => {

  let homePage: HomePage;
  let photoUploadPage: PhotoUploadPage;

  beforeEach( async () => {
    homePage = new HomePage();
    photoUploadPage = new PhotoUploadPage();
    await photoUploadPage.navigateTo();

  });

  afterEach( async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });

  it('Should navigate to photo upload page', async () => {
    const title = await photoUploadPage.getWindowTitle();
    expect(title).toEqual(PhotoUploadPage.PAGE_TITLE);
  });

  it('Should upload photo with comment', async () => {
    await photoUploadPage.selectImage();
    await photoUploadPage.fillDesciptionField('Some Description');
    await photoUploadPage.upload();
    const title = await homePage.getWindowTitle();
    expect(title).toEqual(HomePage.PAGE_TITLE);
  });

});
