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
export default class UseCasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  onItemInvoked = (item) => {
    var details = _.findIndex(fasttrack.list, function (o) {
      return o.id === item.value
    })
    if (details > -1) {
      this.setState({ "case": fasttrack.list[details] })
      if (this.state.apps) {
        this.state.apps.setState({ apps: fasttrack.list[details].Featuring })
      }
    }
  }

  callback = (input) => {
    if (!input) return
    var featuring = this.state.case.Featuring
    console.log("callback from Apps ", featuring)
    this.setState({ apps: input })
  }
  render() {
    var links = _.sortBy(fasttrack.list, [function (o) { return o.Title; }]);
    var usecases = _.sortBy(fasttrack.list, [function (o) { return o.Title; }]);
    var usecase = <div className="ptousecase">
      <PeriodicTableofOffice365 language="en" />
    </div>
  usecase = null
    if (this.state.case) {
      usecase =
        <div style={{ "height": "70%", marginTop:"64px" }}>
              <h3>{this.state.case.Title}</h3>
              <div >
                <Apps  apps={this.state.case.Featuring} ref={this.callback} />
              </div>

            <p style={{ clear: "both" }}>
              {this.state.case.Details}
            </p>
            <p><a href={this.state.case.Link} target="_blank">FastTrack Productivity Library</a></p>
            <p><a href={this.state.case.Docs} target="_blank">Hexatown</a></p>
            {this.state.case.Category}
        </div>
    }
    return (
      <div style={{margin:"10px"}} >
        <h1 className="ms-font-xxl">
          Which tool when
       </h1>

        <div className="ms-Grid" >
          <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm6  " >

              <UseCases language="en" usecases={links} onItemInvoked={this.onItemInvoked} />
            </div>

            <div className="ms-Grid-col ms-sm6  "  >
              {usecase}
            </div>
          </div>






        </div>  </div>

    );
  }
}

