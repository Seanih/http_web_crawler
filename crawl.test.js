const { normalizeURL, getURLsFromHTML } = require('./crawl');
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

test('getURLsFromHTML gets absolute URLs from HTML', () => {
	const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `;
	const inputBaseURL = 'https://blog.boot.dev/path/';
	const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expectedOutput = ['https://blog.boot.dev/path/'];

	expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML gets relative URLs from HTML', () => {
	const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `;
	const inputBaseURL = 'https://blog.boot.dev';
	const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expectedOutput = ['https://blog.boot.dev/path/'];

	expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML gets relative  & absolute URLs from HTML', () => {
	const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog
                </a>
                <a href="/path2/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `;
	const inputBaseURL = 'https://blog.boot.dev';
	const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expectedOutput = [
		'https://blog.boot.dev/path1/',
		'https://blog.boot.dev/path2/',
	];

	expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML handles invalid urls', () => {
	const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                    Invalid URL
                </a>
            </body>
        </html>
    `;
	const inputBaseURL = 'https://blog.boot.dev';
	const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expectedOutput = [];

	expect(actualOutput).toEqual(expectedOutput);
});
