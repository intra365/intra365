import React, { Component } from "react";
import TableContainer from "../../../containers/TableContainer";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import draftToMarkdown from "draftjs-to-markdown";
import { convertToRaw } from "draft-js";
import ReactJson from "react-json-view";
import MarkdownParser from "../../../utilities/MarkdownParser";
import { DefaultButton, TagItemBase } from "office-ui-fabric-react";
import { navigate } from "@reach/router/lib/history";
import GetArticle from "../GetArticle";
import "../webpart.css";
import Jumpto365Service from "../../../services";
import { isNull } from "util";
export default class WordDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = editorState => this.setState({ editorState });
  }
 
  get $registerLoader() {
    return this.props.registerLoader;
  }

  /**
   * ??
   */
  get $data() {
    return this.props.data;
  }

  get $hasData(){

    return this.props.data ? true : false
  }
  get $guide(){

    return this.props.guide
  }
  /**
   * ??
   */
  get $associateWebPartWithUrl() {
    return this.props.associateWebPartWithUrl;
  }
  /**
   * ??
   */
  get $contentRef() {
    return this.props.contentRef;
  }
  /**
   * ??
   */
  get $domain() {
    return this.props.domain;
  }
 
  get $editMode() {
    return this.props.editMode;
  }
  get $canEdit() {
    return this.props.canEdit;
  }
  /**
   * ??
   */
  get $tag() {
    return this.props.tag;
  }
  /**
   * Allowed height
   */
  get $height() {
    return this.props.height;
  }
  /**
   * Allowed width
   */
  get $width() {
    return this.props.width;
  }

  get $keyName(){
    return this.props.keyName
  }
  _load = data => {
    
    this.setState({hasLoaded:true})
    if (!data) return
    var jumpto365Service =  new Jumpto365Service()
    var that = this
    if (!data.json) return
    var item = JSON.parse(data.json)
    var url = item.url
    this.setState({ url,item });
    // this.setState({ isLoading : true, url,item });
    // jumpto365Service
    //   .getContent(url)
    //   .then(data => {
        
    //     that.setState({
    //       document:data,
    //      // markdown: data,
    //       showSaveMessage: false,
    //       hasDocument: true, noContent: false,
    //       isLoading : false
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({ hasDocument: false, noContent: true,isLoading
    //     :false });
    //   });
  };

  
  
  componentDidMount = () => {
    if (this.$registerLoader) {
      this.$registerLoader(this._load)
    }

    
  };

  

  render() {
   
    
    var width = this.$width;
    var height = this.$height;
    var bodyHeight = height ? `${height-60}px` : null
    var body = null
    
    if (this.$editMode) {
      body = this.state.body;
      var body2 = (
        <div>
          <Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
      );
    }

    if (this.state.hasLoaded) {

    
      body = (
        <div>
         
          <GetArticle
            {...this.props}
            canEdit={this.$canEdit}
            editMode={this.$editMode}
            associateWebPartWithUrl={this.$associateWebPartWithUrl}
            keyName={this.$keyName}
            domain={this.$domain}
            
            tag={this.$tag}
            contentRef={this.state.url}
            guide={this.$guide}
          />
        </div>
      );
    }

    var document = (
      <div
        className="documentOuter"
        style={{ height: bodyHeight, overflow: "auto" }}
      >
        {" "}
        <div className="webPartBodyContainer">
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.document ? this.state.document.body  :  null
            }}
          />
        </div>{" "}
      </div>
    );
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              flexGrow:1,
              border:this.$editMode ? "1px dashed #333333" :null,
              xbackgroundColor: this.$editMode ? "green" :null,
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: height ,
              height,
              minWidth: width
            }}
          >
            {body}
          
          </div>
        </div>
        
        {/* <textarea cols="80" rows="10" value={this.state.markdown} />
        <textarea cols="80" rows="10" value={JSON.stringify(this.state.html )} /> */}
        {/* <ReactJson
          collapsed={2}
          src={{ state: this.state, props: this.props }}
        /> */}
      </div>
    );
  }
}
