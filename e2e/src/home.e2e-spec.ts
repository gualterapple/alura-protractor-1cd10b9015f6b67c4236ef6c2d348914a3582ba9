import { browser, element, by, protractor } from 'protractor';

describe('Home Page', () => {

  beforeEach( async () => {
    await browser.get(`${browser.baseUrl}/#/user/flavio`);
  });


  it('Should navigate to user profile', async () => {
    const title = await browser.getTitle();
    expect(title).toEqual('Timeline');
  });

  it('Should display a list of photos', async () => {
    const list = element.all(by.css('.photo'));
    const photoListSize = await list.count();
    expect(photoListSize).toBeGreaterThan(0);
   });

   it('Should navigate to photo detail when photo navigation is triggered', async () => {
    const firstElement = element.all(by.css('.photo')).first();
    await firstElement.sendKeys(protractor.Key.ENTER);
    const title = await browser.getTitle();
    expect(title).toBe('Photo detail');
   });

   it('Should list one item when filtering by word "farol"', async () => {
    const searchInput = element(by.css('ap-search input[type=search]'));
    await searchInput.sendKeys('farol');
    const list = element.all(by.css('.photo'));
    const photoListSize = await list.count();
    expect(photoListSize).toBe(1);
   });

});
