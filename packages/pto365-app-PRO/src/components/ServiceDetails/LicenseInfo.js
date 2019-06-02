import React from "react";

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from "lodash"

export default class LicenseInfo extends React.Component {
  static propTypes = {
    /** A Sticky can be active. */
    active: PropTypes.bool
  }
  state = {}

  handleContextRef = contextRef => this.setState({ contextRef })


  render() {
    const { contextRef } = this.state
    const {title,licenses} = this.props
    if (!licenses || licenses.length ===0){
      return null
    }
    return (
      <div>
      <h3 className="ms-font-l">{title}</h3>
      <ul>
        
      {licenses.map((name,index) => { return <li key={index}>{name}</li> })}
      </ul>
      </div>
    )

  }
}


