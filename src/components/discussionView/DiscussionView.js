import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getMessagesWithThreadId } from '../../API/serviceClient';
import { postNewMessage } from '../../API/serviceClient';

export default class DiscussionView extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], input: '', thread_id: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getMessagesPerThread = this.getMessagesPerThread.bind(this);
  }

  componentDidMount() {
    this.getMessagesPerThread();
  }

  async getMessagesPerThread() {
    let threadId = this.props.match.params.id;
    try {
      let jsonRes = await getMessagesWithThreadId(threadId);
      this.setState({ data: jsonRes.message, thread_id: threadId });
    } catch (error) {
      console.error(error);
    }
  }

  async handleClick(event) {
    event.preventDefault();
    let thread_id = this.state.thread_id;
    let content = this.state.input;
    try {
      let res = await postNewMessage(content, thread_id);
      if (res === true) {
        this.getMessagesPerThread();
      } else {
        throw new Error('Failed to post message.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(event) {
    this.setState({ input: event.target.value })
  }

  render() {
    let dataArray = this.state.data.map(item => {
      let dateSplit = item.created.split('T')[0];
      return (
        <Card className="discussion-card" key={item.id}>
          <Card.Body>
            <Card.Text>
              <strong>{item.username}</strong> @{dateSplit}
            </Card.Text>
            <Card.Text>
              {item.content}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    })
    
    return (
      <div>
        <p></p>
        <Container className="discussion-card-container">
          {dataArray}
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Type new message: </Form.Label>
              <Form.Control as="textarea" rows="3" onChange={this.handleChange} />
            </Form.Group>
            <Button
              variant="primary"
              onClick={this.handleClick}
              type="submit">Input message</Button>
          </Form>
        </Container>
      </div>
    )
  }
}