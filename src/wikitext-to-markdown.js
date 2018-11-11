module.exports = (text) => {
  let markdownTextLines = text.split('\n');

  /* parse bold text */
  markdownTextLines = markdownTextLines.map(line => {
    if (line.match(/<\s*b[^>]*>(.*)<\s*\/\s*b>/g)) {
      return line.replace('<b>', '**').replace('</b>', '**');
    } else {
      return line;
    }
  });

  /* parse italic text */
  markdownTextLines = markdownTextLines.map(line => line
    .replace(/([^\\])[_]/g, `$1\\_`) /* simple symbols first */
    .replace(/(<i>)|(<\/i>)/g, '_') /* wikitext to mardown next */
  );

  /* parse headings (H1-H6) */
  markdownTextLines = markdownTextLines.map(line => {
    if (line.match(/^[=]{1,6}(.*)[=]{1,6}/g)) {
      let level = 0
      let heading = '#'
      while (line[++level] === '=') {
        heading += '#'
      }
      return heading + ' ' + line.slice(level, line.length - level)
    } else {
      return line
    }
  });

  /* parse lists (unordered) */
  markdownTextLines = markdownTextLines.map(line => {
    if (line.match(/^[*](.*)/g)) {
      return '- ' + line.slice(2, line.length);
    } else {
      return line;
    }
  });

  /* parse lists (ordered) */
  markdownTextLines = markdownTextLines.map(line => {
    if (line.match(/^[#]{1}(^#.*)[^#]/g)) {
      return '1.' + line.slice(2, line.length);
    } else {
      return line;
    }
  });

  /* parse blockquote */
  markdownTextLines = markdownTextLines.map(line => {
    if (line.match(/<\s*blockquote[^>]*>(.*)<\s*\/\s*blockquote>/g)) {
      let result = line.replace('<blockquote>', '').replace('</blockquote>', '');

      return '> ' + result;
    } else {
      return line;
    }
  });

  const linkRegExp = /\[([^\[]+)[ ]([^\[]+)]/;

  /* parse link */
  markdownTextLines = markdownTextLines.map(line => {
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
  });

  return markdownTextLines.join('\n')
};
