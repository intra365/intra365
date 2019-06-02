import React, { Component } from 'react'
import ping from "@intra365/models"
export default class Root extends Component {
    render() {
        return (
            <div>
                Root {ping.hello} office loaded ? {this.props.officeLoaded}
            </div>
        )
    }
}
