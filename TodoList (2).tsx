import React, { Component }  from 'react'

class ToDoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      string: '',
      taskCount: 0,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ string: event.target.value })
  }

  handleSubmit(event) {
    if (this.state.string) {
      this.state.value.push(this.state.string)
      const incTaskCount = this.state.taskCount + 1
      this.setState({ taskCount: incTaskCount })
      this.setState({ string: '' })
    }
    event.preventDefault()
  }
  handleToggle = event => {
    const toggleClassName = event.currentTarget.getAttribute('class')
    if (toggleClassName) {
      event.currentTarget.removeAttribute('class')
      const inc = this.state.taskCount + 1
      this.setState({
        taskCount: inc,
      })
    } else {
      event.currentTarget.setAttribute('class', 'is-done')
      const dec = this.state.taskCount - 1
      this.setState({
        taskCount: dec,
      })
    }
  }

  render() {
    const { value } = this.state
    const updateTasks = value.map((value, index) => {
      if (value) return <li key={index} onClick={this.handleToggle}>{value}</li>
      return
    })
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.string} onChange={this.handleChange} />
        <button type="submit">Add</button>
        <>
          <style>{`
        ul > li {
          list-style-type:disc;
          list-style-position: inside;
        }
      `}</style>
          <ul>
            <p className={'task-counter'}>
              {this.state.taskCount + ' remaining out of ' + value.length + ' tasks'}
            </p>
            {updateTasks}
          </ul>
        </>
      </form>
    )
  }
}
export default class TodoList extends React.Component {
  render() {
    return (
      <>
        <div>
          <h2>Todo List</h2>
          <ToDoForm />
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                    button {
                      padding: 0px 10px;
                      border: 1px solid;
                    }
                `}</style>
      </>
    )
  }
}
export { TodoList }
