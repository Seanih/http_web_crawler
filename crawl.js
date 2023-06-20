const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
	console.log(`currently crawling: ${currentURL}`);

	try {
		const resp = await fetch(currentURL);

		if (resp.status > 399) {
			console.log(
				`error in fetch with status code: ${resp.status} on page ${currentURL}`
			);
			return;
		}

		const contentType = resp.headers.get('content-type');
		if (!contentType.includes('text/html')) {
			console.log(
				`non html response, content type: ${contentType}, on page: ${currentURL}`
			);
			return;
		}

		console.log(contentType);

		// parse HTML as text, not JSON
		console.log(await resp.text());
	} catch (error) {
		console.log(`error in fetch: ${error.message}, on page ${currentURL}`);
	}
}

function getURLsFromHTML(htmlBody, baseURL) {
	const urls = [];
	const dom = new JSDOM(htmlBody);

	const linkElements = dom.window.document.querySelectorAll('a');

	for (const linkEl of linkElements) {
		if (linkEl.href[0] === '/') {
			// relative url
			try {
				const urlObj = new URL(`${baseURL}${linkEl.href}`);
				urls.push(urlObj.href);
			} catch (error) {
				console.log(`error with relative url: ${error.message}`);
			}
		} else {
			try {
				const urlObj = new URL(linkEl.href);
				// absolute
				urls.push(urlObj.href);
			} catch (error) {
				console.log(`error with absolute url: ${error.message}`);
			}
		}
	}

	return urls;
}

function normalizeURL(url) {
	const urlObj = new URL(url);

	const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

	if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
		return hostPath.slice(0, -1);
	}
	return hostPath;
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage,
};
