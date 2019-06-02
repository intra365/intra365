import React, { Component } from 'react';

import json from "format-json"
import _ from "lodash"
import util from "../../util"
import { UseCases } from '../../components/UseCase/usecase-components'
import fasttrack from '../../data/fasttrack'
import PeriodicTableofOffice365 from '../Beta/PeriodicTableofOffice365'
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import Cell from "../../components/PeriodicSystem/Cell"
import { Apps } from "../../components/Fasttrack"
import $ from "jquery"

export default class MsTeamsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        height:"100px"
    };

  }

  componentDidMount = () => {
      var teamsJS = "https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js"
      $.getScript( teamsJS, function( data, textStatus, jqxhr ) {
        console.log( data ); // Data returned
        console.log( textStatus ); // Success
        console.log( jqxhr.status ); // 200
        console.log( "Load was performed." );
        });
  }

  render() {

    return (
        <div style={{margin:"10px"}}>
            <h1>Teams</h1>
{JSON.stringify(this.state)}
</div>
    );
  }
}

