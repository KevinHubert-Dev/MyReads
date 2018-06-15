import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

  /**
   * @description Render method of the BookShelf-Component, which is responsible
   * to render all books which are assigned to the shelf.
   */
  render() {
    let { title, books, changeStatus } = this.props
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {
              books.map(book => {
                if (!book.imageLinks || !book.imageLinks.thumbnail)
                  book.imageLinks = { thumbnail: 'http://via.placeholder.com/128x193' }

                return (
                  <li key={book.id}>
                    <Book
                      title={book.title}
                      authors={book.authors}
                      imageLinks={book.imageLinks.thumbnail}
                      status={book.shelf}
                      changeStatus={(newStatus) => changeStatus(book, newStatus)}
                    />
                  </li >
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }

}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default BookShelf
