import React from 'react'
import PropTypes from 'prop-types'

class MoveBook extends React.Component {

  changeStatus = (status) => {
    this.props.changeStatus(status)
  }

  render() {

    return (
      <div className="book-shelf-changer">
        <select value={this.props.currStatus} onChange={(event) => { this.changeStatus(event.target.value) }}>
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
