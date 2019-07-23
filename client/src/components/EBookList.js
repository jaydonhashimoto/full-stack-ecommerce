import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEBooks, deleteEBook, updateEBook } from '../actions/eBookActions';
import Pagination from './Pagination';
import EBooks from './EBooks';
import PropTypes from 'prop-types';

export class EBookList extends Component {
  state = {
    ebook: {},
    currentPage: 1,
    itemsPerPage: 8
  };

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
  };

  updateEBook = ebook => {
    this.props.updateEBook(ebook);
  };

  render() {
    //get variable from initialState
    const { isAuthenticated, user } = this.props.auth;
    const { eBooks } = this.props.eBook;
    //paginate
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const currentItems = eBooks.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = pageNumber => this.setState({ currentPage: pageNumber });
    return (
      <div>
        <EBooks
          ebooks={currentItems}
          isAuthenticated={isAuthenticated}
          user={user}
          deleteEBook={this.deleteEBook}
          updateEBook={this.updateEBook}
        />
        <div>
          <Pagination
            itemsPerPage={this.state.itemsPerPage}
            totalItems={eBooks.length}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eBook: state.eBook,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEBooks, deleteEBook, updateEBook }
)(EBookList);
