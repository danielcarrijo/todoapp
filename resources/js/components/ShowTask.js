import axios from 'axios'
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

const DefineUrgence = number  => {
    return number == 2 ? ' Urgente' : number==1 ? ' Mediano' : 'Tranquilo';
}


class ShowTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {
            },
            subitems:[]
        }
        this.handleMarkTaskasCompleted = this.handleMarkTaskasCompleted.bind(this)
        this.handleMarkSubItemasCompleted = this.handleMarkSubItemasCompleted.bind(this)
    }
    componentDidMount () {
        const taskId = this.props.match.params.id;
        axios.get(`/api/task/${taskId}`).then(response => {
            this.setState({
                task: response.data,
                subitems : response.data.subitems
            })
        })
    }
    

    handleMarkTaskasCompleted () {
        const { history } = this.props
        axios.put(`api/task/${this.state.task.id}`).then(response => history.push('/'))
    }

    handleMarkSubItemasCompleted (e) {
        e.preventDefault()
        const { value } = e.target;
        console.log(value)
        axios.put(`api/subitem/${value}`).then(response => window.location.reload()).catch(error => {
            console.log(error.response)
          })
    }

    
    render() {
        const { task } = this.state
        const subitems = this.state.subitems;
        console.log(subitems);
        return (
            <div className="contaiter">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-myblue">
                                <div className="row">
                                    <div className="card-title ml-1"><h4 className="ml-1">{task.nome}</h4></div>
                                </div>
                            </div>
                            <div className="card-body scroll-y-card">
                                <p><b>Descrição: </b>{task.description}</p>
                                {subitems.length > 0 ? <h3>Subitens</h3> : ''}
                                <ul className="list-group list-group-flush">
                                    {subitems.map(subitem => (
                                        <Link 
                                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                            to="/"
                                            key = {subitem.id}
                                        >
                                            {subitem.title}
                                            <button className="badge badge-primary ml-auto" onClick={this.handleMarkSubItemasCompleted} value={subitem.id} id={subitem.id}>
                                                Marcar como completo
                                            </button>
                                            <span className={`ml-auto badge ${subitem.urgence  == '2' ? 'badge-danger' : `${subitem.urgence  == '1' ? 'badge-warning' :'badge-success'}`} `}>
                                                {DefineUrgence(subitem.urgence)}
                                            </span>
                                        </Link>
                                        
                                    ))}
                                </ul>
                            </div>
                            <div className="card-footer">
                                <div className="row ml-1 mr-1">
                                <Link className="btn btn-primary but-0 mr-auto" to={`item/${task.id}`}>Adicionar mais um subitem</Link>
                                <button onClick={this.handleMarkTaskasCompleted} className="btn btn-primary but-0 ml-auto">Marcar como completa</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowTask