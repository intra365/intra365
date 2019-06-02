import React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import SponsorDetails from '../SponsorDetails'
import Translate from "../Sidebar/translation"
import {
    TooltipHost
  } from 'office-ui-fabric-react/lib/Tooltip';
import { TooltipDelay, FocusTrapZone } from 'office-ui-fabric-react';
import Transition from 'react-transition-group/Transition';
import { isUndefined } from 'util';
import {Services} from "../../util"
import { RING,isAuthenticated,userName,userId } from '../Auth'
import { navigate } from "@reach/router"
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
  };
  
function html(title) {
    if (title) {
        return title ? title.replace("\\n", "<br/>").replace("\\n", "<br/>") : "";
    }
}

function nohtml(title) {
    if (title) {
        return title ? title.replace("\\n", " ") : "";
    }
}

class Cell extends React.Component {
    constructor(props) {
        super(props);
        

        this.state = {
          direction : props.rtl ? props.rtl ? "rtl" : "ltr":"ltr",
          showModal: false,
          in:true,
          language:props.language,  
          dimmed : !Services.isLicensed(props.col.key,props.license),
          serviceDetails : Services.get(props.col.key)
        };
        this._showModal =  this._showModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
      }
      _showModal() {
        if (this.props.col.image){

            if (this.props.col.key){
                if (this.props.onChangeService){
                    this.props.onChangeService(this.props.col.key)
                }

                var newPath = "/tool/"+this.props.col.key +  "/" + (this.state.language ? this.state.language : "en")
                navigate(newPath)
                //window.location = newPath
            }
            else
            {

            this.setState( { showModal: true });
        }
        };
        
      }
    
      _closeModal() {
        this.setState({ showModal: false });
      }
      _null(){
          return;
      }  

      PlayOnMouseOver = () => {
          this.setState({mouseOver : true})
      }

    render() {
        const col = this.props.col
        const title = html(col.title)
        const titleNoHtml = nohtml(col.title);
        
        const subtitle = col.subtitle ? col.subtitle : "";
        var description = html(col.descriptor)
        const descriptionNoHtml = nohtml(col.descriptor)
        const img = col.image ? require("./media/" + col.image) : ""
        
        const link = col.link ? col.link.toLowerCase() : "#"
        //const linkLanguage = col.link ? col.link.toLowerCase() : "#"
        const style = {
            backgroundColor: this.state.dimmed ? "#aaaaaa" : col.color,
            color: this.state.dimmed ? "#ffffff80" : "#ffffff",
            cursor: col.image ?  "pointer" : "default",
            height:"100%",
            width:"100%"
        }
        var  premiumMarkup = null;
        var sharingMarkup = null

        var premiumImage = col.ispremium ? require("./media/Premium.png") : null
        var textPremium = col.ispremium ? Translate(this.state.language,3):""

       
        var shareImage = null;
        var textShare = "";
        switch (col.shareable) {
            case "Partial":
                shareImage = require("./media/Share icon half.png")
                textShare = Translate(this.state.language,2)
                sharingMarkup = <img className="lCellShareableImage" title={textShare} alt={textShare} src={shareImage} />
                description += `<img class="lCellShareableImage" title="${textShare}" alt="${textShare}" src="${shareImage}" />`
                break;

            case "Yes":
                shareImage = require("./media/Share icon full.png")
                textShare = Translate(this.state.language,1)
                sharingMarkup = <img className="lCellShareableImage" title={textShare} alt={textShare} src={shareImage} />
                description += `<img class="lCellShareableImage" title="${textShare}" alt="${textShare}" src="${shareImage}" />`
                
                break;

            default:
                break;
        }

        if (col.ispremium){
            premiumMarkup =  <img className="lCellPremiumImage" title={textPremium} alt={textPremium} src={premiumImage} />
            description += `<img class="lCellPremiumImage" title="${textPremium}" alt="${textPremium}" src="${premiumImage}" />`
        }

        const iframeResizerOptions = { checkOrigin: true };
        
        var groupClasses = ""
        var hasTags = false
        if (col.tags){
        col.tags.forEach(tag => {
            hasTags = true
            groupClasses += ` Grouptag-${tag} `
        });
    }
        const hasTagsClassName = hasTags ? "CellWithTags" : ""
        var play = null
        if (RING(1) && this.state.serviceDetails && this.state.serviceDetails.play){
            if (!this.state.dimmed) {
              play = <div className="CellPlay" 
              ><a onClick={() => {return false}}  href={this.state.serviceDetails.play} target="_blank" style={{color:"#ffffff"}}
              onMouseOver={ this.PlayOnMouseOver}
              ><i class="ms-Icon ms-Icon--OpenInNewWindow" aria-hidden="true"></i></a></div>
            }
        }

        if (this.props.miniature){
            return    <div  className="CellMini"   style={{backgroundColor:  col.color,
            cursor: col.image ?  "pointer" : "default",
            float:"left",
            margin:"2px"}}  >
            <img className="CellMiniImage" src={img} alt="" />
            </div>
        }

        return (
            <Transition timeout={500} >
            {(status)=> (
                
            <div  className={`Cell fade fade-${status} ${this.state.dimmed}`}   style={{backgroundColor:"#ffffff"}} onClick={ this._showModal } >
                <div id={`cell${col.cellId}`} style={style } className={`${hasTagsClassName} ${groupClasses}`}>
                <div className="CellImageLayer">
                    <img className="CellImage" src={img} alt="" />
                </div>
                <div className="CellTextLayer">
                    <div className="CellTop">
                        <div className="CellTitle" style={{direction: this.state.direction,color:style.color }} dangerouslySetInnerHTML={{ __html: title }} >
                        </div>
                        <div className="CellSubTitle" style={{direction: this.state.direction,color:style.color}}>{subtitle}</div>
                        {play}
                    </div>
                    <div className="CellDescriptionBox">
                    <div className="CellDescription" style={{direction: this.state.direction,color:style.color}} dangerouslySetInnerHTML={{ __html: description }}>

                    </div>
                    
                    
                    </div>
                </div>
                <Modal
          isOpen={ this.state.showModal }
          onDismiss={ this._closeModal }
          isBlocking={ false }
          containerClassName='ms-modalExample-container InfoBox'
        >
         

    <SponsorDetails  src={link} image={this.props.col.image} color={this.props.col.color} title={this.props.col.title} options={{logEnabled:true,sizeWidth:true}}>
    </SponsorDetails >
             
             
                    
                    
            

            
        </Modal>

            </div></div>)}
            </Transition>
        
        )

    }
}



export default Cell