# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Language used is Typescript.

Below you will find some information on how to perform common tasks.<br>

## Table of Contents

- [Getting Started](#getting-started)
- [Installing](#installing)
- [Run with NPM](#run-with-npm)
- [Run With Docker](#run-with-docker)
- [Available Scripts (NPM)](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run test:tsc](#npm-run-test:tsc)
  - [npm run test:lint](#npm-run-test:lint)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Built with](#built-with)

## Getting Started

![Screen Shopt](images/screenshot.png?raw=true "Screen Shot")
![Screen Shopt](images/screen-recording.gif?raw=true "Screen Shot")
## Installing
```
git clone https://github.com/waleedmehmood-10p/shirt-discount-calculator.git
cd shirt-discount-calculator
```
## Run with NPM

### Prerequisites
Make sure you have already installed Node engine.
```
node -v
```
### Running the project
Run the following commands for testing and running up
```
npm run test
npm start
```
Go to http://localhost:3000

## Run With Docker

### Prerequisites
Make sure you have already installed Docker Engine. You don’t need to install NPM. It will run tests and build a containerized application. It take a little time to load as it first runs the test and then the main app

### Running the project
```
docker-compose build
docker-compose up -d
```
## Available Scripts (NPM)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test:tsc`

Launches the Typesciprt compilation and test the code for typescript errors.\

### `npm test:tsc`

Launches the test for linting errors.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Built With 
* [React.js](https://reactjs.org/) - The front-end framework used
* [Docker](https://www.docker.com/) - Containerization
* [Styled-Components](https://styled-components.com/) - Front-end Styling