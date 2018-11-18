// default/wikitext-to-markdown.js
function orderedList(line) { /* must go before parseHeadings */
  if (line.match(/^[#]{1}[ ]{1}(.*)/g)) {
    return '1. ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function setSequenceForOrderedList(line, index, arr) {
  if (arr[index - 1] && arr[index - 1].match(/^(\d+)[.][ ](.*)$/g)) {
    return arr[index] = line.replace(/^(\d+)[.][ ](.*)$/g, (Number(RegExp.$1) + 1) + '. $2')
  } else {
    return line;
  }
}

function headings(line) {
  return line.match(/^([=]{1,6})[ ]{0,1}([^=]*)[ ]{0,1}([=]{1,6})[ ]*$/) ?
    line.replace(
      /^([=]{1,6})[ ]{0,1}([^=]*)[ ]{0,1}([=]{1,6})[ ]*$/,
      ("#".repeat(RegExp.$1.length) + ` $2`)
    ).replace(/[ ]*$/g, '') :
    line
}

function unorderedList(line) {
  if (line.match(/^[*](.*)/g)) {
    return '- ' + line.slice(2, line.length);
  } else {
    return line;
  }
}

function code(line) {
  return line.replace(/<code>([^\/]*)<\/code>/g, `\`$1\``)
}

function boldAndItalic(line) { /* must go before parseBold and parseItalic */
  return line.replace(/[\']{5}([^\']*)[\']{5}/g, `***$1***`)
}

const BLOCKQUOTE_START = 'BLOCKQUOTE_START';
const BLOCKQUOTE_END = 'BLOCKQUOTE_END';

function blockquote(line, index, arr) {
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

function removeSpecialSymbols(line) {
  return line !== BLOCKQUOTE_START && line !== BLOCKQUOTE_END
}

function link(line) {
  return line.replace(/\[([^\s\]\[]*)[ ]{1}([^\]\[]*)\]/g, `[$2]($1)`)
}

function bold(line) {
  return line.replace(/'''/g, '**');
}

function italic(line) {
  return line.replace(/[\']{2}/g, '_')
}

module.exports = [
  orderedList,
  setSequenceForOrderedList,
  headings,
  unorderedList,
  code,
  boldAndItalic,
  blockquote,
  removeSpecialSymbols,
  link,
  bold,
  italic
]
