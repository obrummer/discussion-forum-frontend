import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddThreadForm from './AddThreadForm';

export default class AddThread extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <Button variant="secondary" size="lg" onClick={this.handleShow}>Add New Thread!</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Thread</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddThreadForm listContent={this.props.listContent} onFinish={this.handleClose}/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
