import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooksResult extends React.Component {


  /** @description Render method of the SearchBooksResult-Component, which is responsible
   *  to render all books which where found by the SearchBook-component.
   */
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
                      this.props.changeStatus(book, newStatus)
                    }}
                  />
                )
              })
            ) : ( /* No books found */
                this.props.searchQuery ? (
                  <div>
                    <p>Oops. We have no books for you search for '{this.props.searchQuery}'</p>
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
  searchQuery: PropTypes.string.isRequired
}

export default SearchBooksResult
