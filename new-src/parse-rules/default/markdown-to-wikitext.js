// default/markdown-to-wikitext.js
function headings(line) {
  return line.match(/^([#]{1,6})[ ](.*)$/) ?
    line.replace(/^([#]{1,6})[ ](.*)$/, ("=".repeat(RegExp.$1.length)) + RegExp.$2 + ("=".repeat(RegExp.$1.length))) :
    line
}

function unorderedList(line) {
  return line.match(/^[-][ ](.*)$/g) ?
    '*' + line.slice(1, line.length) :
    line
}

function orderedList(line) {
  return line.replace(/^\d+[.][ ](.*)$/g, `# $1`)
}

function code(line) {
  return line.replace(/`([^\`]*)`/g, `<code>$1</code>`)
}

function boldAndItalic(line) { /* must go before parseBold and parseItalic */
  return line.replace(/[\*]{3}([^\*]*)[\*]{3}/g, `'''''$1'''''`)
}

function blockquoteFirstPass(line) {
  return line.replace(/^[>][ ](.*)$/g, `<blockquote>$1</blockquote>`)
}

const blockquoteRegExp = /^<blockquote>(.*)<\/blockquote\>$/g

function blockquoteSecondPass(line, index, arr) {
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

function link(line) {
  return line.replace(/\[([^\[]*)\]\(([^\(]*)\)/g, `[$2 $1]`); /* [textl](url) */
}

function bold(line) {
  return line.replace(/[*]{2}/g, `'''`)
}

function italic(line) {
  return line
    .replace(/([^\\]{0,1})_/g, `$1''`) /* first take `_` in markdown meanings and translate it to '' and '' */
    .replace(/\\[_]/g, '_') /* then take all simple symbol `_` who is screened and write it without `\` */
}

module.exports = [
  headings,
  unorderedList,
  orderedList,
  code,
  boldAndItalic,
  blockquoteFirstPass,
  blockquoteSecondPass,
  link,
  bold,
  italic
]
