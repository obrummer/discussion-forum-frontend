import React, { Component } from "react";
import Categories from "./Categories";
import ThreadContainer from "./ThreadContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SelectionView.css";
import AddThread from "./AddThread";
import { getAllThreads } from "../../API/serviceClient";

export default class SelectionView extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "", uniqueCategories: "", allThreads: "" };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount() {
    try {
      let res = await getAllThreads();
      let uniques = [];
      for (let o of res.message) {
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
      uniques.unshift({ id: "-1", category: "All Categories" });
      this.setState({ uniqueCategories: uniques, allThreads: res.message });
    } catch (error) {
      console.error(error);
    }
  }

  handleUpdate(newCategory) {
    this.setState({ category: newCategory });
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            {" "}
            {this.state.uniqueCategories ? <AddThread listContent={this.state.uniqueCategories} /> : <p>loading..</p>}
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            {this.state.uniqueCategories ? (
              <Categories onClick={this.handleUpdate} listContent={this.state.uniqueCategories} />
            ) : (
              <p>loading..</p>
            )}
          </Col>
          <Col lg={9}>
            {this.state.allThreads ? (
              <ThreadContainer threadList={this.state.allThreads} selectedCategory={this.state.category} />
            ) : (
              <p>loading..</p>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
