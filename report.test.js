const { test, expect } = require('@jest/globals');
const { sortPages } = require('./report');

test('sortPages 2 pages', () => {
	const input = {
		'https://wagslane.dev/path': 1,
		'https://wagslane.dev': 3,
	};

	const actualOutput = sortPages(input);
	const expectedOutput = [
		['https://wagslane.dev', 3],
		['https://wagslane.dev/path', 1],
	];

	expect(actualOutput).toEqual(expectedOutput);
});

test('sortPages 5 pages', () => {
	const input = {
		'https://wagslane.dev/path': 1,
		'https://wagslane.dev': 3,
		'https://wagslane.dev/path2': 7,
		'https://wagslane.dev/path3': 10,
		'https://wagslane.dev/path4': 5,
	};

	const actualOutput = sortPages(input);
	const expectedOutput = [
		['https://wagslane.dev/path3', 10],
		['https://wagslane.dev/path2', 7],
		['https://wagslane.dev/path4', 5],
		['https://wagslane.dev', 3],
		['https://wagslane.dev/path', 1],
	];

	expect(actualOutput).toEqual(expectedOutput);
});
