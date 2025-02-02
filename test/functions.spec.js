import path from 'path';
import fs from 'fs';
import axios from 'axios';
import {
  absolutePath, directory, getStats,
  pathExists, extname, getMdFilesRecursive,
  validateLink, calculateStats,
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
  jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
    if (dir === 'tempDir') {
      return ['file1.md', 'file2.js', 'subdir'];
    } if (dir === 'tempDir/subdir') {
      return ['file3.md', 'file4.txt'];
    }
    return [];
  });

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

jest.mock('axios');

describe('validateLink', () => {
  it('Should resolve with validated link when HTTP request is successful', () => {
    const response = {
      status: 200,
      statusText: 'OK',
    };
    axios.get.mockResolvedValue(response);
    const link = {
      text: 'Google',
      href: 'https://www.google.com',
    };
    return validateLink(link).then((validatedLink) => {
      expect(validatedLink).toEqual({
        text: 'Google',
        href: 'https://www.google.com',
        status: 200,
        statusText: 'OK',
      });
    });
  });
  it('Should resolve with validated link with 404 status when HTTP request fails', () => {
    axios.get.mockRejectedValue(new Error('Request failed'));
    const link = {
      text: 'Invalid Link',
      href: 'https://www.invalidlink.com',
    };
    return validateLink(link).then((validatedLink) => {
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
  it('Should return correct stats for links', () => {
    const links = [
      { href: 'https://example.com/page1', status: 200 },
      { href: 'https://example.com/page2', status: 404 },
      { href: 'https://example.com/page3', status: 200 },
      { href: 'https://example.com/page1', status: 200 },
    ];
    const result = calculateStats(links);
    expect(result.totalLinks).toBe(4);
    expect(result.uniqueLinks).toBe(3);
    expect(result.brokenLinks).toBe(1);
  });
  it('Should return correct stats when there are no broken links', () => {
    const links = [
      { href: 'https://example.com/page1', status: 200 },
      { href: 'https://example.com/page2', status: 200 },
      { href: 'https://example.com/page3', status: 200 },
    ];
    const result = calculateStats(links);
    expect(result.totalLinks).toBe(3);
    expect(result.uniqueLinks).toBe(3);
    expect(result.brokenLinks).toBe(0);
  });
  it('Should return correct stats for empty link array', () => {
    const links = [];
    const result = calculateStats(links);
    expect(result.totalLinks).toBe(0);
    expect(result.uniqueLinks).toBe(0);
    expect(result.brokenLinks).toBe(0);
  });
});
