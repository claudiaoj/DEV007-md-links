// const { mdLinks } = require('../index.js');

import { mdLinks } from '../index';

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  /* it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  }); */
  it('Deberia rechazar cuando el path no existe', () => mdLinks('/clau/cursos/estepathnoexiste.md').catch((error) => {
    expect(error).toBe('La ruta no existe');
  }));
});
