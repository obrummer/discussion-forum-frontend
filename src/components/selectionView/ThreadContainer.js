import React from 'react'
import Container from 'react-bootstrap/Container';
import Thread from './Thread';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapCategoryToImg = (category) => {
  let imgName = '';
  switch (category) {
    case 'javascript':
      imgName = 'javascript_icon.png';
      break;
    case 'database':
      imgName = 'database_icon.png';
      break;
    case 'mongodb':
      imgName = 'mongodb_icon.png';
      break;
    case 'nodejs':
      imgName = 'nodejs_icon.png';
      break;
    case 'postgresql':
      imgName = 'postgres_icon.png';
      break;
    case 'reactjs':
      imgName = 'reactjs_icon.png';
      break;
    default:
      imgName = 'reactjs_icon.png';
      break;
  }
  return 'img/' + imgName;
}

const ThreadContainer = (props) => {
  let newList = [];
  if (props.selectedCategory) {
    newList = props.threadList
      .filter(thread => thread.category === props.selectedCategory)
      .map(thread => {
        return (
          <Col lg={6} key={thread.id}>
            <Thread
              text={thread.topic || 'no content'}
              thread_id={thread.id}
              imageName={mapCategoryToImg(thread.category)}>
            </Thread>
          </Col>);
      });
  } else {
    newList = props.threadList
      .map(thread => {
        return (
          <Col lg={6} key={thread.id}>
            <Thread
              text={thread.topic || 'no content'}
              thread_id={thread.id}
              imageName={mapCategoryToImg(thread.category)}>
            </Thread>
          </Col>);
      });
  }

  return (
    <Container>
      <Row>
        {newList}
      </Row>
    </Container>
  );
}

export default ThreadContainer;
