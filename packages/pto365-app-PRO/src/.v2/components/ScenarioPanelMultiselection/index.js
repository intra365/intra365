import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import ScenarioPanelSingleSelection from '../ScenarioPanelSingleselection'
import './panel.css'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ToBeRenamed
 * @extends {Component}
 */
export default class ScenarioPanelMultiSelection extends Component {

    static propTypes  = {
        about : PropTypes.string,   // sample - remove or rename
        /**
         *Object [{subject: "Collect and analyze social media, web, and print o…", area: "Communication & Media + Sales", tools: Array(3), …}
         * 
         */
        scenarios : PropTypes.arrayOf(PropTypes.object).isRequired
    }
    
    onToolClick = (tool) => {

        console.log("Tool clicked in panel",tool)
    }

    constructor(props) {
        super(props);
    }
 
    /**
     * Required method return the output of the component 
     *
     * @returns
     * @memberof ScenarioPanelMultiSelection  
     */
    render() {
        let scenarios = this.props.scenarios
        var renderScenarios = []
        var renderScenariosDetails = []
        if (!scenarios) return null
            var ix = 0
            scenarios.forEach(scenario => {
                ix++
                renderScenarios.push(<div key={ix}>{scenario.subject} ({scenario.area})</div>)
                renderScenariosDetails.push(<ScenarioPanelSingleSelection key={ix} scenario={scenario} />)

            }
        )

            
  

        return (<div className="Panel">
         <div>
        <Pivot linkFormat={PivotLinkFormat.links} linkSize={PivotLinkSize.normal}>
          <PivotItem linkText="Selected scenarios">
            
            {renderScenarios}
          </PivotItem>
          <PivotItem linkText="Details">
            
            {renderScenariosDetails}
          </PivotItem>
          
          <PivotItem linkText="JSON">

            <textarea style={{width:"100%"}} rows="20">{JSON.stringify(scenarios)}</textarea>
          </PivotItem>
        </Pivot>
      </div>


            </div>

        )
    }
}

