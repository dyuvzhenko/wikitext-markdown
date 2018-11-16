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
  return line.match(/^\d+[.][ ](.*)$/g) ?
    '#' + line.slice(2, line.length) :
    line
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

function parseBlockquoteSecondPass(line, index, arr) {
  /* all blockquote lines will be already in wiki-markup */
  if (!line.match(/^<blockquote>(.*)<\/blockquote\>$/g)) {
    return line
  }
  if (
    arr[index - 1] && !arr[index - 1].match(/^<blockquote>(.*)<\/blockquote\>$/g) &&
    arr[index + 1] && !arr[index + 1].match(/^<blockquote>(.*)<\/blockquote\>$/g)
  ) {
    return line.replace(/^<blockquote>(.*)<\/blockquote\>$/g, `<blockquote>\n$1\n</blockquote>`)
  }
  let newLine = line.replace(/^<blockquote>(.*)<\/blockquote\>$/g, `$1`)
  /* need we open tag? */
  if (!arr[index - 1] || !arr[index - 1].match(/^<blockquote>(.*)<\/blockquote\>$/g)) {
    newLine = `<blockquote>\n` + newLine
  }
  if (!arr[index + 1] || !arr[index + 1].match(/^<blockquote>(.*)<\/blockquote\>$/g)) {
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

module.exports = text => text.split('\n')
  .map(parseHeadings)
  .map(parseUnorderedList)
  .map(parseOrderedList)
  .map(parseCode)
  .map(parseBlockquoteFirstPass)
  .map(parseBlockquoteSecondPass)
  .map(parseLink)
  .map(parseBoldAndItalic)
  .map(parseBold)
  .map(parseItalic)
  .join('\n')
