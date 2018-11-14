const testTexts = require('./_testTexts');

/* Move this example to demo? */
const wikiText = `
  Headings:
======Heading======
=====Heading=====
====Heading====
===Heading===
==Heading==
=Heading=

Some ''italic'' and '''bold''' words.
And '''bold''' in another variant.
And code: <code>code text</code>
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
`;
const markdownText = `
  Headings:
###### Heading
##### Heading
#### Heading
### Heading
## Heading
# Heading

Some _italic_ and **bold** words.
And **bold** in another variant.
And code: \`code text\`
And link: [text](url).

> Text in blockquote

Ordered list:
1. first num
1. second num
1. third num

unordered list:
- first point
- second point
- third point
`;

describe('Common tests', () => {
  it('should correctly translate two texts (markdown to wiki)', () => {
    testTexts(wikiText, markdownText);
  });
});
