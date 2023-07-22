import { describe, it, expect } from 'jest';
// eslint-disable-next-line import/no-unresolved, import/extensions
import mdLinks from '../src/mdLinks.js';

// eslint-disable-next-line import/extensions
// import { pathExists } from '../src/functions.js';

describe('mdLinks', () => {
  it('It a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  /* it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  }); */

  // eslint-disable-next-line max-len
  it('Should reject when path does not exist', () => mdLinks('/clau/cursos/pathnoexist.md').catch((error) => {
    expect(error).toBe('Path is not exist');
  }));
});

/* describe('pathExists', () => {
  it('It a function', () => {
    expect(typeof pathExists).toBe('function');
  });
}); */
