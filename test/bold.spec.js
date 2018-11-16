const testTexts = require('./utils/testTexts');

describe(`Tests on bold markup`, () => {
  it(`should change bold markup (first word in sentence)`, () => {
    const wikiText = `'''Lorem''' ipsum dolor sit amet`;
    const markdownText = '**Lorem** ipsum dolor sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold markup (last word in sentence)`, () => {
    const wikiText = `Lorem ipsum dolor sit '''amet'''`;
    const markdownText = 'Lorem ipsum dolor sit **amet**';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold markup (any word in sentence)`, () => {
    const wikiText = `Lorem ipsum '''dolor''' sit amet`;
    const markdownText = 'Lorem ipsum **dolor** sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold markup (part of the word in sentence)`, () => {
    const wikiText = `Lorem ipsum dol'''or''' sit amet`;
    const markdownText = 'Lorem ipsum dol**or** sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold markup (many bold words in sentence)`, () => {
    const wikiText = `'''Lorem''' ipsum '''dolor''' sit '''amet'''`;
    const markdownText = '**Lorem** ipsum **dolor** sit **amet**';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold markup (another variant of wiki bold-markup)`, () => {
    const wikiText = `'''Lorem''' ipsum '''dolor''' sit '''amet'''`;
    const markdownText = '**Lorem** ipsum **dolor** sit **amet**';
    testTexts(wikiText, markdownText);
  });
});
