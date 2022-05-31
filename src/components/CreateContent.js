import React, { Component } from 'react'

class CreateContent extends Component {
  render() {

    const submitAction = (e) => {
      e.preventDefault()
      this.props.onSubmit(e.target.title.value, e.target.desc.value)
    }

    return (
      <article>
        <h2>create</h2>
        <form 
          action="/create_process" 
          method="post" 
          onSubmit={submitAction.bind(this)}
        > 
          <p><input type="text" name="title" placeholder="title"></input></p>
          <p><textarea name="desc" placeholder="desc"></textarea></p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    )
  }
}

export default CreateContent