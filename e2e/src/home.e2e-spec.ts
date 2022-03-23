import { browser, logging } from 'protractor';
import { HomePage } from './home.po';
import { PhotoDetailPage } from './photo-detail.po';

describe('Home Page', () => {

  let homePage: HomePage;
  let photoDetailPage: PhotoDetailPage;

  beforeEach( async () => {
    homePage = new HomePage();
    photoDetailPage = new PhotoDetailPage();
    await homePage.navigateTo();

  });

  afterEach( async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });


  it('Should navigate to user profile', async () => {
    const title = await homePage.getWindowTitle();
    expect(title).toEqual(HomePage.PAGE_TITLE);
  });

  it('Should display a list of photos', async () => {
    const photoListSize = await homePage.getPhotoListSize();
    expect(photoListSize).toBeGreaterThan(0);
   });

   it('Should navigate to photo detail when photo navigation is triggered', async () => {
    await homePage.clickOnFirstItemFromPhotoList();
    const title = await photoDetailPage.getWindowTitle();
    expect(title).toBe(PhotoDetailPage.PAGE_TITLE);
   });

   it('Should list one item when filtering by word "farol"', async () => {
    await homePage.fillSearchInputWith('farol');
    const photoListSize = await homePage.getPhotoListSize();
    expect(photoListSize).toBe(1);
   });

});
