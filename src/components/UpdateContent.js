import React, { Component } from 'react'

class UpdateContent extends Component {

  // props는 readonly이므로 input value로 사용할 수 없다.
  // props를 state화 시켜준다.
  constructor(props) {
    super(props)
    this.state={
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc,
    }
    this.inputFormHandler = this.inputFormHandler.bind(this)
  }

  inputFormHandler(e) {
    this.setState({[e.target.name]: e.target.value,})
  }

  render() {
    const submitAction = (e) => {
      e.preventDefault()
      this.props.onSubmit(this.state.id, this.state.title, this.state.desc)
    }
    return (
      <article>
        <h2>update</h2>
        <form 
          action="/create_process" 
          method="post" 
          onSubmit={submitAction.bind(this)}
        > 
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input 
              type="text" 
              name="title" 
              placeholder="title" 
              value={this.state.title}
              onChange={this.inputFormHandler}
            ></input>
          </p>
          <p>
            <textarea 
              name="desc" 
              placeholder="desc" 
              value={this.state.desc}
              onChange={this.inputFormHandler}
            ></textarea>
          </p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    )
  }
}

export default UpdateContent