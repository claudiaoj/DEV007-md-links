// const { mdLinks } = require('./index.js');

import { mdLinks } from './index.js';

mdLinks('/noexiste/').then(() => {
    
}).catch((error) => {
    console.log(error);
});
console.log();
