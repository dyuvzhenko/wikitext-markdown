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

function parseBlockqoute(line) {
  if (line.match(/<\s*blockquote[^>]*>(.*)<\s*\/\s*blockquote>/g)) {
    let result = line.replace('<blockquote>', '').replace('</blockquote>', '');

    return '> ' + result;
  } else {
    return line;
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
  .map(parseBlockqoute)
  .map(parseLink)
  .map(parseBoldAndItalic)
  .map(parseBold)
  .map(parseItalic)
  .join('\n')
