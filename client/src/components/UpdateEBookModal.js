import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { updateEBook } from '../actions/eBookActions';
import FileForm from '../components/FileUpload/FileForm';
import PropTypes from 'prop-types';

export class UpdateEBookModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            eBook: {
                id: this.props.id,
                title: this.props.title,
                description: this.props.description,
                price: this.props.price,
                author: this.props.author,
                img: this.props.img
            },
            oldImgName: this.props.img,
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    setImgName = (name) => {
        this.setState({
            eBook: {
                ...this.state.eBook,
                img: name
            }
        });
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

        const updatedEBook = {
            id: this.state.eBook.id,
            title: this.state.eBook.title,
            description: this.state.eBook.description,
            author: this.state.eBook.author,
            price: this.state.eBook.price,
            img: this.state.eBook.img,
            oldImgName: this.state.oldImgName
        }
        this.props.updateEBook(updatedEBook);
        this.toggle();
    }

    render() {
        const { title, id, description, author, price, img } = this.state.eBook;
        return (
            <div>
                <Button color="warning" onClick={this.toggle}>Update eBook</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Update eBook</ModalHeader>
                    <ModalBody>
                        <small>Press Submit only if image is updated, then press Update</small>
                        <FileForm setImgName={this.setImgName} imgName={img} />
                        <hr />
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" placeholder="eBook Title" value={title} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" placeholder="eBook Description" value={description} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="author">Author</Label>
                                <Input type="text" name="author" placeholder="Author" value={author} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="text" name="price" placeholder="00.00" value={price} onChange={this.onChange} />
                            </FormGroup>
                            <hr />
                            <Button color="primary">Update</Button>{' '}
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

export default connect(mapStateToProps, { updateEBook })(UpdateEBookModal);
