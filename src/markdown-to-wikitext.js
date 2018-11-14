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

function parseBlockqoute(line) {
  return line.match(/^[>][ ](.*)$/g) ?
    '<blockquote>' + line.slice(2, line.length) + '</blockquote>' :
    line
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
  .map(parseBlockqoute)
  .map(parseLink)
  .map(parseBoldAndItalic)
  .map(parseBold)
  .map(parseItalic)
  .join('\n')
