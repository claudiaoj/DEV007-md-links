import path from 'path';
import fs from 'fs';
// Axios para realizar solicitudes HTTP
import axios from 'axios';
import {
  absolutePath, directory, getStats,
  pathExists, extname, getMdFilesRecursive,
  validateLink, calculateStats,
  // readMdFile,
  // eslint-disable-next-line import/extensions
} from '../src/functions.js';

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
});

describe('directory', () => {
  it('It a function', () => {
    expect(typeof directory).toBe('function');
  });
  it('Should return true if the path is a directory', () => {
    expect(directory('./.')).toEqual(true);
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

describe('getMdFilesRecursive', () => {
  // Función mock fs.readdirSync
  jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
    if (dir === 'tempDir') {
      return ['file1.md', 'file2.js', 'subdir'];
    } if (dir === 'tempDir/subdir') {
      return ['file3.md', 'file4.txt'];
    }
    return [];
  });

  // Función mock fs.statSync
  jest.spyOn(fs, 'statSync').mockImplementation((file) => {
    const baseName = path.basename(file);
    if (baseName === 'file1.md' || baseName === 'file3.md') {
      return { isFile: () => true };
    }
    return { isFile: () => false, isDirectory: () => true };
  });

  it('Should return an array with all .md files in the directory and its subdirectories', () => {
    const result = getMdFilesRecursive('tempDir');
    expect(result).toEqual([
      'tempDir/file1.md',
      'tempDir/subdir/file3.md',
    ]);
  });
  it('Should return an empty array for an empty directory', () => {
    const result = getMdFilesRecursive('empty');
    expect(result).toEqual([]);
  });
});

// Mock de axios para simular la solicitud HTTP
jest.mock('axios');

describe('validateLink', () => {
  it('Should resolve with validated link when HTTP request is successful', () => {
    // Mock, la respuesta exitosa de la solicitud HTTP
    const response = {
      status: 200,
      statusText: 'OK',
    };
    axios.get.mockResolvedValue(response);

    // Objeto link a validar
    const link = {
      text: 'Google',
      href: 'https://www.google.com',
    };

    // Realiza la prueba llamando a la función validateLink
    return validateLink(link).then((validatedLink) => {
      // Verifica que la función haya resuelto correctamente con el objeto link validado
      expect(validatedLink).toEqual({
        text: 'Google',
        href: 'https://www.google.com',
        status: 200,
        statusText: 'OK',
      });
    });
  });
  it('Should resolve with validated link with 404 status when HTTP request fails', () => {
    // Mock, la respuesta fallida de la solicitud HTTP
    axios.get.mockRejectedValue(new Error('Request failed'));

    // Objeto link a validar
    const link = {
      text: 'Invalid Link',
      href: 'https://www.invalidlink.com',
    };

    // Realiza la prueba llamando a la función validateLink
    return validateLink(link).then((validatedLink) => {
      // Verifica que la fx haya resuelto correctamente con el objeto link validado con status 404
      expect(validatedLink).toEqual({
        text: 'Invalid Link',
        href: 'https://www.invalidlink.com',
        status: 404,
        statusText: 'Not Found',
      });
    });
  });
});

describe('calculateStats', () => {
  it('Should calculate stats correctly for a set of links', () => {
    // Array de enlaces para la prueba
    const links = [
      { href: 'https://www.google.com', status: 200 },
      { href: 'https://www.example.com', status: 200 },
      { href: 'https://www.example.com', status: 404 },
      { href: 'https://www.invalidlink.com', status: 500 },
    ];

    // Realiza la prueba llamando a la función calculateStats
    const stats = calculateStats(links);
    // Verifica que los cálculos sean correctos
    expect(stats.totalLinks).toBe(4); // Total de enlaces en el array
    expect(stats.uniqueLinks).toBe(3); // Enlaces únicos (ignora duplicados)
    expect(stats.brokenLinks).toBe(2); // Enlaces con status >= 400 (rotos)
    // Verifica que los enlaces únicos también sean correctos
    expect(stats.uniqueLinksArray).toEqual([
      'https://www.google.com',
      'https://www.example.com',
      'https://www.invalidlink.com',
    ]);
  });
  it('Should return zero stats for an empty array of links', () => {
    // Array de enlaces vacío
    const links = [];
    // Realiza la prueba llamando a la función calculateStats
    const stats = calculateStats(links);
    // Verifica que todos los valores sean cero para un array vacío
    expect(stats.totalLinks).toBe(0);
    expect(stats.uniqueLinks).toBe(0);
    expect(stats.brokenLinks).toBe(0);
    expect(stats.uniqueLinksArray).toEqual([]);
  });
});
