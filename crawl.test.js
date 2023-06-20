const { normalizeURL } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeURL strips protocal from url', () => {
	const input = 'https://blog.boot.dev/path';
	const actualOutput = normalizeURL(input);
	const expectedOutput = 'blog.boot.dev/path';

	expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL strips trailing "/"', () => {
	const input = 'https://blog.boot.dev/path/';
	const actualOutput = normalizeURL(input);
	const expectedOutput = 'blog.boot.dev/path';

	expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL ensures url is lowercase', () => {
	const input = 'https://Blog.Boot.Dev/path/';
	const actualOutput = normalizeURL(input);
	const expectedOutput = 'blog.boot.dev/path';

	expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeURL strips http protocol', () => {
	const input = 'https://blog.boot.dev/path/';
	const actualOutput = normalizeURL(input);
	const expectedOutput = 'blog.boot.dev/path';

	expect(actualOutput).toEqual(expectedOutput);
});
