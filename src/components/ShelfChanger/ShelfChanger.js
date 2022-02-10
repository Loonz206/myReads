import React from "react";
import PropTypes from "prop-types";

export const ShelfChanger = (props) => {
  const { book, moveBook } = props;

  let defaultValue;

  if (book.shelf) {
    defaultValue = book.self;
  } else {
    defaultValue = "none";
  }

  return (
    <div className="book-shelf-changer">
      <select
        value={defaultValue}
        onChange={(e) => moveBook(book, e.target.value)}
      >
        <option value="none">Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired,
};
