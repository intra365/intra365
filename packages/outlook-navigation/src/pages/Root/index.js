import React, { Component } from 'react'
import ping from "@intra365/models"
export default class Root extends Component {
   
    render() {
        var loaded = this.props.officeLoaded ? "true": "false"
        return (
            <div>
                Root {ping.hello} office loaded ? {loaded}
                <a href="https://www.dr.dk">dr.dk</a>
                <a href="https://jumpto365.com">jumpto</a>
            </div>
        )
    }
}
