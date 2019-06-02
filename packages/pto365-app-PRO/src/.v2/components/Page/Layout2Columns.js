import React, { Component } from "react";
import TableContainer from "../../containers/TableContainer";


import draftToMarkdown from "draftjs-to-markdown";
import { convertToRaw } from "draft-js";
import ReactJson from "react-json-view";
import MarkdownParser from "../../utilities/MarkdownParser";
import { DefaultButton, TagItemBase, PrimaryButton } from "office-ui-fabric-react";
import { navigate } from "@reach/router/lib/history";
import GetArticle from "./GetArticle";
import "./page.css";




export default class Layout2Columns extends Component {
  state = {}
  
  componentDidMount = () => {
     
    if (this.props.registerEditor) {
      this.props.registerEditor(this);
    }
  };


 
  render() {
    var isLandscape = this.props.width > this.props.height;

    var halfHeight = parseInt(this.props.height / 2);
    var thirdOfWidth = parseInt(this.props.width / 3);
    var width = this.props.width;
    var height = this.props.height;
    var landscapeHeight = (thirdOfWidth * 2) / 3;
    var landscapeWidth = thirdOfWidth;
    var portraitHeight = halfHeight;
    var portraitWidth = width;
    var domain = this.props.domain;
    var tag = this.props.tag;
   
    var tile = this.props.tile ? this.props.tile : {};

    



    
    var  body = (
        <div>
          <GetArticle
            readOnly={true}
            associateTileWithUrl={this.props.associateTileWithUrl}
            keyName={this.props.keyName}
            domain={this.props.domain}
            tag={this.props.tag}
            contentRef={this.props.contentRef}
          />
        </div>
      );
    
    var goFullScreen = this.props.onTableFullScreen ? (
      <center>
        <div style={{display:"flex",margin:"8px"}}>
        {this.props.jumpto &&
        <div style={{margin:"8px"}}>
         <PrimaryButton 
          split={false}
          style={{ marginBottom: "8px", marginTop: "8px" }}
          onClick={() => {
              window.open(this.props.jumpto,"_blank")
          }}
          text={`"Jump to" ${this.props.title}`}
        />
        </div>}
        <div style={{margin:"8px"}}>
                  <DefaultButton
          split={false}
          style={{ marginBottom: "8px", marginTop: "8px" }}
          onClick={() => {
            clearTimeout(this.timerRef);
            this.props.onTableFullScreen(domain, tag);
          }}
          text="Open Full-Size Table"
        />
        </div>
        </div>

      </center>
    ) : null;


    var relations= (this.props.relations ?  this.props.relations :[]).map((group,index)=>{return (
      <div>
       
  
      <div key={index}>
      <div className="GroupHeader" style={{margin:"16px",borderRadius:"0px", backgroundColor:group.color,padding:"8px",color:group.textColor}}>
      {group.title}
      </div>
      {group.members.map((tile,index)=>{return (
        <div style={{margin:"16px",display:"flex"}}>
        <div style={{minWidth:"48px",maxWidth:"48px",padding:"8px",minHeight:"48px",maxHeight:"48px", backgroundColor:tile.color}}>
          {tile.icon && 
          <img src={tile.icon} style={{width:"32px",height:"auto"}}></img>
          
          
          }
        </div>
        <div className={tile.isSelf?"RelatedTileSelected": "RelatedTile"} 
        
        
        style={{flexGrow:1,color: tile.isSelf?tile.textcolor : null,backgroundColor: tile.isSelf?tile.color : null}} 
        onClick={(e)=>{
          if ( this.props.onTileClicked){
            this.props.onTileClicked(this.props.tag, tile.id)
          }
        }}>
          <div className="ms-font-l">{tile.title}</div>
          <div>{tile.inShort}</div>
        </div>

          </div>)
      })}
      </div>
      </div>
      )
    })
    var document = (
      <div
        className="documentOuter"
        style={{ height: `${height}px`, overflow: "auto" }}
      >
        {" "}
        <div className="pageBodyContainer">
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.html ? this.state.html.body : null
            }}
          />
        </div>{" "}
      </div>
    );

    return (
      <div>
        {isLandscape && (
          <div style={{ display: "flex" }}>
            <div
              style={{
                xbackgroundColor: "green",
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: { height },
                minWidth: `${thirdOfWidth * 2}px`
              }}
            >
              {body}
              {document}
            </div>
            <div
              style={{
                borderLeft: "1px solid #dddddd",
                paddingLeft: "8px",
                minHeight: landscapeHeight,
                minWidth: landscapeWidth
              }}
            >
              <div style={{ border: "0px solid #dddddd" }}>
              {goFullScreen}
                <TableContainer
                   isRoot={this.props.isRoot}
                  registerTableContainer={this.props.registerTableContainer}
                  onTileClicked={this.props.onTileClicked}
                  context={this.props.context}
                  height={landscapeHeight}
                  width={landscapeWidth}
                  domain={domain}
                  tag={tag}
                />

               
              </div>
              <div className="ms-font-xl WebPartHeader">Groupings</div>

              {relations}
            </div>
          </div>
        )}
        {!isLandscape && (
          <div style={{ xbackgroundColor: "yellow" }}>
            <div style={{ minHeight: portraitHeight, minWidth: portraitWidth }}>
              <div style={{ border: "0px solid #dddddd" }}>
              {goFullScreen}
                <TableContainer
                   isRoot={this.props.isRoot}
                  registerTableContainer={this.props.registerTableContainer}
                  onTileClicked={this.props.onTileClicked}
                  context={this.props.context}
                  height={portraitHeight}
                  width={portraitWidth}
                  domain={domain}
                  tag={tag}
                />

               
              </div>
              
            </div>
            <div
              style={{
                xbackgroundColor: "green",
                overflowX: "auto",
                overflowY: "auto",
                maxWidth: width,
                maxHeight: halfHeight
              }}
            >
              {body}

              {document}
              <div className="ms-font-xl WebPartHeader">Groupings</div>
              {relations}
            </div>
          </div>
        )}
        {/* <textarea cols="80" rows="10" value={this.state.markdown} />
        <textarea cols="80" rows="10" value={JSON.stringify(this.state.html )} /> */}

        {/* <ReactJson
          collapsed={2}
          src={{ state: this.state, props: this.props }}
        />  */}
      </div>
    );
  }
}
