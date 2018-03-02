# Bill-Voting-System

Letting your voices and opinions count

[![Coverage Status](https://coveralls.io/repos/github/Merdoth/Bill-Voting-System/badge.svg?branch=staging)](https://coveralls.io/github/Merdoth/Bill-Voting-System?branch=staging)
[![Maintainability](https://api.codeclimate.com/v1/badges/d254b661f553f2d21dd3/maintainability)](https://codeclimate.com/github/Merdoth/Bill-Voting-System/maintainability)
[![Build Status](https://travis-ci.org/Merdoth/Bill-Voting-System.svg?branch=staging)](https://travis-ci.org/Merdoth/Bill-Voting-System)

# Introduction

This is s simple application that grants users the opportunity to vote for or against bills that are to be passed into law by the legislative arm of government. This application gives voice to the citizenry and participation in legislation.

# Features of Bill-Voting-System API

### Authentication

- JSON Web Token (JWT) is used to authenticate users.
- The API creates a token everytime a user and admin logs in.
- The user supplies the token created, before the user can access certain protected endpoints.
- The admin supplies the token created, and has access to all protected endpoints.


### ADMIN

- Admin must be an authenticated user.
- Admin position can be handled by different people at the same time.
- Admin should be able to create a new bill which contains: "Title, Description, Bill progress ( Not enacted >> Senate Voted >> House Passed )".
- Admin should be able to edit a bill.
- Admin should be able to delete a bill


### Users 

- New users can sign up.
- Signed up users can login and get an authentication token.
- Authenticated users can view their details and be able to edit their profile.

### Opinions / Comments

- Authenticated users should be able to add an opinion while voting for a bill.
- Authenticated users cannot add an opinion after bill has progressed to being “Passed” by the house.


### Voting

- Authenticated users should be able to vote for or against a bill.
- Authenticated users should be able to see all bills they have voted for.

### Share

- Authenticated users should be able to share a bill on at least 3 social media platforms.

### Search

- Authenticated users should be able search for a bill.



# Dependencies


`NodeJS:`is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

`es6(ECMAScript 2015)`: es6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, etc.

`Express`: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

`Mongoose`: Mongoose is a powerful, open source object-document mapper system. It is used to persist document API's data.

`Babel`: Babel is used to transpile es6 down to es5.

`MongoDB`: MongoDB is a promise-based Obect Document Mapper (ODM) for Node.js and io.js.

`Mocha`: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha is the testing framework used to test the API's functionalities.


# For Local setup and testing:
- If you don't have NodeJS already installed go here and install it.
- Clone this repository by running
- `git clone https://github.com/Merdoth/Bill-Voting-System.git` on your terminal.
- Navigate into the cloned project directory.
- For example, if you cloned the project into the desktop directory, then run cd desktop which takes you into the desktop, then `cd Bill-Voting-System` to enter the project directory.
- Once in the project directory, install all project dependencies by running `npm install`.
- Run the command `npm run start:dev` to start the application.
- To run tests, run the command `npm test`.


# Contributing

Please go through [this](https://github.com/Merdoth/Bill-Voting-System/wiki/Contributing) for details on code of conduct, and the process for submitting pull requests to me.
* Fork this repository by clicking the Fork menu item in the top right corner of this repository.
* Go to your github account, and under your repository list, you should find this project listed.
* Open the project, click on the clone or download button, then copy the url that pops up.
* Open your terminal and run the command git clone url where url is the url from the previous step.
* Navigate into the cloned project directory.
* For example, if you cloned the project into the desktop directory, then run cd desktop which takes you into the desktop, then `cd Bill-Voting-System` to enter the project directory.
* Once in the project directory, install all project dependencies by running npm install.
* Create your feature branch on your local machine by running `git checkout -b branchName`, where branchName is the name of your feature branch.
* Make your changes.
* Add your changes by running git add filePath, where filePath is path of the file(s) in which the change(s) were made.
* Commit your changes by running `git commit -m "commit message"`.
* Push your changes to your remote branch by running `git push origin branchName`.
* Open a pull request to the staging branch.

# Resources

JSON Web Token (JWT): JWT is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWT is used for secure login.


# Limitations

- Users can only sign in with their email and password.
- Users will be able to access the full application functionalities only if they are authenticated.
- User cannot be an Admin unless an already existing Admin grants him access.
- Admin must be a an authenticated user.

# License
- This project is authored by Chimereucheya Gladys Okereke, and is licensed for use, distribution and modification under the ISC license.




