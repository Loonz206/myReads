import React from "react";
import PropTypes from "prop-types";
import { ShelfChanger } from "../ShelfChanger/ShelfChanger";

export const Book = (props) => {
  const { book, moveBook } = props;
  const thumbnail = book.imageLinks
    ? book.imageLinks.thumbnail
    : "http://via.placeholder.com/128x193?text=No%20Cover";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`,
            }}
          />
          <ShelfChanger book={book} moveBook={moveBook} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired,
};
