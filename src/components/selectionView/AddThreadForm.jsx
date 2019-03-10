import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postNewThread } from "../../API/serviceClient";

class AddThreadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { category_id: "", topic: "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    event.preventDefault();
    if (!this.state.topic) {
      alert("Must have topic for new thread!");
      return;
    }
    postNewThread(this.state).then(
      res => {
        this.props.history.push("/discussion/" + res.message[0].id);
      },
      err => {
        alert(err.message);
      }
    );
  };

  render() {
    let optionList = this.props.listContent
      .filter(option => option.id !== -1)
      .map(option => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      });

    return (
      <Form>
        <Form.Group>
          <Form.Label>Input your topic</Form.Label>
          <Form.Control type="text" name="topic" placeholder="Topic" autoComplete="off" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select category</Form.Label>
          <Form.Control as="select" name="category_id" onChange={this.handleChange}>
            {optionList}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={this.handleClick} type="submit">
          Start new thread
        </Button>
      </Form>
    );
  }
}

export default withRouter(AddThreadForm);
