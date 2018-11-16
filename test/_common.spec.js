const testTexts = require('./utils/testTexts');

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
And '''''bold and italic'''''.
And code: <code>code text</code>
And link: [url text].

<blockquote>
single blockquote
</blockquote>

<blockquote>
Text in blockquote

with empty line in center
</blockquote>

Ordered list:
# first num
# second num
# third num

# Another list num

unordered list:
* first point
* second point
* third point
`;
const nothing = '';
const markdownText = `
  Headings:
###### Heading
##### Heading
#### Heading
### Heading
## Heading
# Heading

Some _italic_ and **bold** words.
And ***bold and italic***.
And code: \`code text\`
And link: [text](url).

> single blockquote

> Text in blockquote
> ${nothing}
> with empty line in center

Ordered list:
1. first num
2. second num
3. third num

1. Another list num

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
