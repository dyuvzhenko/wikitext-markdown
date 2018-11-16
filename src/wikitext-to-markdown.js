// wikitext-to-markdown.js
function parseOrderedList(line) { /* must go before parseHeadings */
  if (line.match(/^[#]{1}[ ]{1}(.*)/g)) {
    return '1. ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function parseHeadings(line) {
  return line.match(/^([=]{1,6})[ ]{0,1}([^=]*)[ ]{0,1}([=]{1,6})[ ]*$/) ?
    line.replace(
      /^([=]{1,6})[ ]{0,1}([^=]*)[ ]{0,1}([=]{1,6})[ ]*$/,
      ("#".repeat(RegExp.$1.length) + ` $2`)
    ).replace(/[ ]*$/g, '') :
    line
}

function parseUnorderedList(line) {
  if (line.match(/^[*](.*)/g)) {
    return '- ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function parseCode(line) {
  return line.replace(/<code>([^\/]*)<\/code>/g, `\`$1\``)
}

function parseBoldAndItalic(line) { /* must go before parseBold and parseItalic */
  return line.replace(/[\']{5}([^\']*)[\']{5}/g, `***$1***`)
}

const BLOCKQUOTE_START = 'BLOCKQUOTE_START';
const BLOCKQUOTE_END = 'BLOCKQUOTE_END';

function parseBlockquote(line, index, arr) {
  if (line.match(/\<blockquote\>(.*)\<\/blockquote\>/g)) { /* single blockquote */
    return line.replace(/\<blockquote\>(.*)\<\/blockquote\>/g, `> $1`)
  } else if (line === '<blockquote>' && arr.slice(index + 1, arr.length).find(e => e === '</blockquote>')) {
    arr[index] = BLOCKQUOTE_START
    /* here begins a blockquote with possible newlines */
    return BLOCKQUOTE_START
  } else if (line !== '</blockquote>' && arr[index - 1] && (arr[index - 1].match(/^[>]{1}[ ]{1}(.*)$/g) || arr[index - 1] === BLOCKQUOTE_START)) {
    return arr[index] = line.replace(/^(.*)$/i, `> $1`)
  } else if (line === '</blockquote>' && arr[index - 1].match(/^[>]{1}[ ]{1}(.*)$/g)) {
    return BLOCKQUOTE_END
  } else {
    return line
  }
}

function parseLink(line) {
  return line.replace(/\[([^\s\]\[]*)[ ]{1}([^\]\[]*)\]/g, `[$2]($1)`)
}

function parseBold(line) {
  return line.replace(/<b>|<\/b>|'''/g, '**');
}

function parseItalic(line) {
  return line.replace(/[\']{2}/g, '_')
}

module.exports = text => text.split('\n')
  .map(parseOrderedList)
  .map(parseHeadings)
  .map(parseUnorderedList)
  .map(parseCode)
  .map(parseBlockquote)
  .map(parseLink)
  .map(parseBoldAndItalic)
  .map(parseBold)
  .map(parseItalic)
  .filter(e => e !== BLOCKQUOTE_START && e !== BLOCKQUOTE_END)
  .join('\n')
