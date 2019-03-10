import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmission = e => {
    e.preventDefault();
    this.setState({ content: "" });
    this.props.onSubmission(this.state.content);
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Control as="textarea" rows="3" onChange={this.handleChange} value={this.state.content} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleSubmission}>
          Submit message
        </Button>
      </Form>
    );
  }
}

export default MessageInput;
