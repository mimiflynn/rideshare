# Rideshare

A tool for organizing rides for group destination vacations.

## Getting Started

Be sure to run `bower install` in the `/rideshare` home directory.

## User Flow Updates

- descriptive home page with user story as to what problem the app solves
- app specific menu with logo and name - use road icon temporarily

## Event Enhancements

- event page with dynamic signup form
- disable attendee signup if no events for user email
- connect event to users - email if no signed up, userId if signed up


## End to End testing

- test it all


## Refactor To Do

- helper function service?
- Error message service?
- Overall messaging service for all text?
- make create / edit form directives with different submit handlers?
- make edit controller extend create controller?
- make admin controller extend list controllers
- refactor date functionality into a directives
- make ride cards a directive? somehow componentalize the cards

- Better validation - directives for input types? - done-ish
- rename 'Rideshare' with 'Attendee' - done
- names of controllers - actionDataType (CreateRider, CreateDriver, CreateEvent) - done
- names of views - done
- route paths - done
- create service for package info static data - done

## new features for next release

- angular-material integration? - not ready for production
- Event name - organize and show only for specific events
- more fields if user is a driver - car size, stuff like that
- limit calendar to times in the future

## Future Features

- single rideshare page for confirmation?
- user log in and edit their info
- select role between rider and driver
- allow drivers to drag and drop riders into their car
- allow drivers and riders to send reqests to each other
- option automatically fill in cars
- allow users to view grid of all riders and drivers



## App Flow

### Views

- Intro page
- Menu
- Ride and driver sign up page
- Sort and Match page
- Admin page



## Deployment notes

NGINX proxy to port 3000

app running as a service via forever

upon git pull run must

```
forever stop server.js
npm install
bower install
cd packages/custom/rideshare
bower install
cd -
forever start server.js
```

Be sure mongod and nginx are running... dontcha know

## MongoDB

https://stackoverflow.com/questions/3366397/delete-everything-in-a-mongodb-database

reset DB for clean deving

```
mongo
show databases
use <db name>
db.dropDatabase()
```

## Protractor Tests

https://angular.github.io/protractor/#/tutorial

Install Protractor globally

```
npm install -g protractor
```

To run the tests be sure to have webdriver-manager ready with:

```
webdriver-manager update
```

### To run tests:

Be sure webdriver-manager server is running in a separate terminal instance or in the background

```
webdriver-manager start
```

Then run:

```
protractor <mean.io root>/tools/e2e/conf.js
```