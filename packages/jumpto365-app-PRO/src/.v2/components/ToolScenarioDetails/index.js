import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from "@reach/router"
import "react-placeholder/lib/reactPlaceholder.css";
import MarkdownParser from '../../utilities/MarkdownParser'
import GitHubService from '../../services/GitHub';
import Data from '../../data'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ToolScenarioDetails
 * @extends {Component}
 */
export default class ToolScenarioDetails extends Component { 
    state = {} 
    data = null
    git = null
    static propTypes  = {
        language : PropTypes.string,
        domain : PropTypes.string,
        area : PropTypes.string,
        name : PropTypes.string.isRequired,
        
    }
    

    constructor(props) {
        super(props);
    }


    _load = () => {
        var usecaseData = this.data.getUseCase(this.props.name)
        this.setState({ready:false})
        
        if (usecaseData && usecaseData.Content){
            var url = usecaseData.Content.toLowerCase()
            .replace("https://hexatown.github.io/docs/","https://raw.githubusercontent.com/Hexatown/docs/master/")
        
            var documentSourceUrl = usecaseData.Content.toLowerCase()
            .replace("https://hexatown.github.io/docs/","https://github.com/Hexatown/docs/blob/master/")
            

            this.setState({documentSourceUrl})
            this.git.get(url)
            .then(markdownContent=>{ 
                var document = MarkdownParser(markdownContent,usecaseData.Content)

                var title = document.properties.title ? document.properties.title : this.state.title
                this.setState({document,
                    body:document.body,
                    ready:true,
                    title})
            }
            )
            .catch(err=>{
            //    console.log("error getting",url,err)
            
            })

        }
        
        this.setState({
            usecaseData
        })
    }
    componentDidMount() {

        this.git = new GitHubService()
        this.data = new Data()
        this._load()
     
    }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ToolScenarioDetails
     */
    render() {

    
        
        return (
                <div>                        
                    <div className="ms-font-l">{this.state.title}</div>
                    <div style={{padding:"10px",maxHeight:"250px",overflowY:"auto",overflowX:"hidden"}}  className="ms-font-m" dangerouslySetInnerHTML={{ __html: this.state.body }}></div> 
                        <Link to={`/scenario/${this.props.domain}`} >
                        {this.props.domain}:{this.props.area} </Link>
                           

                </div>
        )
    }
}

