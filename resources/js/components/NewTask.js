import axios from 'axios'
import React,{ Component } from 'react'


const formValid = ({formErrors, ...rest}) => {
  
    let valid = true;
    Object.values(formErrors).forEach(val => { 
      val.length > 0 && (valid = false)
    });
  
    Object.values(rest).forEach(val => {
      val === '' && (valid = false);
    });
    return valid; 
  }

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            description: '',
            urgence: '',
            formErrors: {
                nome: '',
                description: '',
                urgence: ''
            }
        }
        this.handleChangeField = this.handleChangeField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUrgence = this.handleUrgence.bind(this)

    }
    
    handleChangeField(e) {
        console.log(this.state)
        e.preventDefault();
        const { name, value } = e.target
        const formErrors  = this.state.formErrors
        switch(name) {
            case 'nome':
                formErrors.nome = value.length < 4 ? 'Nome muito curto' : '';
                break;
            case 'description':
                formErrors.description = value.split(" ").length < 3 ? 'Mínimo de três palavras' : '';
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]:value })
    }

    handleSubmit(e)  {
        const { history } = this.props

        const task = {
            nome: this.state.nome,
            description: this.state.description,
            urgence: this.state.urgence
        }
        console.log(task)
        e.preventDefault();
        if(formValid(this.state)) {
            axios.post('/api/task',task).then(response => {
                // redirect to the homepage
                history.push('/')
            })
        }
        else {
            const { formErrors } = this.state;
            Object.entries(task).forEach( ([name, value]) => {
                switch(name) {
                    case 'nome':
                        formErrors.nome = value.length < 4 ? 'Nome muito curto' : '';
                        break;
                    case 'description':
                        formErrors.description = value.split(" ").length < 3 ? 'Mínimo de três palavras' : '';
                        break;
                    default:
                        break;
                }
                this.setState({ formErrors, [name]:value })
            });
        }
    }

    handleUrgence(e) {
        e.preventDefault();
        const { value } = e.target;
        this.setState({urgence: value});
    }
    render() {
        const { formErrors } = this.state;
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-myblue">
                                <div className="card-title">
                                    <h4> Cadastrar uma nova tarefa </h4>
                                </div>
                            </div>
                            <div className="card-body bg-light">
                                <form autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-12">
                                            <label htmlFor="nome">Nome da Tarefa</label>
                                            <input 
                                                id = "nome"
                                                type = "text"
                                                value = {this.state.nome}
                                                name = "nome"
                                                className = {`form-control ${formErrors.nome ? 'error' : ''}`}
                                                onChange = {this.handleChangeField}
                                            />
                                            {(formErrors.nome.length > 0) && (
                                                <span className='errorMessage'>{formErrors.nome}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-12">
                                            <label htmlFor="description">Descrição</label>
                                            <textarea 
                                                id = "description"
                                                type = "text"
                                                value = {this.state.description}
                                                rows = '10'
                                                name = "description"
                                                className = {`form-control ${formErrors.description ? 'error' : ''}`}
                                                onChange = {this.handleChangeField}
                                            />
                                            {(formErrors.description.length > 0) && (
                                                <span className='errorMessage'>{formErrors.description}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row ml-1 mr-1">
                                        <button 
                                            className={`btn mr-1 ${this.state.urgence == '0' ? 'btn-success' : 'btn-outline-success'}`}
                                            id="easy"
                                            name="easy"
                                            value="0"
                                            onClick = {this.handleUrgence}
                                        >
                                            Tranquilo
                                        </button>
                                        <button 
                                            className={`btn mr-1 ${this.state.urgence == '1' ? 'btn-warning' : 'btn-outline-warning'}`}
                                            id="medium"
                                            name="medium"
                                            value="1"
                                            onClick = {this.handleUrgence}
                                        >
                                            Mediano
                                        </button>
                                        <button 
                                            className={`btn ${this.state.urgence == '2' ? 'btn-danger' : 'btn-outline-danger'}`}
                                            id="urgent"
                                            name="urgent"
                                            value="2"
                                            onClick = {this.handleUrgence}
                                        >
                                            Urgente
                                        </button>
                                        <button className="btn btn-primary ml-auto">Salvar</button>
                                    </div>
                                   
                                </form> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default NewTask