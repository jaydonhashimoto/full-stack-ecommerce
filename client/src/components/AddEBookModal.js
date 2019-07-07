import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class AddEBookModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Add eBook</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Add eBook</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" placeholder="eBook Title" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" placeholder="eBook Description" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="author">Author</Label>
                                <Input type="text" name="author" placeholder="Author" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="text" name="price" placeholder="00.00" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="img">Cover Image</Label>
                                <Input type="file" name="img" />
                            </FormGroup>
                            <Button color="primary" onClick={this.toggle}>Add</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default AddEBookModal
