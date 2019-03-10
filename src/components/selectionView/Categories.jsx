import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import './styles/Categories.css';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category_id) {
    this.props.onClick(category_id);
  }
  render() {

    let listItems = this.props.listContent.map(item => {
      return (
        <ListGroup.Item variant="light" key={item.id} onClick={() => this.handleClick(item.id)}>{item.name}</ListGroup.Item>
      )
    })

    return (
      <Container className="topic-container">
        <Row>
          <Col>
            <ListGroup>
              {listItems}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}
