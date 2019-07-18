import React, { Component, Fragment } from 'react';
import {
    Container, Row, Col, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEBooks, deleteEBook, updateEBook } from '../actions/eBookActions';
import PropTypes from 'prop-types';
import UpdateEBookModal from '../components/UpdateEBookModal';

export class EBookList extends Component {
    state = {
        ebook: {}
    }

    static propTypes = {
        getEBooks: PropTypes.func.isRequired,
        deleteEBook: PropTypes.func.isRequired,
        updateEBook: PropTypes.func.isRequired,
        eBook: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getEBooks();
    }

    deleteEBook = (id, img) => {
        this.props.deleteEBook(id, img);
    }

    updateEBook = (ebook) => {
        this.props.updateEBook(ebook);
    }

    render() {
        //get variable from initialState
        const { isAuthenticated, user } = this.props.auth;

        const { eBooks } = this.props.eBook;

        let imgSrc = '/images/';
        return (
            <div>
                <Container>
                    <Row>
                        {eBooks.map(({ id, title, description, img, author, price, date_added, user_id }) => (
                            <Col md="3" lg="3" sm="6" xs="6" key={id}>
                                <Card style={cardStyle}>
                                    <Link
                                        style={linkStyle}
                                        to={{
                                            pathname: '/ebook',
                                            search: `id=${id}`,
                                            state: {
                                                ebook: {
                                                    id, title, description, img, author, price, date_added, user_id
                                                }
                                            }
                                        }}
                                    >
                                        {!img || img.trim() !== 'noimage' ? (
                                            <CardImg top width="100%" src={imgSrc + img} alt={title} />
                                        ) : (
                                                <CardImg top width="100%" src={imgSrc + 'notfound.png'} alt={title} />
                                            )
                                        }
                                    </Link>
                                    <CardBody>
                                        <CardTitle><b>{title}</b></CardTitle>
                                        <CardSubtitle><small>{author}</small></CardSubtitle>
                                        {
                                            isAuthenticated ? (
                                                user.id === user_id ? (
                                                    <Fragment>
                                                        <Button color="danger" onClick={() => this.deleteEBook(id, img)}>Delete</Button>
                                                        <UpdateEBookModal
                                                            id={id}
                                                            title={title}
                                                            description={description}
                                                            img={img}
                                                            price={price}
                                                            author={author}
                                                        />
                                                    </Fragment>
                                                ) : (null)
                                            ) : (null)
                                        }
                                    </CardBody>
                                </Card><br />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

const linkStyle = {
    textDecoration: 'none',
    color: 'black'
}

const cardStyle = {
    // height: '100%'
}

const mapStateToProps = (state) => ({
    eBook: state.eBook,
    auth: state.auth
});

export default connect(mapStateToProps, { getEBooks, deleteEBook, updateEBook })(EBookList);
