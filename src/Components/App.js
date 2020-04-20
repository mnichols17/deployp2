import React from 'react';
import { Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';

import TaskBoard from './TaskBoard';
import AddTask from './AddTask';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount = () => {
    axios.get("https://my-json-server.typicode.com/mnichols17/project2/tasks")
    .then(res => {
        this.setState({
          tasks: res.data
        })
      })
    .catch(error => console.log(error))
  }

  updateTaskList = (newTasks) => {
      this.setState({
          tasks: newTasks
      })
  }

  render(){
    return (
      <div className="container-fluid" id="view">
        <Router>
            <nav className="mt-3 ml-5">
                <Link className="navLink" to="/">Task Board</Link>
                <Link className="navLink" to="/addtask">Add Task</Link>
            </nav>
            <div className="mt-3">
            <Switch>
                <Route exact path="/" render={(props) => (<TaskBoard tasks={this.state.tasks} updateTaskList={this.updateTaskList} {...props}/>)} />
                <Route path="/addtask" render={(props) => (<AddTask tasks={this.state.tasks} updateTaskList={this.updateTaskList} {...props}/>)} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App