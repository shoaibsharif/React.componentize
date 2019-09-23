## Make React Components

Some important points to remember as you get started

- You must execute a `yarn install` command before you can execute a `yarn start` command
- Be sure to install all VS Code "Recommended Extensions" as they are required
- Execute the ./share-branch.sh script to back up your every night. [Instructions](http://code.sabio.la:8080/tfs/SabioCollection/_wikisearch?type=wiki&text=quickly%20saving%20branch%20share-branch.sh)

### Already Installed Into This Appilication

The following modules are already installed

- bootstrap
- reactstrap
- axios
- react-router

---

The goal of this exercise is to make break up the the web page see when you run via `yarn start` into different React Components.

:star: Use the `/public/Step1.png` file located in the public folder as guidance for the compoenents you should create.

> This material was covered in the videos you have been pointed to, within this wiki

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
