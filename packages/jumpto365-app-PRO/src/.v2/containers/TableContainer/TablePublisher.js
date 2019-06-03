import React, { Component } from "react";
import Wizard from "../../components/Wizard";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Jumpto365API = require("../../services/Jumpto365API");

var publisheddUrl = (domain, tag) => {
  return  encodeURI("https://pro.jumpto365.com/@/" + domain + "/" + tag);
};
export default class TablePublisher extends Component {
  state = {};
  dismiss = () => {
    if (this.props.onDismiss) this.props.onDismiss();
  };
  render() {
    return (
      <Wizard
        host={this}
        title="Table Publisher"
        area={this.props.tag}
        onDismiss={this.dismiss}
        steps={[
          {
            actionNextLabel: "Publish",
            onNext: (wizard) => {
              return new Promise((resolve, reject) => {
                wizard.setState({isPublishing:true})
                Jumpto365API.publishTableOfV2(
                  this.props.sourceDomain,
                  this.props.targetDomain,
                  this.props.tag
                )
                  .then((x) => {
                    
                    resolve();
                  })
                  .catch(error => {
                    wizard.setState({isPublishing:false})
                    reject(error)});
              });
            },
            body: (
              <div>
                 {!this.state.isPublishing &&
              <div
                xclassName="factory"
                style={{ margin: "30px", minHeight: "300px" }}
              >
                <h3>Once you're ready to share your Table with the world (or just a few people), click Publish.</h3>
              </div>}
          
             </div>
            )
          },
          {
            actionNextLabel: "Get link",
            onNext: (wizard) => {
              return new Promise((resolve, reject) => {
                wizard.setState({isPublishing:false})
                    resolve();
                 
              });
            },
            body: (
              <div>
                
          
             </div>
            )
          }, 
          {
            body: (
              <div style={{ margin: "auto" }}>
               
                <p>Here's the link to your table</p>
                <a
                  href={publisheddUrl(this.props.targetDomain, this.props.tag)}
                  target="_blank"
                >
                  {publisheddUrl(this.props.targetDomain, this.props.tag)}
                </a>
                <CopyToClipboard
                  text={publisheddUrl(this.props.targetDomain, this.props.tag)}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <span>
                    &nbsp;
                    <i
                      style={{ cursor: "pointer" }}
                      class="ms-Icon ms-Icon--Copy"
                      aria-hidden="true"
                    />
                  </span>
                </CopyToClipboard>

                {this.state.copied ? (
                  <span style={{ color: "red" }}>Copied.</span>
                ) : null}
              </div>
            )
          }
        ]}
      />
    );
  }
}
