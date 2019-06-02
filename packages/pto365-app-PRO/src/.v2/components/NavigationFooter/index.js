import React, { Component } from 'react';
import PropTypes from 'prop-types'
import "./footer.css"
import VersionId from '../Component';


/**
 * Describe overall purpose of the component
 *
 * @export
 * @class NavigationFooter
 * @extends {Component}
 */
export default class NavigationFooter extends Component { 

    static propTypes  = {
        about : PropTypes.string   // sample - remove or rename
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof NavigationFooter
     */
    render() {
        return (

            <div className="NavigationFooter">
                
            <div className="NavigationFooterContent ms-font-m"  >
            <div style={{float:"right"}}>

                Version <VersionId />
        </div>
       
  
            <div >
                Orginal Design ©2017-18&nbsp;
                <a href="https://twitter.com/thatmattwade" rel="noopener noreferrer" target="_blank">Matt Wade</a>&nbsp;&amp;&nbsp; 
                <a href="http://icansharepoint.com" rel="noopener noreferrer" target="_blank">icansharepoint.com</a>&nbsp; Web Development ©2017-18 &nbsp;
                <a href="https://twitter.com/niegrejoh" rel="noopener noreferrer" target="_blank">Niels Gregers Johansen</a> &nbsp;
                <a href="https://www.hexatown.com" rel="noopener noreferrer" target="_blank">hexatown.com</a>  &nbsp;
                </div>
        


        </div>
        </div>

        )
    }
}

