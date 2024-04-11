const { createShortUrl, decodeURL } = require('./index');


describe('createShortUrl', () => {
  it('should create a short URL for a valid long URL', async () => {
    const longUrl = 'https://www.example.com';
    const response = await createShortUrl(longUrl);

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.error).toBeUndefined();
  });

  it('should create a unique short URL for each long URL', async () => {
    const longUrl1 = 'https://www.example.com';
    const response1 = await createShortUrl(longUrl1);

    const longUrl2 = 'https://www.example.net';
    const response2 = await createShortUrl(longUrl2);

    expect(response1.success).toBe(true);
    expect(response1.data).toBeDefined();
    expect(response1.error).toBeUndefined();

    expect(response2.success).toBe(true);
    expect(response2.data).toBeDefined();
    expect(response2.error).toBeUndefined();

    expect(response1.data).not.toBe(response2.data);
  });

  it('should handle long URLs with special characters', async () => {
    const longUrl = 'https://www.example.com/path?param=value#fragment';
    const response = await createShortUrl(longUrl);

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.error).toBeUndefined();
  });

  it('should return an error for an empty long URL', async () => {
    const emptyUrl = '';
    const response = await createShortUrl(emptyUrl);

    expect(response.success).toBe(false);
    expect(response.error).toBe('Invalid URL');
    expect(response.data).toBeUndefined();
  });

  it('should return an error for a null long URL', async () => {
    const nullUrl = null;
    const response = await createShortUrl(nullUrl);

    expect(response.success).toBe(false);
    expect(response.error).toBe('Invalid URL');
    expect(response.data).toBeUndefined();
  });

  it('should return an error for an invalid long URL', async () => {
    const invalidUrl = 'invalid-url';
    const response = await createShortUrl(invalidUrl);

    expect(response.success).toBe(false);
    expect(response.error).toBe('Invalid URL');
    expect(response.data).toBeUndefined();
  });

  it('should handle the maximum allowed URL length', async () => {
    const longUrl = 'https://' + 'a'.repeat(2048); // Create a URL with 2048 characters
    const response = await createShortUrl(longUrl);

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.error).toBeUndefined();
  });

  it('should handle the minimum allowed URL length', async () => {
    const longUrl = 'https://a'; // Create a URL with the minimum required length
    const response = await createShortUrl(longUrl);

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.error).toBeUndefined();
  });

  it('should return an error for URLs with unsupported protocols', async () => {
    const longUrl = 'ftp://www.example.com';
    const response = await createShortUrl(longUrl);

    expect(response.success).toBe(false);
    expect(response.error).toBe('Invalid URL');
    expect(response.data).toBeUndefined();
  });

  it('should return an error for URLs that exceed the maximum length', async () => {
    const longUrl = 'https://' + 'a'.repeat(4096); // Create a URL with more than the maximum allowed length
    const response = await createShortUrl(longUrl);

    expect(response.success).toBe(false);
    expect(response.error).toBe('Invalid URL');
    expect(response.data).toBeUndefined();
  });


});

// describe('decodeURL', () => {
//   it('should decode a valid short URL to the original long URL', async () => {
//     const encodedString = 'jaOgbJ7mmb';
//     const response = await decodeURL(encodedString);

//     expect(response.success).toBe(true);
//     expect(response.data).toBeDefined();
//     expect(response.error).toBeUndefined();
//   });

//   it('should return an error for an empty short URL', async () => {
//     const emptyShortUrl = '';
//     const response = await decodeURL(emptyShortUrl);

//     expect(response.success).toBe(false);
//     expect(response.error).toBe('Invalid Short-URL');
//     expect(response.data).toBeUndefined();
//   });

//   it('should return an error for a null short URL', async () => {
//     const nullShortUrl = null;
//     const response = await decodeURL(nullShortUrl);

//     expect(response.success).toBe(false);
//     expect(response.error).toBe('Invalid Short-URL');
//     expect(response.data).toBeUndefined();
//   });

//   it('should return an error for an invalid short URL', async () => {
//     const invalidShortUrl = 'invalid-short-url';
//     const response = await decodeURL(invalidShortUrl);

//     expect(response.success).toBe(false);
//     expect(response.error).toBe('Invalid Short-URL');
//     expect(response.data).toBeUndefined();
//   });

//   it('should decode multiple short URLs to their respective long URLs', async () => {
//     const encodedString1 = 'jaOgbJ7mmb';
//     const response1 = await decodeURL(encodedString1);

//     const encodedString2 = 'j08KMQtWUC';
//     const response2 = await decodeURL(encodedString2);

//     expect(response1.success).toBe(true);
//     expect(response1.data).toBeDefined();
//     expect(response1.error).toBeUndefined();

//     expect(response2.success).toBe(true);
//     expect(response2.data).toBeDefined();
//     expect(response2.error).toBeUndefined();
//   });

//   it('should return an error when no URL is found for a valid short URL', async () => {
//     const nonExistentShortUrl = 'fghsd4578f';
//     const response = await decodeURL(nonExistentShortUrl);

//     expect(response.success).toBe(false);
//     expect(response.error).toBe('No URL found');
//     expect(response.data).toBeUndefined();
//   });
// });


//// //// TODO: PERFORMANCE TESTS //// ////   TODO: Fix these tests FAILED
// describe('Performance Testing', () => {
//   it('should handle a high load of createShortUrl requests', async () => {
//     const longUrl = 'https://www.exampless.com';
//     const numRequests = 3;

//     const createShortUrlPromises = Array.from({ length: numRequests }, () => createShortUrl(longUrl));
//     const responses = await Promise.all(createShortUrlPromises);

//     responses.forEach((response) => {
//       expect(response.success).toBe(true);
//       expect(response.data).toBeDefined();
//       expect(response.error).toBeUndefined();
//     });
//   });

//   it('should handle a high load of decodeURL requests', async () => {
//     const encodedString = 'j08KMQtWUC';
//     const numRequests = 3;

//     const decodeURLPromises = Array.from({ length: numRequests }, () => decodeURL(encodedString));
//     const responses = await Promise.all(decodeURLPromises);

//     responses.forEach((response) => {
//       expect(response.success).toBe(true);
//       expect(response.data).toBeDefined();
//       expect(response.error).toBeUndefined();
//     });
//   });
// });
