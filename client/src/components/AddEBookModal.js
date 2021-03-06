import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addEBook } from '../actions/eBookActions';
import { loadUser } from '../actions/authActions';
import FileForm from '../components/FileUpload/FileForm';
import PropTypes from 'prop-types';

export class AddEBookModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            eBook: {},
            imgName: ''
        };
        this.toggle = this.toggle.bind(this);
    }

    static propTypes = {
        loadUser: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.loadUser();
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    setImgName = (name) => {
        this.setState({ imgName: name });
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
            img: this.state.imgName,
            user_id: this.props.user.id
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
                        <FileForm setImgName={this.setImgName} />
                        <hr />
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" placeholder="eBook Title" minLength="2" maxLength="100" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" placeholder="eBook Description" minLength="2" maxLength="2000" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="author">Author</Label>
                                <Input type="text" name="author" placeholder="Author" minLength="2" maxLength="50" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="text" name="price" placeholder="00.00" minLength="1" maxLength="8" onChange={this.onChange} />
                            </FormGroup>
                            <hr />
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

export default connect(mapStateToProps, { addEBook, loadUser })(AddEBookModal);
