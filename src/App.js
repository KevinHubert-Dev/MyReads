import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Components/Book'
import BookShelter from './Components/BookShelter'
import Header from './Components/Header'
import SearchBooks from './Components/SearchBooks'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books: books })
      })
  }

  changeBookStatus = (bookToChange, newStatus) => {
    /* Remove old book from shelf */
    this.setState({ books: this.state.books.filter(book => book !== bookToChange) })
    BooksAPI.update(bookToChange, newStatus)
      .then(book => {
        console.log(book);
      })

    /* Change book.shelf-property and add back again. */
    bookToChange.shelf = newStatus
    this.setState((currState) => ({ books: [...currState.books, bookToChange] }))


  }

  render() {

    let booksCurrRead = this.state.books.filter(book => book.shelf === "currentlyReading")
    let booksWantRead = this.state.books.filter(book => book.shelf === "wantToRead")
    let booksRead = this.state.books.filter(book => book.shelf === "read")

    return (
      <div className="app">

        <Route exact path='/search' component={() =>
          <SearchBooks changeStatus={this.changeBookStatus} />
        }
        />

        <Route exact path='/' render={() =>
          <div>
            <Header title='Kevin Hubert - Books' />
            <div className="list-books">
              <div className="list-books-content">
                <div>
                  <BookShelter
                    title='Books i read'
                    books={booksCurrRead}
                    changeStatus={this.changeBookStatus}
                  />
                  <BookShelter
                    title='Books i want to read'
                    books={booksWantRead}
                    changeStatus={this.changeBookStatus}
                  />
                  <BookShelter
                    title="Books i've read"
                    books={booksRead}
                    changeStatus={this.changeBookStatus}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to='/search' />
              </div>
            </div>
          </div>
        } />
      </div>
    )
  }
}



export default BooksApp
