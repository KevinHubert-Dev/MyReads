import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './Components/BookShelf'
import Header from './Components/Header'
import SearchBooks from './Components/SearchBooks'

class BooksApp extends React.Component {

  state = {
    books: []
  }


  /**  @description Load currently saved Books from server.  
   */
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


  /** @description Updates the BookShelf in the state and at the serverside within the BooksAPI.  
   *  @param {object} bookToChange Book which shelf should get changed.  
   *  @param {string} newStatus New shelf for the book. Should be one of the following: 'currentlyReading', 'wantToRead', 'read' or 'none'.  
   */
  changeBookStatus = (bookToChange, newStatus) => {

    /* Remove old book from shelf */
    this.setState({ books: this.state.books.filter(book => book.id !== bookToChange.id) })

    /* Update shelf at serverside */
    BooksAPI.update(bookToChange, newStatus)
      .catch(err => {
        console.error(err)
      })

    /* Change book.shelf-property and add it. */
    bookToChange.shelf = newStatus
    this.setState((currState) => ({ books: [...currState.books, bookToChange] }))
  }


  /** @description Render method of the App-Component, which controls the routes
   *  and base components of the entire application. 
   */
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
