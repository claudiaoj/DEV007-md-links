Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.mdLinks = void 0;
const _fs = _interopRequireDefault(require('fs'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// modulo fs, sistema de archivos

// const chalk = require("chalk");

const mdLinks = function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe
    if (_fs.default.existsSync(path)) {
      // resolve('La ruta existe');
      // Chequear o convertir a una ruta absoluta
      // Probar si esa ruta es un archivo o un directorio
      // Si es un directorio filtrar los archivos md
    } else {
      // Si no existe la ruta, rechaza la promesa
      reject('La ruta no existe');
    }
  });
};

// import image from './thumb.png'
exports.mdLinks = mdLinks;
