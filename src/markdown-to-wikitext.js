// markdown-to-wikitext.js
function parseHeadings(line) {
  return line.match(/^([#]{1,6})[ ](.*)$/) ?
    line.replace(/^([#]{1,6})[ ](.*)$/, ("=".repeat(RegExp.$1.length)) + RegExp.$2 + ("=".repeat(RegExp.$1.length))) :
    line
}

function parseUnorderedList(line) {
  return line.match(/^[-][ ](.*)$/g) ?
    '*' + line.slice(1, line.length) :
    line
}

function parseOrderedList(line) {
  return line.replace(/^\d+[.][ ](.*)$/g, `# $1`)
}

function parseCode(line) {
  return line.replace(/`([^\`]*)`/g, `<code>$1</code>`)
}

function parseBoldAndItalic(line) { /* must go before parseBold and parseItalic */
  return line.replace(/[\*]{3}([^\*]*)[\*]{3}/g, `'''''$1'''''`)
}

function parseBlockquoteFirstPass(line) {
  return line.replace(/^[>][ ](.*)$/g, `<blockquote>$1</blockquote>`)
}

const blockquoteRegExp = /^<blockquote>(.*)<\/blockquote\>$/g

function parseBlockquoteSecondPass(line, index, arr) {
  /* all blockquote lines will be already in wiki-markup */
  if (!line.match(blockquoteRegExp)) {
    return line
  }
  if (
    arr[index - 1] && !arr[index - 1].match(blockquoteRegExp) &&
    arr[index + 1] && !arr[index + 1].match(blockquoteRegExp)
  ) {
    return line.replace(blockquoteRegExp, `<blockquote>\n$1\n</blockquote>`)
  }
  let newLine = line.replace(blockquoteRegExp, `$1`)
  /* need we open tag? */
  if (!arr[index - 1] || !arr[index - 1].match(blockquoteRegExp)) {
    newLine = `<blockquote>\n` + newLine
  }
  if (!arr[index + 1] || !arr[index + 1].match(blockquoteRegExp)) {
    newLine = newLine + `\n</blockquote>`
  }
  return newLine
}

function parseLink(line) {
  return line.replace(/\[([^\[]*)\]\(([^\(]*)\)/g, `[$2 $1]`); /* [textl](url) */
}

function parseBold(line) {
  return line.replace(/[*]{2}/g, `'''`)
}

function parseItalic(line) {
  return line
    .replace(/([^\\]{0,1})_/g, `$1''`) /* first take `_` in markdown meanings and translate it to '' and '' */
    .replace(/\\[_]/g, '_') /* then take all simple symbol `_` who is screened and write it without `\` */
}

function skip(line) {
  return line
}

/*
options = {
  skipOrderedList: true,
  skipHeadings: true,
  skipUnorderedList: true,
  skipCode: true,
  skipBlockquote: true,
  skipLink: true,
  skipBoldAndItalic: true,

  customRules: []
}
*/
module.exports = (text, options = {}) => {
  let newText = text.split('\n')

  if (options.customRules) {
    options.customRules.forEach(rule => newText = newText.map(rule))
  }

  return newText
    .map(options.skipHeadings && skip || parseHeadings)
    .map(options.skipUnorderedList && skip || parseUnorderedList)
    .map(options.skipOrderedList && skip || parseOrderedList)
    .map(options.skipCode && skip || parseCode)
    .map(options.skipBlockquote && skip || parseBlockquoteFirstPass)
    .map(options.skipBlockquote && skip || parseBlockquoteSecondPass)
    .map(options.skipLink && skip || parseLink)
    .map(options.skipBoldAndItalic && skip || parseBoldAndItalic)
    .map(options.skipBoldAndItalic && skip || parseBold)
    .map(options.skipBoldAndItalic && skip || parseItalic)
    .join('\n')
}
