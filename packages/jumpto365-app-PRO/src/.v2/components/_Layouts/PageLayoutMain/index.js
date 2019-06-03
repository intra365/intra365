import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Fabric } from 'office-ui-fabric-react';
import MastHead from '../../MastHead';
import NavigationTop from '../../NavigationTop';
import NavigationFooter from '../../NavigationFooter';
import NavigationLeft from '../../NavigationLeft';
import "../../NavigationLeft/nav.css"
import "./main.css"
import $ from "jquery"
import Jumpto365App from '../../_Contexts/Jumpto365App';
import { Subscribe } from 'react-contextual'
/**x2x
 * Describe overall purpose of the component
 *
 * @export
 * @class PageLayoutMain
 * @extends {Component}
 */
export default class PageLayoutMain extends Component { 

    static propTypes  = {
        nofooter : PropTypes.bool
    }
    

   
    /**
     * Main layout 
     *
     * @returns
     * @memberof PageLayoutMain     
     */
    render() {

        return (
            // <Subscribe>{context => (
            <div className="Appxx">
            
                <Fabric>{this.props.children}

                  
                
                </Fabric>
            </div>
            
        // )}
        //  </Subscribe>

        )
    }
}

