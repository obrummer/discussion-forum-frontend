import React, { Component } from 'react';
import { login } from '../../API/serviceClient';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', pwinput: '' };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange = (e) => {
        const uusiarvo = e.target.value;
        this.setState({ username: uusiarvo });
    }
    handlePasswordChange = (e) => {
        const uusiarvo = e.target.value;
        this.setState({ pwinput: uusiarvo });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.state.username || !this.state.pwinput) {
            alert('Please fill both username and password');
            return;
        }
        try {
            let res = await login(this.state);
            this.props.onLogin(res.user);
            this.props.history.push('/');
        } catch (error) {
            console.error(error);
        }
        this.setState({ username: '', pwinput: '' });
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Username"
                    value={this.state.username} onChange={this.handleNameChange} /><br />
                <input type="password" placeholder="Password"
                    value={this.state.pwinput} onChange={this.handlePasswordChange} /><br />
                <input type="submit" value="Login" onClick={this.handleSubmit} />
            </form>
        );
    }
}

export default LoginForm;
