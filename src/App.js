import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Components/Book'
import BookShelf from './Components/BookShelf'
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
      .catch(err => {
        this.setState({ books: [] })
        console.error(err);
      })
  }

  changeBookStatus = (bookToChange, newStatus) => {

    console.log(bookToChange.title + " changed to " + newStatus)
    /* Remove old book from shelf */
    this.setState({ books: this.state.books.filter(book => book.id !== bookToChange.id) })
    BooksAPI.update(bookToChange, newStatus)
      .then(book => {

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

        <Route exact path='/search' render={() =>
          <SearchBooks booksInShelf={this.state.books} changeStatus={this.changeBookStatus} />
        }
        />

        <Route exact path='/' render={() =>
          <div>
            <Header title='Kevin Hubert - Books' />
            <div className="list-books">
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title='Books I currently reading'
                    books={booksCurrRead}
                    changeStatus={this.changeBookStatus}
                  />
                  <BookShelf
                    title='Books I want to read'
                    books={booksWantRead}
                    changeStatus={this.changeBookStatus}
                  />
                  <BookShelf
                    title="Books I've read"
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
