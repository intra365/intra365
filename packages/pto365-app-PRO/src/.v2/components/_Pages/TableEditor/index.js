import React, { Component } from "react";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import PageBody from "../../PageBody";
import "./tool.css";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import TableContainer from "../../../containers/TableContainer";
import { EditorExperienceContext } from "../../../logic/EditorExperience/EditorExperienceContext";

export default class TableEditorPage extends React.PureComponent {
  state = {};

  componentDidMount(){
    
    if (this.props.location && this.props.location.search){
      var search = this.props.location.search.replace("?","").split("=")
      var searchOptions = {}
      for (let index = 0; index < search.length-1; index+=2) {
        const element = search[index];
        searchOptions[element] = search[index+1];
      }
      this.setState({searchOptions})
    }
    
  }
  render() {

    return (
      <PageLayoutMain>
        <Customizer {...FluentCustomizations}>
          <EditorExperienceContext.Consumer>
            {editor => (
              <div>{editor.on && 
                <div style={{ marginLeft: "-8px", marginRight: "-8px" }}>
                  {this.state.commandBar}
                </div>
                }
                <PageBody
                  height={this.props.height - (editor.on ? 90:0)}
                  width={this.props.width}
                  nofooter
                >
                  <TableContainer
                    {...this.props}
                    showMenu={true}
                    context={this.props.context}
                    height={this.props.height - (editor.on ? 90:0)}
                    width={this.props.width-0}
                    domain={this.props.domain}
                    tag={this.props.tag}
                    interactMode={editor.on}
                    {...this.state.searchOptions}
                    registerCommandBar={(container, commandBar) => {
                      this.setState({ container, commandBar });
                      container.setState(commandBar)
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
