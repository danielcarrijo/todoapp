import axios from 'axios'
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

const DefineUrgence = number  => {
    return number == 2 ? ' Urgente' : number==1 ? ' Mediano' : 'Tranquilo';
}

class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            tasks : []
        }
    }
    componentDidMount () {
        axios.get('/api/task').then(response => {
          this.setState({
            tasks: response.data
          })
        })
      }
    render() {
        const { tasks } = this.state
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-myblue">
                                <div className="card-title"><h4>Tarefas</h4></div>
                            </div>
                            <div className="card-body">
                            <div className="row mb-3 mx-2">
                            <Link className='btn btn-primary btn-sm' to='/create'>
                                Criar nova tarefa
                            </Link>
                            <Link className="btn btn-primary btn-sm ml-auto" to="/recuperar"> 
                                Recuperar alguma tarefa?
                            </Link>
                            </div>
                            
                            <ul className='list-group list-group-flush mb-3'>
                                {tasks.map(task => (
                                    <Link 
                                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                        to={`/${task.id}`}
                                        key={task.id}
                                    >
                                        {task.nome}
                                        <span className={`ml-auto badge ${task.urgence  == '2' ? 'badge-danger' : `${task.urgence  == '1' ? 'badge-warning' :'badge-success'}`} `}>
                                            {DefineUrgence(task.urgence)}
                                        </span>
                                    </Link> 
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
export default TasksList