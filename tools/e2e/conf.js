exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'homepage/signup.js'
  ],
  params: {
    user:  {
      fullname: 'Protractor Test',
      email: 'protest@black-monolith.com',
      username: 'proTest',
      password: 'password'
    }
  }
};
