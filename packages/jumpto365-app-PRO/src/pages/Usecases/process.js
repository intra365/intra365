import React, { Component } from 'react';

import json from "format-json"
import _ from "lodash"
import util from "../../util"
import { UseCases } from '../../components/UseCase/usecase-components'
import "./usecases.css"
import fasttrack from '../../data/fasttrack'
import PeriodicTableofOffice365 from '../Beta/PeriodicTableofOffice365'
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import Cell from "../../components/PeriodicSystem/Cell"
import { Apps } from "../../components/Fasttrack"
import $ from "jquery"

export default class ProcessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        height:"100px"
    };

  }
  updateDimensions = () => {
    
    this.setState({width: $(window).width(), height: $(window).innerHeight()-40});
    

}
componentWillMount= () =>  {
    this.updateDimensions();
}



  render() {

    return (
        <div style={{ height: this.state.height,overflowY:"auto",overflowX:"hidden" }} >
            <div className="ms-font-xxl" style={{backgroundColor:"#36AA44",padding:"10px", color:"#ffffff",height:"60px",lineHeight:"60px"}}>
                Department Meeting
            </div>

<div style={{margin: "10px" }}>


            <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm12  " >
                <h2 className="ms-font-xl">
                    Prepare agenda
                </h2>
                <Apps apps="Word,OneNote" />
            </div>
            </div>
            <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm12  " >
                <h2 className="ms-font-xl">
                    Invite
                </h2>
                <Apps apps="Calendar,Microsoft Teams" />
            </div>
            </div>
            <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm12  " >
                <h2 className="ms-font-xl">
                    Manage Schedule
                </h2>
                <Apps apps="Calendar,Microsoft Teams" />
                </div>
            </div>
            <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm12  " >
                <h2 className="ms-font-xl">
                    Meet
                </h2>
                <Apps apps="Skype for Business,Microsoft Teams" />
                </div>
            </div>
            <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm12  " >
                <h2 className="ms-font-xl">
                    Write MoM
                </h2>
                <Apps apps="Word,OneNote" />
                </div>
            </div>

            <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm12  " >
                <h2 className="ms-font-xl">
                Send out MoM
                </h2>
                <Apps apps="Mail,Microsoft Teams" />
                </div>
            </div>
<div style={{height:"50px"}}/>
</div>        
</div>
    );
  }
}

