# Your First Repo 
This repo is here to give you a place to store your code and get familiar with Git :smile:


# Files Included Here

## **np.sh**
This file will set up Notepade++ as the default editor that Git will use when it needs you to provide a message.

Run this file from the bash window like so:
``` bash

./np.sh

```


## **share-branch.sh**
This will take your current changes and push them to the remote server (ie The Git Repo or The TFS Server where the Git Repo is located). 

We do this so that you can _safely_ save your work on the sever, away from your machine, where you may lose your work by accident or simply to give others access to your code.  

Run this file from the bash window like so:
``` bash

./share-branch.sh

```


## **template.html**
A familiar template that you can use for your work. You can run this like you have any other files with live server.

Be sure to have your Live Server Settings changed so that when it launches a new page it does so with the ```localhost```

Go File Menu> Preferences > Settings ... and then type in the search box: ```liveServer.settings.host```. The default is 127.0.0.1

``` 
live-server.settings.host": "localhost"
```


