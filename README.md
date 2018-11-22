# A npm library for converting wiki to markdown and back ![Build status](https://travis-ci.com/khajjit/wikitext-markdown.svg?branch=master)

### Install

`npm install wikitext-markdown`

### Usage

Default usage:
```
/* 1. import */
import Converter from 'wikitext-markdown'

/* 2. Initialize default converter */
const converter = new Converter()

/* 3. Use */
const wikiText = converter.toWiki('## Heading')
// wikiText will be `==Heading==`
```

Usage with custom settings:
```
/* 1. import */
import Converter from 'wikitext-markdown

/* 2.1 Create your custom rule */
const parseCustomTag = line => line.replace(/<custom-wiki-tag>(.*)<\/custom-wiki-tag>/g, `+++ $1 +++`)

/* 2. Initialize converter */
const converter = new Converter({
  preset: 'default-with-html',
  skip: ['headings', 'orderedList'],
  custom: {
    wikiToMarkdown: [parseCustomTag],
    markdownToWiki: []
  }
});

/* 3. Use */
const markdownText = converter.toWiki('<custom-wiki-tag>Text<custom-wiki-tag>')
// markdownText will be `+++ Text +++`
```

### Settings

##### Preset

- `default`
- `default-with-html` - allow parse html tags (Presently only `<b>` and `<i>`)

##### Skip

Array which can contains name of library parsing functions and allows you to disable them. Possible strings are: `orderedList`, `setSequenceForOrderedList`, `unorderedList`, `headings`, `code`, `blockquote`, `link`, `boldAndItalic`, `bold`, `italic`.

##### Custom

The option that allows you to add your custom rules for text parsing.
- Array `wikiToMarkdown` will apply rules for method `converter.toMarkdown('==wiki text==')`
- Array `markdownToWiki` will apply rules for method `converter.toWiki('## markdown text')`

Should be considered, that your text in method like `converter.toWiki` will be split by `\n` and the rule you write should be a `map` function that will be take each line, then parse and find wanted markup and return new created line.
