// html/wikitext-to-markdown.js
function htmlBold(line) {
  return line.replace(/<b>(.*)<\/b>/g, `**$1**`)
}

function htmlItalic(line) {
  return line.replace(/<i>(.*)<\/i>/g, `_$1_`)
}

module.exports = [
  htmlBold,
  htmlItalic
]
