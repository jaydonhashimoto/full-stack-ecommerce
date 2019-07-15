import React, { Component } from 'react';
import {
    Container, Row, Col,
    Button,
} from 'reactstrap';

export class ViewEBook extends Component {
    state = {
        ebook: this.props.location.state.ebook,
    }
    render() {
        const { title, id, description, author, price, img, date_added } = this.state.ebook;
        const unformatedDate = new Date(date_added);
        const date = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(unformatedDate);
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            {!img || img.trim() !== 'noimage' ? (
                                <img style={imgStyle} src={"/images/" + img} />

                            ) : (
                                    <img width="100%" src={'/images/notfound.png'} alt={title} />
                                )
                            }
                        </Col>
                        <Col>
                            <div className="mx-auto text-center">
                                <h1>{title}</h1>
                                <small>By: {author}</small>
                                <p>Uploaded: {date}</p>
                                <Button color="primary">Purchase for {price}</Button>
                            </div>

                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <h4>Description</h4>
                            <p>{description}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const imgStyle = {
    width: '100%'
}

export default ViewEBook
