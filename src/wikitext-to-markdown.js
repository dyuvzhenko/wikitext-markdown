const headingRegExp = /^([=]{1,6})[ ]{0,1}([^=]*)[ ]{0,1}([=]{1,6})[ ]*$/; /* == heading == */
const unorderedListRegExp = /^[*](.*)/g; /* * unordered list */
const orderedListRegExp = /^[#]{1}[ ]{1}(.*)/g; /* # orderedList */
const blockquoteRegExp = /<\s*blockquote[^>]*>(.*)<\s*\/\s*blockquote>/g; /* <blockquote>text</blockquote> */
const linkRegExp = /\[([^\s\]\[]*)[ ]{1}([^\]\[]*)\]/g; /* [url text] */
const boldRegExp = /<b>|<\/b>|'''/g; /* <b>bold text</b> or '''bold text''' */
const italicRegExp = /\'\'/g; /* <i>italic text</i> */
const codeRegExp = /<code>([^\/]*)<\/code>/g;

/* must go before parseHeadings */
function parseOrderedList(line) {
  if (line.match(orderedListRegExp)) {
    return '1. ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function parseHeadings(line) {
  return line.match(headingRegExp) ?
    line.replace(headingRegExp, ("#".repeat(RegExp.$1.length) + ` $2`)).replace(/[ ]*$/g, '') :
    line
}

function parseUnorderedList(line) {
  if (line.match(unorderedListRegExp)) {
    return '- ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function parseCode(line) {
  return line.replace(codeRegExp, `\`$1\``)
}

function parseBlockqoute(line) {
  if (line.match(blockquoteRegExp)) {
    let result = line.replace('<blockquote>', '').replace('</blockquote>', '');

    return '> ' + result;
  } else {
    return line;
  }
}

function parseLink(line) {
  return line.replace(linkRegExp, `[$2]($1)`)
}

function parseBoldStyle(line) {
  return line.replace(boldRegExp, '**');
}

function parseItalic(line) {
  return line.replace(italicRegExp, '_')
}

module.exports = text => text.split('\n')
  .map(parseOrderedList)
  .map(parseHeadings)
  .map(parseUnorderedList)
  .map(parseCode)
  .map(parseBlockqoute)
  .map(parseLink)
  .map(parseBoldStyle)
  .map(parseItalic)
  .join('\n')
