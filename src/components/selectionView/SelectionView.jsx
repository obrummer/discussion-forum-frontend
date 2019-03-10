import React from "react";
import Categories from "./Categories";
import ThreadContainer from "./ThreadContainer";
import ContentLoading from "./ContentLoading";
import AddThread from "./AddThread";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SelectionView.css";
import { getAllThreads } from "../../API/serviceClient";

export default class SelectionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "", uniqueCategories: "", allThreads: "", error: false };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    getAllThreads().then(
      res => {
        let uniques = getUniques(res.message);
        uniques.unshift({ id: "-1", category: "All Categories" });
        this.setState({ uniqueCategories: uniques, allThreads: res.message });
      },
      err => {
        this.setState({ error: true });
      }
    );
  }

  handleUpdate(newCategory) {
    this.setState({ category: newCategory });
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            {this.state.uniqueCategories ? <AddThread listContent={this.state.uniqueCategories} /> : <ContentLoading />}
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            {this.state.uniqueCategories ? (
              <Categories onClick={this.handleUpdate} listContent={this.state.uniqueCategories} />
            ) : (
              <ContentLoading />
            )}
          </Col>
          <Col lg={9}>
            {this.state.allThreads ? (
              <ThreadContainer threadList={this.state.allThreads} selectedCategory={this.state.category} />
            ) : (
              <ContentLoading />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

// helper
const getUniques = objects => {
  let uniques = [];
  for (let o of objects) {
    let found = false;
    for (let u of uniques) {
      if (u.category === o.category) {
        found = true;
        break;
      }
    }
    if (!found) {
      uniques.push(o);
    }
  }
  return uniques;
};
