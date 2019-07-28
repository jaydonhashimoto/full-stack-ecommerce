import React, { Fragment, Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import UpdateEBookModal from '../components/UpdateEBookModal';

export class EBooks extends Component {
  state = {
    search: ''
  };
  deleteEBook = (id, img) => {
    this.props.deleteEBook(id, img);
  };

  updateEBook = ebook => {
    this.props.updateEBook(ebook);
  };

  filterSearch = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let imgSrc = '/images/';
    let filteredTitles = this.props.ebooks.filter(ebook => {
      return (
        //-1 === any value that is not available, else return found results
        ebook.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    const { isAuthenticated, user } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Input
                type="text"
                onChange={this.filterSearch}
                placeholder="Seach Titles"
                name="search"
                className="mb-3"
              />
            </Col>
          </Row>
          <Row>
            {filteredTitles.map(
              ({
                id,
                title,
                description,
                img,
                author,
                price,
                date_added,
                user_id
              }) => (
                <Col md="3" lg="3" sm="6" xs="6" key={id}>
                  <Card>
                    <Link
                      style={linkStyle}
                      to={{
                        pathname: '/ebook',
                        search: `id=${id}`,
                        state: {
                          ebook: {
                            id,
                            title,
                            description,
                            img,
                            author,
                            price,
                            date_added,
                            user_id
                          }
                        }
                      }}
                    >
                      {!img || img.trim() !== 'noimage' ? (
                        <CardImg
                          top
                          width="100%"
                          src={imgSrc + img}
                          alt={title}
                        />
                      ) : (
                        <CardImg
                          top
                          width="100%"
                          src={imgSrc + 'notfound.png'}
                          alt={title}
                        />
                      )}
                    </Link>
                    <CardBody>
                      <CardTitle>
                        <b>
                          <div className="home-title">{title}</div>
                        </b>
                      </CardTitle>
                      <CardSubtitle>
                        <small>{author}</small>
                      </CardSubtitle>
                      {isAuthenticated ? (
                        user.id === user_id ? (
                          <Fragment>
                            <Button
                              color="danger"
                              onClick={() => this.deleteEBook(id, img)}
                            >
                              Delete
                            </Button>
                            <UpdateEBookModal
                              id={id}
                              title={title}
                              description={description}
                              img={img}
                              price={price}
                              author={author}
                            />
                          </Fragment>
                        ) : null
                      ) : null}
                    </CardBody>
                  </Card>
                  <br />
                </Col>
              )
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

const linkStyle = {
  textDecoration: 'none',
  color: 'black'
};

export default EBooks;
