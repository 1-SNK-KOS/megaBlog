// import React from 'react'
import PropTypes from 'prop-types'

function Logo({width = "100px"}) {
  console.log("Logo Component")
  return (
    <div className={width}>Logo</div>
  )
}
Logo.propTypes = {
  width : PropTypes.string
}

export default Logo