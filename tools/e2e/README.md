# Rideshare Protractor Tests

## References

[AngularJS Protractor Tutorial](https://angular.github.io/protractor/#/tutorial)

[Protractor Walkthrough](https://ramonvictor.github.io/protractor/slides/)

## Install Protractor globally

```
npm install -g protractor
```

To run the tests be sure to have webdriver-manager ready with:

```
webdriver-manager update
```

## Run tests

Be sure webdriver-manager server is running in a separate terminal instance or in the background

```
webdriver-manager start
```

Then run:

```
protractor <mean.io root>/tools/e2e/conf.js
```

## Debugging

```
webdriver-manager start
/usr/local/lib/node_modules/protractor/bin/elementexplorer.js http://localhost:3000
```
Press `tab` and play with element locators
