import { Component } from 'react';
import './Auth.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/userReducer';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            mode: 'register',
            email: '',
            password: ''
        }
    }

    handleMode = e => {
        this.setState({ mode: e.target.name })
    }

    handleInput = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value})
    }

    handleSubmit = () => {
        const {mode, email, password} = this.state;

        const path = mode === 'register' ? 'register' : 'login';

        axios
            .post(`/path/${path}`, {email, password})
            .then(res => {
                this.props.loginUser(res.data);
                this.props.history.push('/jokes')
            })
            .catch(err => console.log(err))
    }

    render() {
        const { mode } = this.state;

        return (
            <section className='Auth'>
                <div className='auth-choice'>
                    <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>Register</button>
                    <button name='sign in' onClick={this.handleMode} disabled={mode === 'sign in'}>Sign In</button>
                </div>
                <h1>{mode.toUpperCase()}</h1>

                <div>
                    <input placeholder='email' name='email' onChange={this.handleInput} />
                    <input placeholder='password' name='password' onChange={this.handleInput} />
                    <button>Submit</button>
                </div>
                
            </section>
        )
    }
}

export default connect(null, { loginUser })(Auth);