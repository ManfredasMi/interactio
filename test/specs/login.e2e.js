const LoginPage = require('../pageobjects/login.page');
const DashboardPage = require('../pageobjects/dashboard.page');
const validation = require('../helpers/validation');
const scenarioData = require('../staticValues/scenarioData.json');
const helper = require('../helpers/backendHelper');

describe('Administration panel login page', () => {
    before(() => {
        LoginPage.open();
    });
    
    it('error message should be present when login in with invalid credentials', () => {
        LoginPage.login('invalidUsername@interactio.io', 'invalidPassword!');
        expect(LoginPage.labelErrorMessage).toBeExisting();
        expect(LoginPage.labelErrorMessage).toHaveTextContaining(
            'Invalid email or password');
    });

    it('should login with valid credentials', () => {
        LoginPage.login('recruitment_test@interactio.io', 'WelcomeOnBoard!');
        expect(DashboardPage.headerAlert).toBeExisting();
        expect(DashboardPage.headerAlert).toHaveTextContaining(
            'Recruitment');  
    });

    it("expect get info request response status code to be valid after successful login", () => {
      browser.call(async () => {
        await helper.getInfo().then(({ status }) => {
          validation.expectCondition(
            scenarioData.success.expectedHttpStatusCode,
            status,
            `get info endpoints request returned invalid http status code. Was expecting ${
              scenarioData.success.expectedHttpStatusCode
            } but got ${status} instead`
          );
        });
      });
    });
});
