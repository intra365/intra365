import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ServiceDetails from '../../../components/ServiceDetails';
/**
 * Details about the tool
 *
 * @export
 * @class ToolDetails
 * @extends {Component}
 */
export default class ToolDetails extends Component { 
    state = {} 

    static propTypes  = {
        toolData : PropTypes.object.isRequired
    }
    

    constructor(props) {
        super(props);

        this.state = {
            src : props.Content,
            key: props.name,
            title:props.name,
            color: props.color,
            PTO: props.name
        }
    }

    componentDidMount = () => {
        this.setState({body:""})
    }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ToolDetails
     */
    render() {
        
        return (
        <div>
            {JSON.stringify(this.state)}
{this.state.body}
            
        </div>

        )
    }
}

