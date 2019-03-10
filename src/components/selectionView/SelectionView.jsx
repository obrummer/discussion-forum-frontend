import React from "react";
import Categories from "./Categories";
import ThreadContainer from "./ThreadContainer";
import ContentLoading from "./ContentLoading";
import AddThread from "./AddThread";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles/SelectionView.css";
import { getAllThreads, getAllCategories } from "../../API/serviceClient";

export default class SelectionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: -1, uniqueCategories: "", allThreads: "", error: false };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    getAllCategories().then(
      res => {
        res.message.unshift({ id: -1, name: "All Categories" });
        this.setState({ uniqueCategories: res.message });
      },
      err => {
        this.setState({ error: true });
      }
    );
    getAllThreads().then(
      res => {
        this.setState({ allThreads: res.message });
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
    if (!this.state.allThreads || !this.state.uniqueCategories) {
      return <ContentLoading />;
    }
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <AddThread listContent={this.state.uniqueCategories} />
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <Categories onClick={this.handleUpdate} listContent={this.state.uniqueCategories} />
          </Col>
          <Col lg={9}>
            <ThreadContainer threadList={this.state.allThreads} selectedCategory={this.state.category} />
          </Col>
        </Row>
      </Container>
    );
  }
}
