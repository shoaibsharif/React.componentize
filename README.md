# Your First Repo 
This repo is here to give you a place to store your code and get familiar with Git :smile:

# Summary of Commands 
You should run these commands before you start coding. You can run these out of the git bash window.

```


npm install -g npm@latest

npm install -g typescript

```


# Files Included Here



## **template.html**
A familiar template that you can use for your work. You can run this like you have any other files with live server.

Be sure to have your Live Server Settings changed so that when it launches a new page it does so with the ```localhost```

Go File Menu> Preferences > Settings ... and then type in the search box: ```liveServer.settings.host```. The default is 127.0.0.1

``` 
live-server.settings.host": "localhost"
```

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

This script runs a series of commands that you could very well run by hand. Here they are.

###Command Summary
``` bash

# Change Directory the the folder you want to work in
cd /c/SF.Code/C36/Fundamentals
# verify that you working directory is dirty, meaning it has pending changes
git status

# the add command will "add" the current changes to the list of changes to be committed
git add -A

# commits the changes to history with the given message.
git commit -m 'this is my meaningful message for the implemented cool feature'

# creates a new branch by the name of 'dan/some-cool-feature'
git checkout -b dan/some-cool-feature

#proTip -- putting a / in the branch name will organize your branches into a folder structure in our Git Repo's

# push the branch to server where everyone can see it
git push origin HEAD

# checks out the last branch we were working on
git checkout -

# brings back the dirty state of the tree as it was before we started this
# we do this so we can more easily track our work in progress
git reset HEAD^

# double check the status of the files to what we expect
git status
```


# Git
The tools we will use to keep track of code changes is Git. Over the course of the first couple of weeks we will dig discuss more and more of Git. 

:key: [Here](http://code.sabio.la:8080/tfs/SabioCollection/Content-General/_wiki/wikis/Content-General.wiki?wikiVersion=GBwikiMaster&pagePath=%2FGit%20Welcome) are some critical topics on Git 





