var fullname = 'Protractor Test';
var email = 'protest@black-monolith.com';
var username = 'proTest';
var password = 'password';

describe('Rideshare Homepage', function () {
  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('should allow user to sign up', function () {
    element(by.linkText('Join')).click();

    //wait for angular?

    var fullnameField = element(by.model('user.name'));
    var emailField = element(by.model('user.email'));
    var usernameField = element(by.model('user.username'));
    var passwordField = element(by.model('user.password'));
    var confirmPasswordField = element(by.model('user.confirmPassword'));
    var submit = element(by.buttonText('Sign up'));

    fullnameField.sendKeys(fullname);
    emailField.sendKeys(email);
    usernameField.sendKeys(username);
    passwordField.sendKeys(password);
    confirmPasswordField.sendKeys(password);

    submit.click();

    var loggedInName = element(by.binding('global.user.name')).getText();

    expect(loggedInName).toEqual(fullname);
  });
});