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


class NewSubItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            task_id: '',
            urgence: '',
            formErrors: {
                title: '',
                urgence: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUrgence = this.handleUrgence.bind(this)

    }

    componentDidMount() {
        const subitemId = this.props.match.params.id;
        this.setState({task_id: subitemId})
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { history } = this.props
        const subitem = {
            title: this.state.title,
            task_id: this.state.task_id,
            urgence: this.state.urgence
        }
        if(formValid(this.state)) {
            axios.post('../api/subitem',subitem).then(response => {
                // redirect to the homepage
                history.push('/')
            }) .catch(error => {
                console.log(error.response)
              });
        }

    }

    handleUrgence(e) {
        e.preventDefault();
        const { value } = e.target;
        this.setState({urgence: value});
    }

    handleChange(e) {
        e.preventDefault()
        console.log(this.state)
        const { name, value } = e.target;
        const {formErrors} = this.state
        switch(name) {
            case "title":
                formErrors.name = value.length < 3 ? "Nome muito curto" : ''
                break
            default:
                break
        }
        this.setState({formErrors, [name]:value})
        
        
    }
    render () {
        const { formErrors } = this.state
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-myblue">
                                <div className="card-title"><h4>Criando um subitem</h4></div>
                            </div>
                            <div className="card-body">
                                <form autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="title">Nome</label>
                                            <input 
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                id="title"
                                                onChange={this.handleChange}
                                            />
                                            {formErrors.title}
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
export default NewSubItem