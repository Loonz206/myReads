import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';
import SearchPage from '../components/SearchPage/SearchPage';
import { BookList } from '../components/BookList/BookList';
import NotFound from '../components/NotFound/NotFound';
import './App.css';

class BooksApp extends Component {

  constructor(props){
    super();
    this.state = {
      //because we manage state for books that are being used we set state up in here
      //and according to the Babel transpiler we can do this instead of the constructor method
      books: []
    }
  }

  componentDidMount(){
    //calls the API in the background and populates the data via setState method to books
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    
    //deconstructing via ES6 so not needing to use this.state. .. etc
    const books = this.state.books;   

    return (
      <div className="app">
        <Switch>
          {/* Exact paths go to the BookList View aka "home view" */}
          <Route exact path="/" render={() => (
            <BookList books={books} moveBook={this.moveBook} />
          )}/>
          {/* If the user hits the Add Books button they are taken to a search view */}
          <Route path="/search" render={() => (
            <SearchPage books={books} moveBook={this.moveBook} />
          )}/>
          {/* All other views if the URL is malformed or doesn't have a route registered get NotFound Component */}
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

BooksApp.propTypes = {
  book: PropTypes.array.isRequired
}

export default BooksApp;
