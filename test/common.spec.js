const testTexts = require('./utils/testTexts');

describe('Common tests', () => {
  it('should correctly translate two texts', () => {
    testTexts(`
=Heading=

Some <i>italic</i> and <b>bold</b> words.
And link: [url text].

<blockquote>Text in blockquote</blockquote>

Ordered list:
# first num
# second num
# third num

unordered list:
* first point
* second point
* third point
`, `
# Heading

Some _italic_ and **bold** words.
And link: [text](url).

> Text in blockquote

Ordered list:
1. first num
2. second num
3. third num

unordered list:
- first point
- second point
- third point
`);
  });
});
