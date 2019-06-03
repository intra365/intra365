import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AppIconMini from '../AppIconMini'
import ReactPlacerHolder from 'react-placeholder'
import './toolcard.css'
import { DefaultButton } from '../../../../node_modules/office-ui-fabric-react';
import Jumpto365Service from '../../services'
import { Link } from "@reach/router"
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ToolCardLarge
 * @extends {Component}
 */

 
export default class ToolCardLarge extends Component { 

    static propTypes  = {
        about : PropTypes.string,
        color :   PropTypes.string.isRequired,
        name :   PropTypes.string.isRequired,
        iconUrl :   PropTypes.string.isRequired,
        description : PropTypes.string,
        onClick : PropTypes.func,
        onJump : PropTypes.func,
    }
    
    jumpto365Service = null
    constructor(props) {
        super(props)
        this.state = {ready:false,description:"..."};
    }

    componentDidMount = () => {
        this.jumpto365Service = new Jumpto365Service()
        this.jumpto365Service.getToolDocument(this.props.name).then(document => {
            this.setState({ready:true,title:document.title,description:document.properties && document.properties.inshort ? document.properties.inshort : "",
            hasDocument : !document.isEmpty})
        })
        .catch(err => {
            this.setState({ready: true,description:JSON.stringify(err)})
        })

    }

    onClick = (e) => {
        e.stopPropagation();
        if (this.props.onClick){
            this.props.onClick(this.props.name,this.state)
        }
    }
    
    onJump= (e) => {
        e.stopPropagation();
        if (this.props.onJump){
            this.props.onJump(this.props.name,this.state)
        }
    }
    //TODO: Dim out jump to if no function then implement the Jumpto button
    //TODO: Check scaling

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ToolCardLarge
     */
    render() {


        var description = this.state.hasDocument ?
        <div>
        <div> {this.state.description }</div>
        <a class="ToolCardReadmoreLink" onclick={this.onClick} href="#">Read more</a>
        </div>
        : "No description"
        
        return (
    // https://css-tricks.com/snippets/css/a-guide-to-flexbox/

              <div onClick={this.onClick} className="ToolCard" >
                <div className="ToolCardHeader" style={{ backgroundColor:this.props.color,color:"#ffffff"}}>
                    <div className="ToolCardIcon" >
                    
                            <AppIconMini  onClick={this.onClick}  backgroundColor={this.props.color} name={this.props.name} iconUrl={this.props.iconUrl} />
                    </div>
                    <div className="ToolCardTitle" style={{lineHeight:"48px"}}>
                        <div className="ms-fontSize-xl ms-fontWeight-semilight">
                            {this.state.title}
                        </div>
                    </div>
                          
                    
                   
                </div>
                <div className="ToolCardDetails" >
                    <div className="ms-font-m" >
                    <ReactPlacerHolder type='text' showLoadingAnimation  rows={3} ready={this.state.ready}>

                            {description}


                            </ReactPlacerHolder>

                            {/* <div className="ToolCardJump "  >
                    {this.state.onJump!== null &&
                        <DefaultButton primary={false} onClick={this.state.onJump} target="_blank"  text="Jumpto" />
                        }
                    </div> */}
                        </div>
  
            </div>
           

            
        </div>

        )
    }
}

