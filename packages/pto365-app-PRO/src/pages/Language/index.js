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
import Languages from "../../components/Sidebar/Languages"
import ProcessPage from '../../components/Process/ProcessPage'
export default class LanguagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        height:"100px"
    };

  }


  render() {

    return (
      <ProcessPage title="Languages" hideOptions>

            <Languages />
       </ProcessPage>
    );
  }
}

