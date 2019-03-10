import React from "react";
import Container from "react-bootstrap/Container";
import Thread from "./Thread";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ThreadContainer = props => {
  let newList = [];
  if (props.selectedCategory !== -1) {
    newList = props.threadList
      .filter(thread => thread.category_id === props.selectedCategory)
      .map(thread => {
        return (
          <Col lg={6} key={thread.id}>
            <Thread
              text={thread.topic}
              thread_id={thread.id}
              imageName={mapCategoryToImg(thread.category_id)}
            />
          </Col>
        );
      });
  } else {
    newList = props.threadList.map(thread => {
      return (
        <Col lg={6} key={thread.id}>
          <Thread
            text={thread.topic}
            thread_id={thread.id}
            imageName={mapCategoryToImg(thread.category_id)}
          />
        </Col>
      );
    });
  }

  return (
    <Container>
      <Row> {newList} </Row>
    </Container>
  );
};

export default ThreadContainer;

// helper
const mapCategoryToImg = category => {
  let imgName = "";
  switch (category) {
    case 1:
      imgName = "js_icon.png";
      break;
    case 2:
      imgName = "mongodb_icon.png";
      break;
    case 3:
      imgName = "nodejs_icon.png";
      break;
    case 4:
      imgName = "postgres_icon.png";
      break;
    case 5:
      imgName = "react_icon.png";
      break;
    case 6:
      imgName = "ng_icon.png";
      break;
    case 7:
      imgName = "aws_icon.png";
      break;
    case 8:
      imgName = "cplusplus_icon.png";
      break;
    case 9:
      imgName = "java_icon.png";
      break;
    default:
      imgName = "database_icon.png";
      break;
  }
  return "images/" + imgName;
};
