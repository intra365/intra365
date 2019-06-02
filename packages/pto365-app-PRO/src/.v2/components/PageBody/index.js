import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Package from "../../../../package.json"
import $ from "jquery"
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class PageBody
 * @extends {Component}
 */
export default class PageBody extends Component {

    static propTypes  = {
        noscroll: PropTypes.string,
    }
    state = {}

    constructor(props) {
        super(props);
    }

    _resize = () => {
        var win = $(window);
        var height =document.documentElement.clientHeight-140; // win.height()-114;
        if (height!== this.state.height){
            this.setState({height})
        }
    
    }
 
    _onscroll = (e) => {
        //console.log("scroll",e)
    }
    componentDidMount = () => {
        this._resize()
        window.addEventListener("scroll", this._onscroll);
        window.addEventListener("resize", this._resize);
    }


    componentWillUnmount = () => {
        window.removeEventListener("scroll", this._onscroll);
        window.removeEventListener("resize", this._resize);
   
    }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof PageBody
     */
    render() {
        var height =  this.props.nofooter  ? this.props.height:this.state.height //this.props.height //? this.props.height : this.state.height
        var width = this.props.width ? this.props.width : "100%"
        
        return (<div>
          
            <div  style={{width,height:height,  overflowX:"hidden", overflowY:this.props.noscroll ? "hidden" : "auto"}}>

                {this.props.children}
                
</div>
{!this.props.nofooter &&
    <div style={{textAlign:"center",clear:"both",borderTop:"1px solid #cccccc",marginLeft:"-16px",marginRight:"-16px",marginTop:"8px",padding:"8px"}}>
   Copyright &copy;2017-2019 - jumpto365, Inc. - jumpto365.com&trade; - All rights reserved - <a href="https://jumpto365.com/eula/" target="_blank">Terms of Service and End User Licensing Agreement</a> version: {Package.version} {Package.subversion}
   </div>
   }</div>
        )
    }
}

