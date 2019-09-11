## Make React Components

> You must execute a `yarn install` command before you can execute a `yarn start` command

### Already Installed Into This Appilication

The following modules are already installed

- bootstrap
- reactstrap
- axios
- react-router

---

The goal of this Step 1 is to make the web page you run via `yarn start` look like the template.html file.
To do that, you will want to take the _contents_ of the template.html file and have it rendered by React.

This is a multi-step process

- Start to bring over the HTML from within the Template.html file into App.jsx file.

  - You can do this step all at ones or element by elment.

- Once you have all the HTML being redered out of the `App.jsx` file then you need to break that HTML file/elemnets into compononents.

  - We can show you in class how do that for a simple Component. From there, use the wiki and other resources to help you accomplish this task.

:star: Use the `/public/Step1.png` file located in the public folder as guidance for the compoenents you should create.

> This material was covered in the videos you have been pointed to, within this wiki and or simply found through some good Google Searching

:star: After you are done breaking up the page into components then do the following tasks below.

## Implement a Click Handler

- Add a button to the Content Component
- Add a click handler that will console.log a message

## Implement React Router

- Implement Routing to render the components
  - The package `react-router-dom` is already included in the packages.json file so you do not have to install
  - [Wiki Page](http://code.sabio.la:8080/tfs/SabioCollection/Content-JavaScript/_wiki/wikis/Content-JavaScript.wiki?pagePath=%2FJavascript%20Home%2FReact%20Home%2FReact%20Router&wikiVersion=GBwikiMaster)

## Implement an Ajax Call

- Make a hard coded ajax call to the login endpoint (user example below)

  - Search this wiki ["Axios Template"](http://code.sabio.la:8080/tfs/SabioCollection/_wikisearch?type=wiki&text=axios%20call)

```javascript
var payload = { email: "user@google.com", password: "password" };
```
