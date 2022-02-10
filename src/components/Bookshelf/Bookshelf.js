import React from "react";
import PropTypes from "prop-types";
import { Book } from "../Book/Book.js";

export const Bookshelf = (props) => {
  // Using the export of values in props
  const { title, moveBook, shelf } = props;
  // Filter the books that are related to the shelf
  const books = props.books.filter((e) => e.shelf === shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books ? (
            books.map((book) => (
              <Book key={book.id} book={book} moveBook={moveBook} />
            ))
          ) : (
            <li>No book</li>
          )}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  moveBook: PropTypes.func.isRequired,
};
