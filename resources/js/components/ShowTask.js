import axios from 'axios'
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

class ShowTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {
            }
        }
        this.handleMarkTaskasCompleted = this.handleMarkTaskasCompleted.bind(this)
    }
    componentDidMount () {
        const taskId = this.props.match.params.id;
        axios.get(`/api/task/${taskId}`).then(response => {
            this.setState({
                task: response.data
            })
        })
    }
    handleMarkTaskasCompleted () {
        const { history } = this.props
        axios.put(`api/task/${this.state.task.id}`).then(response => history.push('/'))
    }

    
    render() {
        const { task } = this.state
        console.log(task);
        return (
            <div className="contaiter">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="card-title ml-1"><h4>{task.nome}</h4></div>
                                </div>
                            </div>
                            <div className="card-body scroll-y-card">
                                <p>{task.description}</p>
                            </div>
                            <div className="card-footer">
                                <button onClick={this.handleMarkTaskasCompleted} className="btn btn-primary but-0 ml-auto">Marcar como completa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowTask