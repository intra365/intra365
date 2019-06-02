import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Fabric } from 'office-ui-fabric-react';
import MastHead from '../../MastHead';
import NavigationTop from '../../NavigationTop';
import NavigationFooter from '../../NavigationFooter';
import NavigationLeft from '../../NavigationLeft';
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class PageLayoutFrontpage
 * @extends {Component}
 */
export default class PageLayoutFrontpage extends Component { 

    static propTypes  = {
        nofooter : PropTypes.bool
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Main layout 
     *
     * @returns
     * @memberof PageLayoutFrontpage
     */
    render() {

        return (

            <div className="Appxx">
                <Fabric>
                <div className="ms-Grid" >
 
                    <div className="ms-Grid-row" >
              
                        <div className="ms-Grid-col ms-sm12 ">
                            {this.props.children}
                        </div>
                    </div>
                    {!this.props.nofooter &&
                    <div className="ms-Grid-row" >
                       <NavigationFooter/>
                    </div>}
                    </div>

                </Fabric>
            </div>

        )
    }
}

