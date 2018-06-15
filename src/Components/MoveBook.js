import React from 'react'
import PropTypes from 'prop-types'

class MoveBook extends React.Component {

  /** @description Calls the passed function when the shelf/status of a book gets changed.
   *  @param {string} status New shelf for the book. Can be one of the following: 'currentlyReading', 'wantToRead', 'read' or 'none'.  
   */
  changeStatus = (status) => {
    this.props.changeStatus(status)
  }

  /** @description Render method of the MoveBook-Component, which allows the user
   *  to move a book from one shelf to another within a dropdown menu. 
   */
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.currStatus} onChange={(event) => { event.preventDefault(); this.changeStatus(event.target.value) }}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }

}

MoveBook.propTypes = {
  changeStatus: PropTypes.func.isRequired
}

export default MoveBook
