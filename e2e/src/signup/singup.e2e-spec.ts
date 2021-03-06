import { browser, logging } from "protractor";
import { HomePage } from "../home/home.po";
import { SignInPage } from "../signin/signin.po";
import { SignUpPage } from "./signup.po";

describe('Sign up User', () => {

  let signUpPage: SignUpPage = null;
  let signInPage: SignInPage = null;
  let homePage: HomePage = null;

  /*afterEach( async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });*/

  beforeEach( async () => {
    signUpPage = new SignUpPage();
    signInPage = new SignInPage();
    homePage = new HomePage();
    await signUpPage.navigateTo();
  });

  it('Should be on Signup Page', async () => {
    const title = await signUpPage.getWindowTitle();
    expect(title).toEqual(SignUpPage.PAGE_TITLE);
  });

  it('Should register a user', async () => {
    const randomPrefix = Math.round(Math.random() * 100000);
    await signUpPage.fillField('email', `email${randomPrefix}@email.com`);
    await signUpPage.fillField('fullName', `Some Name ${randomPrefix}`);
    const userName = `user${randomPrefix}`;
    await signUpPage.fillField('userName', userName);
    const password = `12345678`;
    await signUpPage.fillField('password', password);
    await signUpPage.register();
    const title = await signInPage.getWindowTitle();
    expect(title).toEqual(SignInPage.PAGE_TITLE);
    await signInPage.fillUserNameField(userName);
    await signInPage.fillPasswordField(password);
    await signInPage.login();

    let title1 = await homePage.getWindowTitle();
    expect(title1).toEqual(HomePage.PAGE_TITLE);

  });

});
