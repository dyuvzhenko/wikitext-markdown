const linkRegExp = /\[([^\[]+)[ ]([^\[]+)]/; /* [url text] */
const boldRegExp = /<\s*b[^>]*>(.*)<\s*\/\s*b>/g; /* <b>bold text</b> */
const italicRegExp = /(<i>)|(<\/i>)/g;
const headingRegExp = /^[=]{1,6}(.*)[=]{1,6}/g;
const unorderedList = /^[*](.*)/g;
const orderedList = /^[#]{1}(^#.*)[^#]/g;
const blockquoteRegExp = /<\s*blockquote[^>]*>(.*)<\s*\/\s*blockquote>/g;

function parseBoldStyle(line) {
  if (line.match(boldRegExp)) {
    return line.replace('<b>', '**').replace('</b>', '**');
  } else {
    return line;
  }
}

function parseItalic(line) {
  return line
    .replace(/([^\\])[_]/g, `$1\\_`) /* simple underscore first */
    .replace(italicRegExp, '_') /* wikitext to mardown next */;
}

function parseHeadings(line) {
  if (line.match(headingRegExp)) {
    let level = 0
    let heading = '#'
    while (line[++level] === '=') {
      heading += '#'
    }
    return heading + ' ' + line.slice(level, line.length - level)
  } else {
    return line
  }
}

function parseUnorderedList(line) {
  if (line.match(unorderedList)) {
    return '- ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function parseOrderedList(line) {
  if (line.match(orderedList)) {
    return '1.' + line.slice(2, line.length);
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

module.exports = text => text.split('\n')
  .map(parseBoldStyle)
  .map(parseItalic)
  .map(parseHeadings)
  .map(parseUnorderedList)
  .map(parseOrderedList)
  .map(parseBlockqoute)
  .map(parseLink)
  .join('\n')
