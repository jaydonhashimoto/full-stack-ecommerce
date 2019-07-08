import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { addEBook } from '../actions/eBookActions';
import PropTypes from 'prop-types';

export class AddEBookModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            eBook: {}
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onChange = (e) => {
        this.setState({
            eBook: {
                ...this.state.eBook,
                [e.target.name]: e.target.value
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        //set date added
        let today = new Date();

        const newEBook = {
            title: this.state.eBook.title,
            description: this.state.eBook.description,
            author: this.state.eBook.author,
            price: this.state.eBook.price,
            date_added: today,
            img: null
        }

        this.props.addEBook(newEBook);
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Add eBook</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Add eBook</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" placeholder="eBook Title" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" placeholder="eBook Description" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="author">Author</Label>
                                <Input type="text" name="author" placeholder="Author" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="text" name="price" placeholder="00.00" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="img">Cover Image</Label>
                                <Input type="file" name="img" onChange={this.onChange} />
                            </FormGroup>
                            <Button color="primary">Add</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    eBook: state.eBook,
});

export default connect(mapStateToProps, { addEBook })(AddEBookModal);
