import axios from "axios"
import React, { Component } from 'react';
import PropTypes from 'prop-types'

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class Flow
 * @extends {Component}
 */
export default class Flow extends Component { 
    state = {} 

    static propTypes  = {
        url : PropTypes.string   // sample - remove or rename
    }
    

    constructor(props) {
        super(props);
    }

    xcomponentDidMount = () => {
        var that = this

        axios({method:"POST", url:this.props.url, headers : {
            "content-type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        } ,data:{
            token: localStorage.getItem("msal.idtoken"),
            name: "niels@hexatown.com"
        }})
        .then(function (response) {
            that.setState({html:response.data})
        })
        .catch(function (error) {
            that.setState({"error":error})
        });
       
    }

    // xcomponentDidMount = () => {
    //     var that = this
    //     fetch(this.props.url, {
    //         method: 'post',
    //         mode:"cors",
    //         // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  
    //         headers: {
    //             "content-type": "application/json; charset=utf-8",
    //             // "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //         body: JSON.stringify( {
    //             name: "niels@hexatown.com"
    //         })
    //     }).then(function (response) {
    //         if (response.status === 200){
    //             that.setState({"response":response.body})
    //     }else
    //     {
    //         that.setState({status:response.status})
    //     }
    //     })
    // }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof Flow
     */
    render() {
        //TODO: Implement ToBeRanemd
        return (
        <div dangerouslySetInnerHTML={{ __html: this.state.html }}>
            
        </div>

        )
    }
}

