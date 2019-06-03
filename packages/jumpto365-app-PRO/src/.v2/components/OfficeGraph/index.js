import axios from "axios"
import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import OfficeGraphService,{getWordMarkdown,getWordMarkdownCached, download2} from '../../services/OfficeGraph'
import GitHub from "../../services/GitHub"
import Handlebars from "handlebars"
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class OfficeGraph
 * @extends {Component}
 */
export default class OfficeGraph extends Component { 
    state = {} 

    static propTypes  = {
        url : PropTypes.string   
    }
    

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        var that = this
        let graph = new OfficeGraphService()
        var git = new GitHub()
        var url = "https://raw.githubusercontent.com/pto365/client/master/templates/" + this.props.template + "/index.html"
        var jsUrl =  "https://raw.githubusercontent.com/pto365/client/master/templates/" + this.props.template + "/index.js"
        var s = this.props.url.split("#")
        var isDebugging = (sessionStorage.getItem("isDebugging")==="true")
        this.setState({isDebugging})
            // https://developer.microsoft.com/en-us/graph/docs/concepts/permissions_reference
           //debugger
        var consent = this.props.consent ? [`https://graph.microsoft.com/${this.props.consent}`] : null
        
        git.get(jsUrl)
        .then(js=>{
            try {
                console.log("loaded js",js)
                var x = window.jumpto365eval(js)    
                console.log("eval =",x)
            } catch (evalError) {
                console.log("Eval error",evalError)
                this.setState({evalError})
            }
            
        })
        .catch(jsError=>this.setState({jsError}))

        graph.generic(this.props.url,consent)
        .then(data=>{
            this.setState({data})
            
            git.get(url).then(template=>{
                var temp = Handlebars.compile(template)
                var html = temp(data)
                this.setState({html})
            }).catch(error=>this.setState({error}))
    
        })
        .catch(error=>this.setState({error}))
       
    }

    
    render() {
        
        return (
            <div>
                {this.state.isDebugging &&
            <ReactJson src={{ state:this.state}} collapsed={2}/>  
        }
            <div  dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
            
            </div>
        )
    }
}

