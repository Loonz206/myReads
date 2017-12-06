import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Bookshelf } from '../Bookshelf/Bookshelf';
import sortBy from 'sort-by';

export const BookList = props => {

    //ES6 Desconstructing props so I don't have to use that word
    const books = props.books;
    
    //Set up the shelves to map over with title, id and books to filter on
    const shelves = [
        {
            id: 'currentlyReading',
            title: 'Currently Reading',
            books: books.filter(book => book.shelf === 'currentlyReading')
        },
        {
            id: 'wantToRead',
            title: 'Want to Read',
            books: books.filter(book => book.shelf === 'wantToRead')
        },
        {
            id: 'read',
            title: 'Read',
            books: books.filter(book => book.shelf === 'read')
        }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* Repeat happens here for each Bookshelf, so we map over them */}
            {shelves.map(shelf => (
                <Bookshelf 
                    key={shelf.id} 
                    shelf={shelf.id} 
                    title={shelf.title} 
                    books={shelf.books.sort(sortBy('title'))} 
                    moveBook={props.moveBook} 
                />
                ))}
          </div>
        </div>
        <div className="open-search">
          {/* Takes user to the SearchPage view */}
          <Link to="/search">Add a book</Link>  
        </div>
      </div>
    )
}

BookList.propTypes = {
  moveBook: PropTypes.func.isRequired,
  shelves: PropTypes.array
}
