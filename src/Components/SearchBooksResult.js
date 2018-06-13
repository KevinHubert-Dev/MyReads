import React from 'react'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchBooksResult extends React.Component {


  getRandomSearchSuggestion = () => {
    const suggestionArr = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    return suggestionArr[Math.floor(Math.random() * (suggestionArr.length - 1))];
  }


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
                    changeStatus={(newStatus) => { this.props.changeStatus(book, newStatus) }}
                  />
                )
              })
            ) : ( /* No books found */
                this.props.searched ? (
                  <div>
                    <p>Oops. We have no books for you search for '{this.props.searchQuery}'</p>
                    <p>You could search for '{this.getRandomSearchSuggestion()}'</p>
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
