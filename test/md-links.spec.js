// eslint-disable-next-line import/no-unresolved, import/extensions
// import mdLinks from '../src/mdLinks.js';
import {
  absolutePath, directory, getStats,
  pathExists, extname, // readMdFile,
// getMdFilesRecursive,
  // eslint-disable-next-line import/extensions
} from '../src/functions.js';

/* describe('mdLinks', () => {
  it('It a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
}); */
// eslint-disable-next-line max-len, max-len, max-len
/* it('Should reject when path does not exist', ()
  => mdLinks('/clau/cursos/pathnoexist.md').catch((error) => {
    expect(error).toBe('Path is not exist');
  }));
 */

describe('pathExists', () => {
  it('It a function', () => {
    expect(typeof pathExists).toBe('function');
  });
  it('Should return true if the path exists', () => {
    expect(pathExists('./README.md')).toEqual(true);
  });
});

describe('absolutePath', () => {
  it('It a function', () => {
    expect(typeof absolutePath).toBe('function');
  });
  it('Should return true if the path is absolut', () => {
    expect(absolutePath('/DEV007-md-links/README.md')).toEqual(true);
  });
  it('Should return false if the path doesnt absolut', () => {
    expect(absolutePath('./README.md')).toEqual(false);
  });
});

describe('getStats', () => {
  it('It a function', () => {
    expect(typeof getStats).toBe('function');
  });
  it('Should return true if the path is a file', () => {
    expect(absolutePath('/DEV007-md-links/README.md')).toEqual(true);
  });
  it('Should return false if the path doesnt file', () => {
    expect(absolutePath('./example')).toEqual(false);
  });
});

describe('directory', () => {
  it('It a function', () => {
    expect(typeof directory).toBe('function');
  });
  it('Should return true if the path is a directory', () => {
    expect(directory('./.')).toEqual(true);
  });
  it('Should return false if the path dosnt a directory', () => {
    expect(directory('README.md')).toEqual(false);
  });
});

describe('extname', () => {
  it('It a function', () => {
    expect(typeof extname).toBe('function');
  });
  it('Should return the file format, in this case .md', () => {
    expect(extname('/DEV007-md-links/README.md')).toEqual('.md');
  });
  it('Should return the file format, in this case .js', () => {
    expect(extname('./cli.js')).toEqual('.js');
  });
});
