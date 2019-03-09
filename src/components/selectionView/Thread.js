import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Thread.css';

const Thread = (props) => {
  let link = '/discussion/' + props.thread_id;
  return (
    <Card className="thread-card">
      <Card.Img variant="top" src={props.imageName} className="topic-icon" />
      <Card.Body>
        <Card.Text>
          {props.text}
        </Card.Text>
        <Link to={link}><Button variant="primary">Go to thread</Button></Link>
      </Card.Body>
    </Card>
  )
}

export default Thread;