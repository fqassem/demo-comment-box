# Alo Moves Front End Project

This project was bootstrapped with Create-React-App. 

## Tour

*App.js* is the heart of the application. When the app mounts, we subscribe to updates from Firebase store, listening for any modifications to the 'comments' collection. If any changes occur, we update the state to reflect the new state of the comments. 

## Improvements

* Because form validation is so tedious and because there are a dozen form libraries to make this less of a pain, I've simply relied on HTML5 built-in form validation to keep things simple.
