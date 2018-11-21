import React, { Component } from 'react';
import Converter from 'wikitext-markdown';

import exampleWikiText from './data/wikitext'
import exampleMarkdownText from './data/markdowntext'

class App extends Component {
  constructor(props) {
    super(props)
    this.converter = new Converter({ preset: 'default-with-html' })
    this.state = {
      wikiText: exampleWikiText,
      markdownText: exampleMarkdownText
    }
  }

  changeWikiText = (e) => {
    this.setState({
      wikiText: e.target.value,
      markdownText: this.converter.toMarkdown(e.target.value)
    })
  }

  changeMarkdownText = (e) => {
    this.setState({
      markdownText: e.target.value,
      wikiText: this.converter.toWiki(e.target.value)
    })
  }

  render() {
    const { wikiText, markdownText } = this.state
    return (
      <div style={{'textAlign': 'center'}}>
        <h2>Convert data from wiki to markdown</h2>
        <textarea style={textareaStyle} value={wikiText} onChange={this.changeWikiText} />
        <textarea style={textareaStyle} value={markdownText} onChange={this.changeMarkdownText} />
      </div>
    );
  }
}

const textareaStyle = {
  'width': '600px',
  'height': '600px',
  'margin': '20px'
}

export default App;
