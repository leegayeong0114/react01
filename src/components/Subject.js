import React, { Component } from 'react'

class Subject extends Component {
  render() {

    const changePage = e => {
      e.preventDefault()
      this.props.onChangePage('welecom')
    }

    return (
      <header>
        <h1>
          <a 
            href="/" 
            onClick={changePage.bind(this)}
          >{this.props.title}</a>
        </h1>
        {this.props.sub}
      </header>
    )
  }
}

export default Subject