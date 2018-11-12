const headingRegExp = /^([=]{1,6})[ ]{0,1}([^=]*)[ ]{0,1}([=]{1,6})[ ]*$/; /* == heading == */
const unorderedListRegExp = /^[*](.*)/g; /* * unordered list */
const orderedListRegExp = /^[#]{1}[ ]{1}(.*)/g; /* # orderedList */
const blockquoteRegExp = /<\s*blockquote[^>]*>(.*)<\s*\/\s*blockquote>/g; /* <blockquote>text</blockquote> */
const linkRegExp = /\[([^\[]+)[ ]([^\[]+)]/; /* [url text] */
const boldRegExp = /<b>|<\/b>|'''/g; /* <b>bold text</b> or '''bold text''' */
const italicRegExp = /\'\'/g; /* <i>italic text</i> */

/* must go after parseHeadings */
function parseOrderedList(line) {
  if (line.match(orderedListRegExp)) {
    return '1. ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function parseHeadings(line) {
  return line.match(headingRegExp) ?
    line.replace(headingRegExp, ("#".repeat(RegExp.$1.length) + ` $2`)).replace(/[ ]$/g, '') :
    line
}

function parseUnorderedList(line) {
  if (line.match(unorderedListRegExp)) {
    return '- ' + line.slice(2, line.length);
  } else {
    return line;
  }
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
  let countLinks = line.match(new RegExp(linkRegExp, 'g'));
  if (!countLinks) {
    return line;
  } else {
    for (let i = 0; i < countLinks.length; i++) {
      let firstSymbolOfLink = line.search(new RegExp(linkRegExp, 'i'));

      let url = '';
      while (line[++firstSymbolOfLink] !== ' ') { /* find url */
        url += line[firstSymbolOfLink];
      }

      let text = '';
      while (line[++firstSymbolOfLink] !== ']') { /* find text */
        text += line[firstSymbolOfLink];
      }

      line = line.replace(linkRegExp, `[${text}](${url})`);
    }
    return line;
  }
}

function parseBoldStyle(line) {
  return line.replace(boldRegExp, '**');
}

function parseItalic(line) {
  return line
    .replace(/([^\\]{0,1})[_]/g, `$1\\_`) /* screen simple underscore first */
    .replace(italicRegExp, '_') /* wikitext to mardown next */
}

module.exports = text => text.split('\n')
  .map(parseOrderedList)
  .map(parseHeadings)
  .map(parseUnorderedList)
  .map(parseBlockqoute)
  .map(parseLink)
  .map(parseBoldStyle)
  .map(parseItalic)
  .join('\n')
