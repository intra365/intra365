import React, { Component } from 'react';
import PropTypes from "prop-types"
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardLogo,
  DocumentCardStatus,
  IDocumentCardPreviewProps,
  IDocumentCardLogoProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';


/**
 * Outlines info of the current selected case in the WTW table
 *
 * @export
 * @class CaseDetail
 * @extends {Component}
 */
export default class CaseDetail extends Component {
    /**
     * Properties
     *
     * @static
     * @memberof CaseDetail
     */
    static propTypes = {

      caseTitle: PropTypes.object.isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      tools : PropTypes.arrayOf.object,
      body : PropTypes.string,
      href : PropTypes.string,
      status : PropTypes.string,
      people : PropTypes.arrayOf.object,
      date : PropTypes.date,
      views : PropTypes.number
     }
    // componentDidMount = () =>{
    //   this.setState({match:   Data.WhichTool.toolByTag(this.props.tools,this.props.name)} )
    // }
  
    // onClick = () =>{
    //   if (!this.props.onClick) return
    //   this.props.onClick(this.state.match)
    // }
  render()
      {
      
        var preview = this.props.previewProps ? <DocumentCardPreview {...this.props.previewProps} /> : null
                         
        
  
        return (
  
            <div style={{margin:"10px"}}>
<h1 className="ms-font-xxl">{this.props.caseTitle}</h1>

{JSON.stringify(this.props.tools)}
               <DocumentCard onClickHref={this.props.href}>
               <div className="ms-ConversationTile-TitlePreviewArea">
               <DocumentCardTitle title={this.props.title} shouldTruncate={true} />
               <DocumentCardLogo {...this.props.logoProps} />
            {preview}
               
              
              <DocumentCardTitle
              title={this.props.subtitle} 
              shouldTruncate={true}
              showAsSecondaryTitle={true}
            />
            </div>
            <DocumentCardLocation
            location="Marketing Documents"
            locationHref="http://microsoft.com"
            ariaLabel="Location, Marketing Documents"
          />
            <DocumentCardStatus
            status={this.props.status}
            
            />
            <DocumentCardActivity
            activity={this.props.date}
            people={this.props.people}
          />  


              <DocumentCardActions
            actions={this.props.actions}
            views={this.props.views}
          />
  </DocumentCard>
            </div>
        )
  
  } 
  }