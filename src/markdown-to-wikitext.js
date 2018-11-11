module.exports = (text) => {
  let wikitextLines = text.split('\n');

  /* parse headings (H1-H6) */
  wikitextLines = wikitextLines.map(line => {
    if (line.match(/^[#]{1,6}[ ](.*)$/g)) {
      let level = 0,
          rightSide = '',
          leftSide = ''
      while (line[level++] === '#') {
        rightSide += '='
        leftSide += '='
      }
      return leftSide + line.slice(level, line.length) + rightSide
    } else {
      return line
    }
  })

  /* parse lists (unordered) */
  wikitextLines = wikitextLines.map(line => line.match(/^[-][ ](.*)$/g) ?
    '*' + line.slice(1, line.length) :
    line
  )

  /* parse lists (unordered) */
  wikitextLines = wikitextLines.map(line => line.match(/^\d+[.][ ](.*)$/g) ?
    '#' + line.slice(2, line.length) :
    line
  )

  /* parse blockquote */
  wikitextLines = wikitextLines.map(line => line.match(/^[>][ ](.*)$/g) ?
    '<blockquote>' + line.slice(2, line.length) + '</blockquote>' :
    line
  )

  /* parse bold */
  wikitextLines = wikitextLines.map(line => {
    const countBoldSymbols = line.match(/[*][*]/g)
    if (!countBoldSymbols) {
      return line
    } else {
      for (let i = 0; i < Math.floor(countBoldSymbols.length / 2); i++) {
        line = line.replace(/[*][*]/i, '<b>').replace(/[*][*]/i, '</b>')
      }
      return line
    }
  })

  /* parse italic (two cases here `_` and `\_`) */
  wikitextLines = wikitextLines.map(line => {
    /* first take `_` in markdown meanings and translate it to `<i>` and `</i>` */
    const markdownItalicSymbols = line.match(/([^\\])_/g)
    if (!markdownItalicSymbols) {
      return line
    } else {
      for (let i = 0; i < Math.floor(markdownItalicSymbols.length / 2); i++) {
        line = line.replace(/([^\\])_/i, `$1<i>`).replace(/([^\\])_/, '$1</i>')
      }
    }

    /* then take all simple symbol `_` who is screened and write it without `\` */
    return line.replace(/\\[_]/g, '_')
  })

  const linkRegExp = /\[([^\[])+\]\(([^\(])+\)/

  /* parse link */
  wikitextLines = wikitextLines.map(line => {
    const countLinks = line.match(new RegExp(linkRegExp, 'g'))
    if (!countLinks) {
      return line
    } else {
      for (let i = 0; i < countLinks.length; i++) {
        let firstSymbolOfLink = line.search(new RegExp(linkRegExp, 'i'))

        let text = ''
        while (line[++firstSymbolOfLink] !== ']') { /* find text */
          text += line[firstSymbolOfLink]
        }

        let url = ''
        ++firstSymbolOfLink;
        while (line[++firstSymbolOfLink] !== ')') { /* find url */
          url += line[firstSymbolOfLink]
        }

        line = line.replace(linkRegExp, `[${url} ${text}]`)
      }
      return line
    }
  })

  return wikitextLines.join('\n')
};
