import React from 'react'

function Header(props) {

  /**
   * @description Render method of the Header-Component, which is responsible
   * to render the header of the webapplication.
   */
  return (
    <div className='list-books-title'>
      <h1>{props.title}</h1>
    </div>
  )
}

export default Header
