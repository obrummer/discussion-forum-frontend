import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DiscussionItem = props => {
  return (
    <Row>
      <Col lg={true}>
        <Card>
          <Card.Body>
            <Card.Title>{props.author}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">@{props.timestamp}</Card.Subtitle>
            <Card.Text>{props.content}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DiscussionItem;
