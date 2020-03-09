import axios from 'axios'
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

const DefineUrgence = number  => {
    return number == 2 ? ' Urgente' : number==1 ? ' Mediano' : 'Tranquilo';
}

class Completed extends Component {
    constructor() {
        super();
        this.state = {
            tasks : []
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount () {
        axios.get('/api/task/completed').then(response => {
          this.setState({
            tasks: response.data
          })
        })
      }

      handleClick(e) {
           e.preventDefault()
           const { history } = this.props
           const { id } = e.target;
           axios.put(`/api/task/completed/${id}`).then(response => {history.push('/')})

      }
    render() {
        const { tasks } = this.state
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-myblue">
                                <div className="card-title"><h4>Tarefas já completadas</h4><h6>Clique na tarefa que quer recuperar</h6></div>
                            </div>
                            <div className="card-body">
                            <ul className='list-group list-group-flush'>
                                {tasks.map(task => (
                                    <a 
                                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                        id = {task.id}
                                        onClick = {this.handleClick}
                                    >
                                        {task.nome}
                                        <span className={`ml-auto badge ${task.urgence  == '2' ? 'badge-danger' : `${task.urgence  == '1' ? 'badge-warning' :'badge-success'}`} `}>
                                            {DefineUrgence(task.urgence)}
                                        </span>
                                    </a> 
                                ))}
                            
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default Completed