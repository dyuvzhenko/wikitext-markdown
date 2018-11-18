const testTexts = require('../../_utils/testTexts');

describe(`Tests on ordered list markup`, () => {
  it(`should change ordered list markup (from 1 to 3)`, () => {
    const markdownText = '1. Lorem ipsum dolor sit amet' + '\n' +
                         '2. consectetur adipiscing elit' + '\n' +
                         '3. sed do eiusmod tempor' + '\n',
          wikiText = '# Lorem ipsum dolor sit amet' + '\n' +
                     '# consectetur adipiscing elit' + '\n' +
                     '# sed do eiusmod tempor' + '\n';
    testTexts(wikiText, markdownText);
  });

  it(`should change ordered list (from 1 to 3 in center of text)`, () => {
    const markdownText = 'Lorem ipsum dolor sit amet' + '\n' +
                         'consectetur adipiscing elit' + '\n' +
                         'sed do eiusmod tempor' + '\n' +
                         '1. labore et dolore magna' + '\n' +
                         '2. Ut enim ad minim veniam' + '\n' +
                         '3. quis nostrud exercitation' + '\n',
          wikiText = 'Lorem ipsum dolor sit amet' + '\n' +
                     'consectetur adipiscing elit' + '\n' +
                     'sed do eiusmod tempor' + '\n' +
                     '# labore et dolore magna' + '\n' +
                     '# Ut enim ad minim veniam' + '\n' +
                     '# quis nostrud exercitation' + '\n';
    testTexts(wikiText, markdownText);
  });

  it(`should change ordered list (from 1 to 33)`, () => {
    const wikiText = '# Lorem ipsum\n'.repeat(33);
    let markdownText = '';
    for (let i = 1; i <= 33; i++) {
      markdownText += `${i}. Lorem ipsum\n`
    }
    testTexts(wikiText, markdownText);
  });
});

describe(`Tests on unordered list markup`, () => {
  it(`should change unordered list markup (from 1 to 3)`, () => {
    const markdownText = '- Lorem ipsum dolor sit amet' + '\n' +
                         '- consectetur adipiscing elit' + '\n' +
                         '- sed do eiusmod tempor' + '\n',
          wikiText = '* Lorem ipsum dolor sit amet' + '\n' +
                     '* consectetur adipiscing elit' + '\n' +
                     '* sed do eiusmod tempor' + '\n';
    testTexts(wikiText, markdownText);
  });

  it(`should change unordered list (from 1 to 3 in center of text)`, () => {
    const markdownText = 'Lorem ipsum dolor sit amet' + '\n' +
                         'consectetur adipiscing elit' + '\n' +
                         'sed do eiusmod tempor' + '\n' +
                         '- labore et dolore magna' + '\n' +
                         '- Ut enim ad minim veniam' + '\n' +
                         '- quis nostrud exercitation' + '\n',
          wikiText = 'Lorem ipsum dolor sit amet' + '\n' +
                     'consectetur adipiscing elit' + '\n' +
                     'sed do eiusmod tempor' + '\n' +
                     '* labore et dolore magna' + '\n' +
                     '* Ut enim ad minim veniam' + '\n' +
                     '* quis nostrud exercitation' + '\n';
    testTexts(wikiText, markdownText);
  });
});
