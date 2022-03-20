import { browser, element, by } from 'protractor';

describe('', () => {

  it('Should navigate to user profile', async () => {
    await browser.get(`${browser.baseUrl}/#/user/flavio`);
    const title = await browser.getTitle();
    expect(title).toEqual('Timeline');
  });

  it('Should display a list of photos', async () => {
    await browser.get(`${browser.baseUrl}/#/user/flavio`);
    const list = element.all(by.css(null));

   });

});
