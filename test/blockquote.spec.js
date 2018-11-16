const testTexts = require('./utils/testTexts');

describe(`Tests on blockquote markup`, () => {
  it(`should change blockquote markup (single)`, () => {
    const markdownText = '> Lorem ipsum dolor sit amet',
          wikiText = '<blockquote>' + '\n' +
                     'Lorem ipsum dolor sit amet' + '\n' +
                     '</blockquote>';
    testTexts(wikiText, markdownText);
  });

  it(`should change blockquote markup (single in center of some text)`, () => {
    const markdownText = 'Lorem ipsum dolor sit amet' + '\n' +
                         '> consectetur adipiscing elit' + '\n' +
                         'sed do eiusmod tempor',
          wikiText = 'Lorem ipsum dolor sit amet' + '\n' +
                     '<blockquote>' + '\n' +
                     'consectetur adipiscing elit' + '\n' +
                     '</blockquote>' + '\n' +
                     'sed do eiusmod tempor';
    testTexts(wikiText, markdownText);
  });

  it(`should change blockquote markup (blockquote with many newlines)`, () => {
    const markdownText = '> Lorem' + '\n' +
                         '> ipsum' + '\n' +
                         '> dolor' + '\n' +
                         '> sit' + '\n' +
                         '> amet',
          wikiText = '<blockquote>' + '\n' +
                     'Lorem' + '\n' +
                     'ipsum' + '\n' +
                     'dolor' + '\n' +
                     'sit' + '\n' +
                     'amet' + '\n' +
                     '</blockquote>';
    testTexts(wikiText, markdownText);
  });

  it(`should change blockquote markup (blockquote with many newlines and one empty line)`, () => {
    const markdownText = '> Lorem' + '\n' +
                         '> ipsum' + '\n' +
                         '> dolor' + '\n' +
                         '> sit' + '\n' +
                         '> ' + '\n' +
                         '> amet',
          wikiText = '<blockquote>' + '\n' +
                     'Lorem' + '\n' +
                     'ipsum' + '\n' +
                     'dolor' + '\n' +
                     'sit' + '\n' +
                     '' + '\n' +
                     'amet' + '\n' +
                     '</blockquote>';
    testTexts(wikiText, markdownText);
  });
});
