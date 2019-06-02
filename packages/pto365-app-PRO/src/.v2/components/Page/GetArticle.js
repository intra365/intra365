import React, { Component } from "react";
import {
  DefaultButton,
  MessageBarButton,
  PrimaryButton
} from "office-ui-fabric-react";
import FileUpload from "../FileUpload";
import ArticleTemplates from "./ArticleTemplates";
import mammoth from "mammoth";
import MarkdownParser from "../../utilities/MarkdownParser";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import moment from "moment";
import Jumpto365Service from "../../services";
const Jumpto365API = require("../../services/Jumpto365API");
import "./page.css";
import MyEditor from "../Editor";
export default class GetArticle extends Component {
  get $associateTileWithUrl() {
    return this.props.associateTileWithUrl;
  }
  get $contentRef() {
    return this.props.contentRef;
  }
  get $keyName() {
    return this.props.keyName;
  }
  get $domain() {
    return this.props.domain;
  }
  get $registerEditor() {
    return this.props.registerEditor;
  }
  get $editable() {
    return this.props.editable;
  }

  get $onChange() {
    return this.props.onChange;
  }
  get $readOnly() {
    return this.props.readOnly;
  }
  get $tag() {
    return this.props.tag;
  }

  get $height(){
    return this.props.height
  } 

  onDrop = files => {
    this.setState({ files });
  };
  state = {};
  constructor(props) {
    super(props);
    this.myEditorRef = React.createRef();
  }
  _load = url => {
    if (!url) {
      return this.setState({
        document: null,
        hasDocument: false,
        noContent: true,
        hasLoaded: true,
        delta: null
      });
    }
    var jumpto365Service = new Jumpto365Service();
    var that = this;
    this.setState({
      hasDocument: false,
      document: null,
      hasLoaded: false,
      document: null,
      chooseContent: false,
      delta: null
    });

    jumpto365Service
      .getContent(url)
      .then(data => {
        console.log("loaded",data)
        //debugger
        if (_.endsWith(url, ".json")) {
          that.setState({
            delta: data,

            hasLoaded: true,
            showSaveMessage: false,
            hasDocument: true,
            noContent: false
          });
        } else {
          that.setState({
            document: data,
            // markdown: data,
            hasLoaded: true,
            showSaveMessage: false,
            hasDocument: true,
            noContent: false
          });
        }
      })
      .catch(error => {
        debugger;
        this.setState({ hasDocument: false, noContent: true, hasLoaded: true });
      });
  };

  associateTileWithUrl = url => {
    if (this.$associateTileWithUrl) {
      this.$associateTileWithUrl(this.$tag, this.$keyName, url).then(() => {
        this.setState({ showStatus: false });
      });
    }
  };
  componentDidMount() {
    this._load(this.$contentRef);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.contentRef !== this.$contentRef ||
      this.$keyName !== prevProps.keyName
    ) {
      this._load(this.$contentRef);
    }
  }
  save = (name, extention, payload) => {
    return new Promise((resolve, reject) => {
      var that = this;
      this.setState({
        showSaveMessage: false,
        showStatus: true,
        status: "Saving ..."
      });

      function getChar(s, p) {
        if (!s) return "-";
        if (p > s.length) return "-";
        var c = s.substring(p, p + 1);

        return c;
      }

      var s = this.$domain.split("@");

      var domain = s[1];
      var user = s[0];

      var blobName =
        getChar(domain, 0) +
        "/" +
        getChar(domain, 1) +
        "/" +
        getChar(domain, 2) +
        "/" +
        s[1] +
        "/";
      blobName += getChar(user, 0) + "/" + this.$domain + "/";
      blobName += moment().format("YYYY/MM");

      var fileName =
        name + "-" + moment().format("YYYYMMDD-HHmmss") + extention;

      Jumpto365API.blobSave(
        "-",
        "default",
        "articles",
        blobName,
        fileName,
        payload
      )
        .then(url => {
          this.associateTileWithUrl(url);
          resolve(url);
        })

        .catch(error => {
          that.setState({ showStatus: false, showError: true, error });
          reject(error);
        });
    });
  };
  render() {
    console.log("render",this.state.delta)
    return (
      <div>
        {this.state.showError && (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={() => {
              this.setState({ showError: false });
            }}
            dismissButtonAriaLabel="Close"
          >
            {this.state.error}
          </MessageBar>
        )}

        <div style={{ display: "flex" }}>
          <div style={{ minWidth: "100%" }}>
            <MyEditor
              delta={this.state.delta}
              //html={this.state.document ? this.state.document.body : null }
              registerEditor={this.$registerEditor}
              editable={this.$editable}
              onSave={this.save}
              onChange={this.$onChange}
              height={this.$height}
            />
          </div>
        </div>
      </div>
    );
  }
}
