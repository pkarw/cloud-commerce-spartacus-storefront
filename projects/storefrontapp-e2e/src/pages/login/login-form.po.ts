import { by, element, ElementFinder } from 'protractor';

export class LoginForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('y-root'))
  ) {}

  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('y-login-form')
  );
  readonly emailField: ElementFinder = this.form.element(
    by.css('[formcontrolname=userId]')
  );
  readonly passwordField: ElementFinder = this.form.element(
    by.css('[formcontrolname=password]')
  );
  readonly signInButton: ElementFinder = this.form.element(
    by.css('button[type=submit]')
  );
  readonly registerButton: ElementFinder = this.form.element(
    by.cssContainingText('a', 'REGISTER')
  );

  async fillInForm(email: string, password: string) {
    await this.emailField.sendKeys(email);
    await this.passwordField.sendKeys(password);
  }

  async submitLogin() {
    await this.signInButton.click();
  }
}