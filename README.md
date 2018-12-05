This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Make Components

The goal of this Step 1 is to make the web page you run via `npm start` look like the template.html file. 
To do that, you will want to take the *contents* of the template.html file and have it rendered by React. 

This is a multi-step process

1 - Take the CSS and JS Files from Template.html and simply put them into the head of the index.htmls file.

2 - Next start to bring over the HTML from within the Template.html file into App.js file.

> You can do this step all at ones or element by elment.

3. Once you have all the HTML being redered out of the App.js file then you need to break that HTML file/elemnets into compononents.

4 - Use the Step1.png file located in the public folder as guidance for the compoenents you should create.

## Click Handler

- Add a button to the Content Component
- Add a click handler that will console.log a message

## After Compoments are Built

- Implment Routing to render the compoenets

## Ajax Call

-- Make a hard coded ajax call to the login endpoint (user example below)

```javascript
var payload = { email: "user@google.com", password: "password" };
```
