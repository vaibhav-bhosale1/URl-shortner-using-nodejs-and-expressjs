# shortlnk

[![NPM Version](https://img.shields.io/npm/v/shortlnk.svg)](https://www.npmjs.com/package/shortlnk)

[![License](https://img.shields.io/npm/l/shortlnk.svg)](https://github.com/CoHarsh/shortlink-npm-pkg/blob/main/LICENSE)

shortlnk is an npm package that provides functions for shortening URLs and decoding shortened URLs. It allows you to create short, memorable URLs for your long links and easily retrieve the original URLs from the shortened versions.

## Features

- Shorten long URLs to create shorter, more user-friendly links.
- Decode shortened URLs to retrieve the original long URLs.
- Simple and easy-to-use Package for generating and decoding short URLs.
- Works with any valid HTTP/HTTPS URL.
- Public and free to use.

## Installation

Install the `shortlnk` package via npm:

```shell
npm install shortlnk
```

## Usage

Here's an example of how to use shortlnk to create and decode short URLs:

```
const { createShortUrl, decodeURL } = require('shortlnk');

async function testShortlnk() {
  try {
    const longUrl = 'https://www.youtube.com';

    // Create a short URL
    const createResponse = await createShortUrl(longUrl);
    if (createResponse.success) {
      console.log('Short URL:', createResponse.data);
    } else {
      console.error('Error creating short URL:', createResponse.error);
    }

    const shortUrl = 'j08KMQtWUC';

    // Decode a short URL
    const decodeResponse = await decodeURL(shortUrl);
    if (decodeResponse.success) {
      console.log('Decoded URL:', decodeResponse.data);
    } else {
      console.error('Error decoding short URL:', decodeResponse.error);
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

testShortlnk();
```

## Notes

- The shortlnk package uses a free server hosting service onrender and MongoDB for the database.
- Each long URL is mapped to a unique short ID.
- All the short URLs generated using shortlnk are public and can be accessed by anyone.
- http+s urls are allowed only.

## Links

- [Github Repository](https://github.com/CoHarsh/shortlink-npm-pkg)
- [NPM Package](https://www.npmjs.com/package/shortlnk)
- [Report Issue](https://github.com/CoHarsh/shortlink-npm-pkg/issues)
- [Request feature](https://github.com/CoHarsh/shortlink-npm-pkg/issues)
- [Contribute to this project](https://github.com/CoHarsh/shortlink-npm-pkg/actions/new)