import App from './src';
const port: number | string = process.env.PORT || 3000;
const myApp = new App(port);
myApp.start();
