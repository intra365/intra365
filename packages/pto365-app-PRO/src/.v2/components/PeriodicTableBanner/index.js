import React, { Component } from 'react';
import PropTypes from 'prop-types'
import jumpto365Logo from '../../media/Logo horizontal color - transparent background.png'


/**
 * Describe overall purpose of the component
 *
 * @export
 * @class PeriodicTableBanner
 * @extends {Component}
 */
export default class PeriodicTableBanner extends Component { 


    static propTypes  = {
        text : PropTypes.string,
        subtitle :PropTypes.string,
        logo : PropTypes.string,
        width : PropTypes.number,
        height : PropTypes.number,
        image: PropTypes.string
    }
    

    constructor(props) {
        super(props);
        this.state = {}
        this.topText = React.createRef();
    }

    componentDidMount = () => {
        
        this.update()
        
    }

    update = () => {
        
        if (this.props.image){
            this.setState({
            dynamic:false})
        }else
        {
        this.setState({fontSizeTop : parseInt(this.props.bannerFontSize*2),
            fontSizeHalfTop : parseInt(this.props.bannerFontSize),
            text:this.props.text ? this.props.text : "Office 365",
        dynamic:false})
    }

    }
    componentDidUpdate = (previousProps, previousState) => {
        const node = this.topText.current;
        if ((previousProps.width !== this.props.width) || (previousProps.text !== this.props.text) || (previousProps !== this.props)  ){
            this.update()
        }
   

      }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof PeriodicTableBanner
     */
    render() {  
        var w = 675
        var h = 600
        var scale = this.props.width / w

        return (
            <div style={{transformOrigin:" 0 0 0 ",transform:`scale(${scale})`}}>

            {this.state.dynamic && 
            <div style={{display:"flex",
            
            flexWrap:"wrap", 
            color:"#264D8F", 
            alignItems:"center",
            justifyContent:"center", 
            border:"0px dashed red", width:w}}>
            <div style={{textAlign:"center", overflow:"hidden", 
            flexGrow:"none",flexShrink:"none",fontFamily: "'News Cycle', sans-serif",
            lineHeight:"80px",border:"0px dashed yellow",width:w, height:"78px"}}>
                <div ref={this.topText}>
                    <span style={{textTransform:"uppercase",fontSize:"40px"}} >the&nbsp;</span>
                    <span style={{textTransform:"uppercase",fontSize:"80px"}}>Periodic Table</span>
                    <span style={{textTransform:"uppercase",fontSize:"40px"}} >&nbsp;of</span>
                </div>            
            </div>
            <div style={{textAlign:"center", 
                        padding:"10px", 
                        lineHeight:`80px`, 
                        backgroundColor:"#264D8F",
                        color:"#ffffff",
                        flexGrow:"none",flexShrink:"none",
                        width:w,
                        fontSize:"80px"}}>
            {this.state.text}
            {this.props.subtitle && 
            <p style={{fontSize:"30px"}}>
                {this.props.subtitle}
            </p>}
            </div>
            </div>
            }
            {!this.state.dynamic && 
            <div style={{marginTop:"10px",width:"675px",height:"600",border:this.props.border ?this.props.border :  "1px solid #cccccc", overflow:"hide", 
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "#ffffff" ,
            color: this.props.textColor ? this.props.textColor  : "#000000"}} >
            
            <div style={{padding:"10px",textAlign:"center"}} className="ms-font-xl" >
             {this.props.bannerTeaser ? this.props.bannerTeaser : "Entrypoint to the modern workspace" } 
            </div>
            
             <div style={{textAlign:"center"}} >
            <img style={{ height:"auto", maxHeight:"120px",maxWidth:"675px"}} src={this.props.image ?this.props.image : "https://jumpto365.com/resources/images/app/Title-EN.png"}></img>
            
            </div>
           

                        
            <div style={{padding:"10px",textAlign:"center"}} className="ms-font-l" >
            <div>
            {this.props.zoneText ? this.props.zoneText : ""}
            </div>
            
            <div>
            
           
                {this.props.bannerByline ? this.props.bannerByline : "Table designed by Matt Wade, jumpto365, Inc. @thatmattwade"}
                
            </div>
            </div>
            </div>
            }
            {!this.props.hideOurLogo && false && 
            <div style={{textAlign:"center", width:w}} >
            <a href="https://medium.com/jumpto365/latest/home" target="_blank">
            <img src={ jumpto365Logo} style={{width:"auto",height:"48px",marginTop:"15px"}}/> </a>
            </div>
            }
            </div>
        )
    }
}

