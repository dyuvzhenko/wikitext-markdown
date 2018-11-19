// html/markdown-to-wikitext.js
function htmlHeadings(line) {}

function htmlUnorderedList(line) {}

function htmlOrderedList(line) {}

function htmlCode(line) {}

function htmlBoldAndItalic(line) {}

function htmlBlockquoteFirstPass(line) {}

function htmlBlockquoteSecondPass(line) {}

function htmlLink(line) {}

function htmlBold(line) {
  return line.replace(/<b>(.*)<\/b>/g, `'''$1'''`)
}

function htmlItalic(line) {
  return line.replace(/<i>(.*)<\/i>/g, `''$1''`)
}

module.exports = [
  // htmlHeadings,
  // htmlUnorderedList,
  // htmlOrderedList,
  // htmlCode,
  // htmlBoldAndItalic,
  // htmlBlockquoteFirstPass,
  // htmlBlockquoteSecondPass,
  // htmlLink,
  htmlBold,
  htmlItalic
]
