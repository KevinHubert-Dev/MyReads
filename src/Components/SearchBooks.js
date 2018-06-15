import React from 'react'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import SearchBooksResult from './SearchBooksResult'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {

  state = {
    matchingBooks: [],
    searched: false,
    searchQuery: ''
  }

  /* 
   * 
   */
  queryChange = (value) => {
    this.setState({ searchQuery: value })
    this.searchChanged()
  }

  /* 
   * 
   */
  searchChanged = () => {
    this.setState({ searched: true })

    BooksAPI.search(this.state.searchQuery)
      .then(books => {

        this.mergeFoundAndShelfBooks(books);
        // this.setState({ matchingBooks: books })
      })
      .catch(err => {

      })
  }

  mergeFoundAndShelfBooks = (foundBooks) => {

    let result = foundBooks.map(foundBook => {
      let alreadyInShelfBook = this.props.booksInShelf.find(book => {
        console.log(foundBook.id + " - " + book.id + " - " + foundBook.title)
        return book.id === foundBook.id
      })
      foundBook.shelf = alreadyInShelfBook ? alreadyInShelfBook.shelf : 'none';

      return foundBook
    })
    this.setState({ matchingBooks: result })
  }

  /**
   * NOTES: The search from BooksAPI is limited to a particular set of search terms.
   * You can find these search terms here:
   * https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
   * However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
   * you don't find a specific author or title. Every search is limited by search terms.
   */
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
          searched={this.state.searched}
          searchQuery={this.state.searchQuery}
          changeStatus={this.props.changeStatus}
        />

      </div>
    )
  }
}



export default SearchBooks
