import React, { Component } from 'react';
import PropTypes from 'prop-types'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class PageHeader
 * @extends {Component}
 */
export default class PageHeader extends Component {

    static propTypes  = {
        title : PropTypes.string,
        color : PropTypes.string,
        icon: PropTypes.string,
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof PageHeader
     */
    render() {
        var icon = this.props.icon ? <img src={this.props.icon} style={{marginTop:"8px", 
        textAlign: 'center', marginRight:"4px",height:"32px",width:"auto"}}/> : null
        return (
            <div id="pageheader" style={{marginBottom:"8px"}}>
<div  style={{ clear:"both", backgroundColor : this.props.color, marginLeft: '-8px',
                marginRight: '-8px'}}>
            <div className="ms-Grid" style={{
                
                lineHeight: '48px',
                
                height: '48px',
                color:"#ffffff",
               
                
            }}>
            <div className="ms-Grid-row" >
                <div className="ms-Grid-col ms-sm9 ms-fontSize-xxl ms-fontWeight-semilight" style={{marginLeft:"8px",maxHeight:"48px",overflow:"clip"}}>
                <span style={{display:"inline-block"}}>{icon}</span> <span  title={this.props.title} style={{display:"inline", maxHeight:"48px", verticalAlign:"top",width:"100%",    overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'inherit'}}> 
                
                {this.props.title}</span>
                </div>
                <div className="ms-Grid-col ms-sm2  " style={{textAlign:"right"}} >
                {this.props.children}
                </div>
            </div>
            
        </div>
        <div style={{ clear:"both"}} />

        </div>
</div>
        )
    }
}

