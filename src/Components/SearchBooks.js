import React from 'react'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import SearchBooksResult from './SearchBooksResult'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {

  state = {
    matchingBooks: [],
    searchQuery: ''
  }

  /* 
   * 
   */
  queryChange = (value) => {
    this.setState({ searchQuery: value })
    if (value.length === 0) {
      this.setState({ matchingBooks: [] })
      return
    }

    BooksAPI.search(value)
      .then(books => {
        if (books.error && books.error === "empty query") {
          this.setState({ matchingBooks: [] })
        } else
          this.mergeFoundAndShelfBooks(books);
      })
      .catch(err => {
        console.error(err);
      })
  }

  mergeFoundAndShelfBooks = (foundBooks) => {

    let result = foundBooks.map(foundBook => {
      let alreadyInShelfBook = this.props.booksInShelf.find(book => {
         return book.id === foundBook.id
      })
      foundBook.shelf = alreadyInShelfBook ? alreadyInShelfBook.shelf : 'none';

      return foundBook
    })
    this.setState({ matchingBooks: result })
  }


  render() {
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/' />
          <div className="search-books-input-wrapper">
            <form>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.searchQuery}
                onChange={(event) => this.queryChange(event.target.value)}
              />
            </form>
          </div>
        </div>

        <SearchBooksResult
          books={this.state.matchingBooks}
          searchQuery={this.state.searchQuery}
          changeStatus={this.props.changeStatus}
        />

      </div>
    )
  }
}



export default SearchBooks
