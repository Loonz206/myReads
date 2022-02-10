import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "../../utils/BooksAPI";
import { Book } from "../Book/Book";
import sortBy from "sort-by";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: [],
      query: "",
    };
  }

  updateQuery(query) {
    const cleanQuery = query.trim();

    this.setState({ query: cleanQuery });
    BooksAPI.search(cleanQuery).then((books) => {
      if (books && !books.error) {
        this.setState({ found: books });
      } else if (query.length === 0 || books.error) {
        this.setState({ found: [] });
      }
    });
  }

  getShelf(id) {
    let bookshelf;
    this.props.books.map((book) => {
      if (book.id === id) {
        bookshelf = book.shelf;
      }
      return book;
    });
    return bookshelf;
  }

  render() {
    const { found } = this.state;

    const booksFound = found.sort(sortBy("title"));

    booksFound.map((book) => {
      return this.getShelf(book.id) !== undefined
        ? (book.shelf = this.getShelf(book.id))
        : book;
    });

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              {/*
                                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                    You can find these search terms here:
                                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                    you don't find a specific author or title. Every search is limited by search terms.
                                */}
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {/* This repeats */}

              {booksFound.map((book, index) => (
                <Book
                  book={book}
                  key={book.id}
                  moveBook={this.props.moveBook}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default SearchPage;
