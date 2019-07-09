import React, { Component } from 'react';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEBooks } from '../actions/eBookActions';
import PropTypes from 'prop-types';

export class EBookList extends Component {
    static propTypes = {
        getEBooks: PropTypes.func.isRequired,
        eBook: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getEBooks();
    }

    render() {
        const { eBooks } = this.props.eBook;
        let imgSrc = '/images/';
        return (
            <div>
                <Container>
                    <Row className="mt-4 mb-4">
                        {eBooks.map(({ id, title, description, img, author, date_added }) => (
                            <Col md="3" lg="3">
                                <Link style={linkStyle} to='#'>
                                    <Card>
                                        {img !== null ? (
                                            <CardImg top width="100%" src={imgSrc + img} alt={title} />
                                        ) : (
                                                <CardImg top width="100%" src={imgSrc + 'notfound.png'} alt={title} />
                                            )
                                        }
                                        <CardBody>
                                            <CardTitle><b>{title}</b></CardTitle>
                                            <CardSubtitle><small>{author}</small></CardSubtitle>
                                            {/* <CardText>{description}</CardText> */}
                                        </CardBody>
                                    </Card>
                                </Link>
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

const mapStateToProps = (state) => ({
    eBook: state.eBook
});

export default connect(mapStateToProps, { getEBooks })(EBookList);
