import React from 'react';

class AddTask extends React.Component {

    state = {
        title: "",
        type: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addToTasks = (event) => {
        event.preventDefault()
        let newList = this.props.tasks;
        newList.push({"id": newList.length + 1, "title": this.state.title, "type": this.state.type, status: 0})
        this.props.history.push("/");
    }


    render() {
        return (
            <div className="container" id="addTask">
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input onChange={this.handleChange} type="text" className="form-control" name="title" id="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select onChange={this.handleChange} className="form-control" name="type" id="type">
                            <option value="Task">Task</option>
                            <option value="Feature">Feature</option>
                            <option value="Bug">Bug</option>
                        </select>
                    </div>
                    <button onClick={this.addToTasks} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddTask