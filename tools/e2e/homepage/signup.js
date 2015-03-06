var Homepage = require('./homepage.po.js');

var params = browser.params;

describe('Rideshare Homepage', function () {
  var homepage = new Homepage();
    
  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('should allow user to sign up', function () {
    homepage.joinButton.click();

    homepage.fullnameField.sendKeys(params.user.fullname);
    homepage.emailField.sendKeys(params.user.email);
    homepage.usernameField.sendKeys(params.user.username);
    homepage.passwordField.sendKeys(params.user.password);
    homepage.confirmPasswordField.sendKeys(params.user.password);

    homepage.submit.click();

    var loggedInName = homepage.globalUsername.getText();

    expect(loggedInName).toEqual(params.user.fullname);
  });
});
