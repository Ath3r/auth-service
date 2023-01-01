import { ExpressApp } from './app';

require('module-alias/register');

const app = new ExpressApp();

app.start();
