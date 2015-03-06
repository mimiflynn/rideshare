var Homepage = function () {
  this.joinButton = element(by.linkText('Join'));
  this.fullnameField = element(by.model('user.name'));
  this.emailField = element(by.model('user.email'));
  this.usernameField = element(by.model('user.username'));
  this.passwordField = element(by.model('user.password'));
  this.confirmPasswordField = element(by.model('user.confirmPassword'));
  this.submit = element(by.buttonText('Sign up'));
  this.globalUsername = element(by.binding('global.user.name'));
};

module.exports = Homepage;