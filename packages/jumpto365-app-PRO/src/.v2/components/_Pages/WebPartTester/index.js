import React, { Component } from "react";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import PageBody from "../../PageBody";
import "./tool.css";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import WebPartContainer from "../../../containers/WebPartContainer";
import { EditorExperienceContext } from "../../../logic/EditorExperience/EditorExperienceContext";
export default class WebPartTesterPage extends React.PureComponent {
  state = {};
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.keyName !== this.props.keyName) {
      this.setState({headerUpdated : false})
    
    }
  }

  componentDidMount(){
    this.setState({headerUpdated : false})
  }
  render() {
    return (
      <PageLayoutMain>
        <Customizer {...FluentCustomizations}>
          <EditorExperienceContext.Consumer>
            {editor => (
              <div>
                {" "}
                <div style={{ marginLeft: "-8px", marginRight: "-8px" }}>
                  {this.state.pageHeader}
                </div>
                {editor.on && (
                  <div style={{ marginLeft: "-8px", marginRight: "-8px" }}>
                    {this.state.commandBar}
                  </div>
                )}
                <PageBody
                  height={this.props.height - (editor.on ? 90 : 0)}
                  width={this.props.width}
                  nofooter
                >
                  <WebPartContainer
                    showHeader={(header) => {
                      
                      if (!this.state.headerUpdated){
                      this.setState({ header,headerUpdated:true });
                    }
                    }}
                    context={this.props.context}
                    height={this.props.height - (editor.on ? 90 : 0)}
                    width={this.props.width}
                    domain={this.props.domain}
                    tag={this.props.tag}
                    tileId={this.props.tileId}
                    database={this.props.database}
                    keyName={this.props.keyName}
                    interactMode={editor.on}
                    headerUpdated={this.state.headerUpdated}
                    setPageHeader={(pageHeader)=>{
                      this.setState({pageHeader})
                    }}
                    registerCommandBar={(container, commandBar) => {
                      this.setState({ container, commandBar });
                    }}
                  />
                </PageBody>
              </div>
            )}
          </EditorExperienceContext.Consumer>
        </Customizer>
      </PageLayoutMain>
    );
  }
}
