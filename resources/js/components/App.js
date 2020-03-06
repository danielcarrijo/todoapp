import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import TasksList from './TasksList'
import ShowTask from './ShowTask'
import NewTask from './NewTask'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={TasksList} />
            <Route path='/create' component={NewTask} />
            <Route path='/:id' component={ShowTask} />
            
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))