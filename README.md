# Step 1 React

## Make Components

The goal of this Step 1 is to make the web page you run via `yarn start` look like the template.html file. 
To do that, you will want to take the *contents* of the template.html file and have it rendered by React. 

This is a multi-step process

- Take the CSS and JS Files from Template.html and simply put them into the head of the index.html file as you normally would.
  - We want to focus on React component functionality first. We will discuss importing CSS via React at another time

- Next, start to bring over the HTML from within the Template.html file into App.js file.

  - You can do this step all at ones or element by elment.
  
- Once you have all the HTML being redered out of the `App.js` file then you need to break that HTML file/elemnets into compononents.

  - We can show you in class how do that for a simple Component. From there, use the wiki and other resources to help you accomplish this task.

:star: Use the `/public/Step1.png` file located in the public folder as guidance for the compoenents you should create.
> This material was covered in the videos you have been pointed to, within this wiki and or simply found through some good Google Searching


## Click Handler

- Add a button to the Content Component
- Add a click handler that will console.log a message

## After Compoments are Built

- Implement Routing to render the compoenets

## Ajax Call

- Make a hard coded ajax call to the login endpoint (user example below)

  - Search this wiki "Axios Template"

```javascript
var payload = { email: "user@google.com", password: "password" };
```
