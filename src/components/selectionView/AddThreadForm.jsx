import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddThreadForm extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { category: 'javascript', topic: '' };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleClick(event) {
        event.preventDefault();
        let token = localStorage.getItem('auth');
        if (!this.state.topic) {
            alert('Must have topic for discussion!');
            return;
        }
        if(!token) {
            alert('Must be signed in to start new thread!');
            return;
        }
        let author_id = JSON.parse(token).id;
        let myHeaders = new Headers();
        if (token) {
            myHeaders.append('authorization', token);
        }
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        try {
            let res = await fetch('/api/thread', {
                method: 'POST',
                mode: 'cors',
                headers: myHeaders,
                body: `{"author_id":"${author_id}", "topic": "${this.state.topic}", "category": "${this.state.category}"}`
            })
            let jsonRes = await res.json();
            if (!jsonRes.id) {
                throw new Error("Not authorized!")
            }
            let url_id = jsonRes.id;
            this.props.history.push('/discussion/' + url_id);
        } catch (error) {
            alert(error.message);
        }

    }

    render() {

        let optionList = this.props.listContent
            .filter(option => option.category.toLowerCase() !== 'all categories')
            .map(option => {
                return (<option
                    key={option.id}
                    value={option.category.toLowerCase()}>
                    {option.category}
                </option>)
            });

        return (
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Input your topic</Form.Label>
                    <Form.Control
                        type="text"
                        name="topic"
                        placeholder="Topic"
                        autoComplete="off"
                        onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category}>{optionList}</Form.Control>
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={this.handleClick}
                    type="submit">Start new thread</Button>
            </Form>
        )
    }
}

export default withRouter(AddThreadForm);