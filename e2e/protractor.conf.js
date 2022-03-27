// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './src/**/*.e2e-spec.ts'
    ],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--incognito']
        }
    },
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json')
        });
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: StacktraceOption.PRETTY
            }
        }));

        // @ts-ignore
        by.addLocator('formControlName', text => {
          return document.querySelector(`[formcontrolname=${text}]`);
        });

        //Garantindo login antes de qualquer teste
        // @ts-ignore
        browser.driver.get('http://localhost:4200/#/home');
        // @ts-ignore
        browser.driver.findElement(by.id('username'))
            .sendKeys('flavio');
        // @ts-ignore
        browser.driver.findElement(by.id('password'))
            .sendKeys('123');
        // @ts-ignore
        browser.driver.findElement(by.id('login-button'))
            .click();

        // @ts-ignore
        return browser.driver.wait(() => {
            // @ts-ignore
            return browser.driver.getCurrentUrl().then(url => {
                return /user/.test(url);
            });
        }, 10000);


    }
};
