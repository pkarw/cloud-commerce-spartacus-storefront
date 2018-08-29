import { browser, by, element, ElementFinder } from 'protractor';
import { AppPage } from '../../app.po';
import { LoginForm } from './login-form.po';
import { E2EUtil } from '../../util.po';

export class LoginPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('y-login-page'));
  readonly loginForm: LoginForm = new LoginForm(this.page);

  navigateTo() {
    return browser.get('/login');
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.loginForm.form);
  }

  async performLogin(email: string, password: string) {
    await this.navigateTo();
    await this.loginForm.fillInForm(email, password);
    await this.loginForm.submitLogin();
  }
}