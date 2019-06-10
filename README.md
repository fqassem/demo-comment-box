# Alo Moves Front End Project

This project was bootstrapped with Create-React-App. Note that you will need to supply your own *src/firebase.js* file that is formatted like the one in the project instructions with your own keys.

## Tour

*App.js* is the heart of the application, where we display the title of the page and render a Comments container.

*Comments* is a container that hooks into our firebase datastore and subscribes to updates on the 'comments' collection. If any change occurs, the state is set and the ui is updated with the newest version of the comments collection. It uses the stateless *CommentBox* presentation component that lives in the *components* folder.

## Improvements

* Because form validation is so tedious and because there are a dozen form libraries to make this less of a pain, I've simply relied on HTML5 built-in form validation to keep things simple. In a large-scale project, a dedicated form library would be the right way to go.
* For such a small project, using regular old CSS imports is fine. But, as the project grows, so will the CSS complexity. Using CSS modules (and perhaps SASS or even Styled-Components) would keep things scoped and maintainable. Some solutions would automatically add nice-to-haves like vendor prefixes, minification, etc.
* Server-side Validation: Dates are kind of strange in firebase, as the server needs to process the placeholder date. This seems to take much longer than it does to process any updates or deletions. It might just be easier to use a regular JS Date() and create Firestore rules to ensure that the user hasn't manipulated the data instead of relying on the placeholder data and having multiple re-renders.