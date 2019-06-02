import React, { Component } from 'react';
import PropTypes from 'prop-types'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class PropertyList
 * @extends {Component}
 */
export default class PropertyList extends Component { 
    state = {} 

    static propTypes  = {
        title : PropTypes.string,
        properties : PropTypes.arrayOf(PropTypes.object).isRequired
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof PropertyList
     */
    render() {
    
        let list = !this.props.properties ? null : this.props.properties.map(function (property,ix){
            return <tr key={ix}>
            <td >{property[0]}</td>
            <td >{property[1]}</td>
            
            </tr>
        })
        
        return (
        <div>
            {list}
            
        </div>

        )
    }
}

