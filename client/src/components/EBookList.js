import React, { Component } from 'react';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
                    <Row>
                        {eBooks.map(({ id, title, description, img, author, date_added }) => (
                            <Col >
                                <Card>
                                    <CardImg top width="100%" src={imgSrc + img} alt={title} />
                                    <CardBody>
                                        <CardTitle>{title}</CardTitle>
                                        <CardSubtitle>{author}</CardSubtitle>
                                        {/* <CardText>{description}</CardText> */}
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    eBook: state.eBook
});

export default connect(mapStateToProps, { getEBooks })(EBookList);
