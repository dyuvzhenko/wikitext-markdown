// html/wikitext-to-markdown.js
function htmlOrderedList(line) {}

function htmlSetSequenceForOrderedList(line) {}

function htmlHeadings(line) {}

function htmlUnorderedList(line) {}

function htmlCode(line) {}

function htmlBoldAndItalic(line) {}

function htmlBlockquote(line, index, arr) {}

function htmlRemoveSpecialSymbols(line) {}

function htmlLink(line) {}

function htmlBold(line) {
  return line.replace(/<b>(.*)<\/b>/g, `**$1**`)
}

function htmlItalic(line) {
  return line.replace(/<i>(.*)<\/i>/g, `_$1_`)
}

module.exports = [
  // htmlOrderedList,
  // htmlSetSequenceForOrderedList,
  // htmlHeadings,
  // htmlUnorderedList,
  // htmlCode,
  // htmlBoldAndItalic,
  // htmlBlockquote,
  // htmlRemoveSpecialSymbols,
  // htmlLink,
  htmlBold,
  htmlItalic
]
