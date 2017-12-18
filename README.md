![Build Status](https://circleci.com/gh/nkmishra1997/bnb2018.svg?style=shield&circle-token=:circle-token)
[![NSP Status](https://nodesecurity.io/orgs/bnb/projects/f7b3f0b2-5957-467a-8239-2119145287ac/badge)](https://nodesecurity.io/orgs/bnb/projects/f7b3f0b2-5957-467a-8239-2119145287ac)

# bnb2018
Virtual Stock Market Game

# Instructions to run  
For the first time :	
Give permissions - `chmod 755 run.sh`	
Then simply run the script:	
`./run.sh`	

OR you can do it manually:

You need to have  `npm` , `nodejs` and `angular/cli` installed to run the project  
`npm install` This will install express dependencies      
`cd bnb` Moving to Angular folder  
`npm install`  This will install angular dependencies  
`cd ..`   
`npm run build`     
`nodemon`   


# Replace APP_ID and APP_Secret with your fb app id and secret in config/auth.js  
Disable git to monitor any changes to the auth.js file   
`git update-index --skip-worktree config/auth.js`

# TO run tests:  
`npm test`  


# Instructions to Contribute
* fork this repo.
* clone your fork and work in your fork.
* before creating pull request :`git pull --rebase origin <branch>`
* all packages should be installed using `npm install <package name> --save`
* There will be frequent merge conflicts in package.json file so resolve them properly.
* Angular part is in 'bnb' folder.

