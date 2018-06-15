import React from 'react'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchBooksResult extends React.Component {



  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.props.books && this.props.books.length > 0 ? (
              this.props.books.map(book => {
                if (!book.imageLinks || !book.imageLinks.thumbnail)
                  book.imageLinks = { thumbnail: "http://via.placeholder.com/128x193" }
                return (
                  <Book
                    title={book.title}
                    authors={book.authors}
                    imageLinks={book.imageLinks.thumbnail}
                    status={book.shelf}
                    changeStatus={(newStatus) => {
                      console.log(book.title + " changed to " + newStatus)
                      this.props.changeStatus(book, newStatus)
                    }}
                  />
                )
              })
            ) : ( /* No books found */
                this.props.searched ? (
                  <div>
                    <p>Oops. We have no books for you search for '{this.props.searchQuery}'</p>
                    {/* <p>You could search for '{this.getRandomSearchSuggestion()}'</p> */}
                  </div>
                ) : (
                    <p>Search for books.</p>
                  )
              )
          }
        </ol>
      </div>
    )
  }
}

SearchBooksResult.propTypes = {
  books: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired
}

export default SearchBooksResult
