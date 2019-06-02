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
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType
} from "office-ui-fabric-react/lib/Shimmer";
import "./wireframe.css";

//Credit https://meyerweb.com/eric/thoughts/2017/11/27/generating-wireframe-boxes-with-css-and-html5/
const Jumpto365API = require("../../services/Jumpto365API");

class Loader extends Component {
  render() {
    return (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={{ display: "flex" }}
      >
        <ShimmerElementsGroup
          width={"90px"}
          shimmerElements={[
            { type: ShimmerElementType.line, height: 80, width: 80 },
            { type: ShimmerElementType.gap, width: 10, height: 80 }
          ]}
        />
        <div
          // tslint:disable-next-line:jsx-ban-props
          style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
        >
          <ShimmerElementsGroup
            shimmerElements={[
              { type: ShimmerElementType.circle, height: 40 },
              { type: ShimmerElementType.gap, width: 10, height: 40 }
            ]}
          />
          <ShimmerElementsGroup
            flexWrap={true}
            width={"calc(100% - 50px)"}
            shimmerElements={[
              {
                type: ShimmerElementType.line,
                width: "90%",
                height: 10
              },
              {
                type: ShimmerElementType.gap,
                width: "10%",
                height: 20
              },
              {
                type: ShimmerElementType.line,
                width: "100%",
                height: 10
              }
            ]}
          />
          <ShimmerElementsGroup
            flexWrap={true}
            width={"100%"}
            shimmerElements={[
              {
                type: ShimmerElementType.line,
                width: "80%",
                height: 10,
                verticalAlign: "bottom"
              },
              {
                type: ShimmerElementType.gap,
                width: "20%",
                height: 20
              },
              {
                type: ShimmerElementType.line,
                width: "40%",
                height: 10,
                verticalAlign: "bottom"
              },
              { type: ShimmerElementType.gap, width: "2%", height: 20 },
              {
                type: ShimmerElementType.line,
                width: "58%",
                height: 10,
                verticalAlign: "bottom"
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default class GetArticle extends Component {
  onDrop = files => {
    this.setState({ files });
  };
  state = {};

  /**
   * ??
   */
  get $contentRef() {
    return this.props.contentRef;
  }

  get $guide() {
    return this.props.guide;
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
  get $tag() {
    return this.props.tag;
  }
  /**
   * Key witin the $database
   */
  get $keyName() {
    return this.props.keyName;
  }

  get $mockupHeight() {
    return this.props.mockupHeight;
  }

  get $mockupWidth() {
    return this.props.mockupWidth;
  }

  get $mockupColor() {
    return this.props.mockupColor;
  }

  /**
   * ??
   */
  get $domain() {
    if (!this.props.domain) {
      throw "Domain not set";
    }
    return this.props.domain;
  }

  get $editMode() {
    return this.props.editMode;
  }

  _load = url => {
    //return
    var jumpto365Service = new Jumpto365Service();
    var that = this;
    this.setState({
      hasDocument: false,
      document: null,
      noContent: true,
      chooseContent: false
    });
    jumpto365Service
      .getContent(url)
      .then(data => {
        that.setState({
          document: data,
          // markdown: data,
          showSaveMessage: false,
          hasDocument: true,
          noContent: false
        });
      })
      .catch(error => {
        this.setState({ hasDocument: false, noContent: true });
      });
  };

  associateWebPartWithUrl = url => {
    if (this.$associateWebPartWithUrl) {
      this.$associateWebPartWithUrl(this.$tag, this.$keyName, url).then(() => {
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
  save = () => {
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
      this.state.name + "-" + moment().format("YYYYMMDD-HHmmss") + ".md";

    Jumpto365API.blobSave(
      "-",
      "default",
      "articles",
      blobName,
      fileName,
      this.state.markdown
    )
      .then(url => {
        this.associateWebPartWithUrl(url);
      })

      .catch(error => {
        that.setState({ showStatus: false, showError: true, error });
      });
  };
  render() {
    return (
      <div>
        {this.state.showSavedMessage && (
          <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={false}
            onDismiss={() => {
              this.setState({ showSavedMessage: false });
            }}
            dismissButtonAriaLabel="Close"
          >
            Document saved
          </MessageBar>
        )}
        {this.state.showSaveMessage && (
          <MessageBar
            messageBarType={MessageBarType.warning}
            isMultiline={false}
            onDismiss={() => {
              this.setState({ showSaveMessage: false });
            }}
            actions={
              <MessageBarButton
                onClick={() => {
                  this.save();
                }}
              >
                Save
              </MessageBarButton>
            }
            dismissButtonAriaLabel="Close"
          >
            Content has not been saved. Check that the content looks like you
            want it to, then click save.
          </MessageBar>
        )}
        {this.state.showStatus && (
          <MessageBar messageBarType={MessageBarType.info} isMultiline={false}>
            {this.state.status}
          </MessageBar>
        )}
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
          {this.state.document && (
            <div
              style={{}}
              dangerouslySetInnerHTML={{
                __html: this.state.document.body
              }}
            />
          )}
          {!this.state.hasDocument && this.state.doUpload && !this.state.name && (
            <div style={{ flexGrow: 1 }}>
              Drop a Word document into the grey area or click in the area to
              upload a file
              <div style={{ flexGrow: "1", backgroundColor: "grey" }}>
                <FileUpload
                  label="Upload"
                  onUpload={(data, file) => {
                    try {
                      switch (file.type) {
                        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                          var buf = Buffer.from(data, "base64");

                          var options = {
                            arrayBuffer: buf
                          };
                          var that = this;
                          mammoth
                            .convertToMarkdown(options)
                            .then(function(result) {
                              var document = MarkdownParser(result.value);
                              that.setState({
                                name: file.name,
                                size: file.size,
                                type: file.type,
                                lastModified: file.lastModified,
                                document,
                                markdown: result.value,
                                showSaveMessage: true
                              });
                            })
                            .catch(error => {
                              this.setState({
                                showError: true,
                                error: error.message
                              });
                            });

                          break;

                        default:
                          this.setState({
                            showError: true,
                            error: "File format is not supported"
                          });

                          break;
                      }
                    } catch (error) {
                      this.setState({ showError: true, error: error.message });
                    }
                  }}
                />
              </div>
            </div>
          )}

          {this.state.noContent && !this.state.doUpload && (
            <div
              style={{
                position: "relative",
                minHeight: this.$mockupHeight,
                minWidth: this.$mockupWidth,
                backgroundColor: this.$mockupColor
              }}
            >
              <div
                className="wireframe"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,

                  minHeight: this.$mockupHeight,
                  minWidth: this.$mockupWidth
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    textAlign: "center",
                    lineHeight: this.$mockupHeight,
                    width: this.$mockupWidth
                  }}
                >
                  {this.$guide}
                </div>
                <div style={{ position: "absolute", top: 0, left: 0 ,minWidth: this.$mockupWidth}}>
                  {this.$editMode && (
                    <MessageBar
                      messageBarType={MessageBarType.warning}
                      isMultiline={false}
                      onDismiss={() => {
                        this.setState({ noContent: false });
                      }}
                      actions={
                        <MessageBarButton
                          onClick={() => {
                            this.setState({
                              chooseContent: true,
                              noContent: false
                            });
                          }}
                        >
                          Add Content
                        </MessageBarButton>
                      }
                      dismissButtonAriaLabel="Close"
                    >
                      No content here
                    </MessageBar>
                  )}
                </div>
              </div>
            </div>
          )}

          {this.state.chooseContent &&
            !this.state.doUpload &&
            !this.state.hasDocument &&
            !this.state.name && (
              <div style={{ flexGrow: "1" }}>
                {!this.state.hideWordInfo && (
                  <MessageBar
                    messageBarType={MessageBarType.info}
                    isMultiline={false}
                    onDismiss={() => {
                      this.setState({ hideWordInfo: true });
                    }}
                    dismissButtonAriaLabel="Hide"
                  >
                    You can author your content in any tool which can produce a
                    Word document.
                  </MessageBar>
                )}

                {!this.state.doUpload && (
                  <div
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "32px",
                      marginBottom: "32px",
                      width: "200px"
                    }}
                  >
                    <PrimaryButton
                      onClick={() => {
                        this.setState({ doUpload: true });
                      }}
                      text="Upload Word document"
                    />
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    );
  }
}
