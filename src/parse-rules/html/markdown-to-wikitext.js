// html/markdown-to-wikitext.js
function htmlBold(line) {
  return line.replace(/<b>(.*)<\/b>/g, `'''$1'''`)
}

function htmlItalic(line) {
  return line.replace(/<i>(.*)<\/i>/g, `''$1''`)
}

module.exports = [
  htmlBold,
  htmlItalic
]
