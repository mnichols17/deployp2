import React from 'react';

class TaskBoard extends React.Component {

    state = {
        mobile: false,
        view: 0
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    handleResize = () => {
        this.setState({
            mobile: window.innerWidth < 750 
        })
    }

    handleView = (event) => {
        this.setState({
            view: parseInt(event.target.value)
        })
    }

    moveCardText = (status, id) => {
        switch(status){
            case(1):
                return <div>
                    <a href="#" onClick={this.subStatus} id={id}>&lt;&lt; Send Back</a>
                    <br />
                    <a href="#" onClick={this.addStatus} id={id}>Request Review &gt;&gt;</a>
                </div>
            case(2):
                return <div>
                    <a href="#" onClick={this.subStatus} id={id}>&lt;&lt; More Work Required</a>
                    <br />
                    <a href="#" onClick={this.addStatus} id={id}>Mark Done &gt;&gt;</a>
                </div>
            case(3):
                return <div>
                    <a href="#" onClick={this.subStatus} id={id}>&lt;&lt; Request Re-Review</a>
                </div>
            default:
                return <div>
                    <a href="#" onClick={this.addStatus} id={id}>Start Work &gt;&gt;</a>
                </div>
        }
    }

    renderCard = (task, status) => {
        return task.status === status ? 
        <div className="card my-2 mx-auto" key={task.id}>
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">ID: {task.id}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Type: {task.type}</h6>
                {this.moveCardText(task.status, task.id)}
            </div>
        </div> : null
    }

    addStatus = (event) => {
        let newList = this.props.tasks;
        let index = this.props.tasks.findIndex(task => task.id === parseInt(event.target.id))
        newList[index].status = this.props.tasks[index].status !== 3 ? this.props.tasks[index].status + 1 : this.props.tasks[index].status
        this.props.updateTaskList(newList)
    }

    subStatus = (event) => {
        let newList = this.props.tasks;
        let index = this.props.tasks.findIndex(task => task.id === parseInt(event.target.id))
        newList[index].status = this.props.tasks[index].status !== 0 ? this.props.tasks[index].status - 1 : this.props.tasks[index].status
        this.props.updateTaskList(newList)
    }

    render() {
        return ( this.state.mobile ? 
            <div>
                <label htmlFor="view">Choose a column to view:</label>
                <select onChange={this.handleView} className="form-control" id="view">
                    <option value="0">To Do</option>
                    <option value="1">In Progress</option>
                    <option value="2">Review</option>
                    <option value="3">Done</option>
                </select>
                <div className="container-fluid mt-2" id="taskBoard">
                    {this.props.tasks.map(task => this.renderCard(task, this.state.view))}
                </div>
            </div> 
            :
            <div className="container-fluid" id="taskBoard">
                <div className="row">
                    <div className="col" id="col0">
                        <h2 className="mt-1">To Do</h2>
                        {this.props.tasks.map(task => this.renderCard(task, 0))}
                    </div>
                    <div className="col" id="col1">
                        <h2 className="mt-1">In Progress</h2>
                        {this.props.tasks.map(task => this.renderCard(task, 1))}
                    </div>
                    <div className="col" id="col2">
                        <h2 className="mt-1">Review</h2>
                        {this.props.tasks.map(task => this.renderCard(task, 2))}
                    </div>
                    <div className="col" id="col3">
                        <h2 className="mt-1">Done</h2>
                        {this.props.tasks.map(task => this.renderCard(task, 3))}
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskBoard;