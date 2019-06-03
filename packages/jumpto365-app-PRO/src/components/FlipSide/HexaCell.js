import React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import ServiceDetails from '../ServiceDetails'
import { HexGrid, Layout, Hexagon, Text, Pattern,GridGenerator  } from 'react-hexgrid';
import "./flipside.css"
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


class HexaCell extends React.Component {
    constructor() {
        super();
        this.state = {
          showModal: false
        };
        this._showModal =  this._showModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
      }
      _showModal() {
        if (this.props.image){
            this.setState( { showModal: true });
        };
        
      }
    
      _closeModal() {
        this.setState({ showModal: false });
      }
      _null(){
          return;
      }  
    render() {
        const title = html(this.props.title)
        const titleNoHtml = nohtml(this.props.title);
        
        const subtitle = this.props.subtitle ? this.props.subtitle : "";
        const description = html(this.props.descriptor)
        const descriptionNoHtml = nohtml(this.props.descriptor)
        const img = this.props.image ? require("./media/" + this.props.image) : ""
        
        const link = this.props.link ? this.props.link.toLowerCase() : "#"
        //const linkLanguage = col.link ? col.link.toLowerCase() : "#"
        const style = {
            backgroundColor: this.props.color,
            cursor: this.props.image ?  "pointer" : "default"
        }

        var premiumImage = this.props.ispremium ? require("./media/Premium.png") : null
        var shareImage = null;
        switch (this.props.shareable) {
            case "Partial":
                shareImage = require("./media/Share icon half.png")
                
                break;

            case "Yes":
                shareImage = require("./media/Share icon full.png")
                
                break;

            default:
                break;
        }


        const iframeResizerOptions = { checkOrigin: true };
        const hexagons = GridGenerator.parallelogram(-2, 3, -2, 1);
        return (
            <div className="Cell" style={style} onClick={ this._showModal } >
            <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
               <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
       
                <Hexagon  q={-1} r={-1}  s={1}  fill="pat-1" onClick={this._showModal}>
                <Text>{this.props.title}</Text>
                <img src="http://lorempixel.com/100/100/cats/" /> 
                </Hexagon>
       </Layout>      
       </HexGrid>
                <Modal
          isOpen={ this.state.showModal }
          onDismiss={ this._closeModal }
          isBlocking={ false }
          containerClassName='ms-modalExample-container InfoBox'
        >
          <div className='ms-modalExample-header InfoProductTitle' style={style}>
          <img className="InfoProductImage" src={img} alt="" /> <span>{titleNoHtml}</span>
          </div>
          <div className='xInfoProductBody'>

             
             
                    
                    <div className="ms-Grid">
    <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
    
    
    </div>
    <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
        &nbsp;
        </div>
  </div>
  <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
    <ServiceDetails  src={link} options={{logEnabled:true,sizeWidth:true}}>
    </ServiceDetails >
    
    
    </div>

  </div>
</div>
            
            
            </div>

            
        </Modal>

            </div>
        
        )

    }
}



export default HexaCell