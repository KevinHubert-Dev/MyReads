import React from 'react'
import PropTypes from 'prop-types'
import MoveBook from './MoveBook'

class Book extends React.Component {

  /**
   * @description Render method of the Book-Component.
   */
  render() {
    let { title, authors, imageLinks, status, changeStatus } = this.props

    /* Set default values if not given */
    if (!title) title = 'Title not found'
    if (!authors) authors = ['No author found']
    if (!status) status = 'none'
    if (!imageLinks) imageLinks = 'http://via.placeholder.com/128x193'

    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url('${imageLinks}')`
            }}>
          </div>
          <MoveBook
            currStatus={status}
            changeStatus={changeStatus}
          />
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>{authors.join(', ')}</div>
      </div>
    )
  }

}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  imageLinks: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
}

export default Book
