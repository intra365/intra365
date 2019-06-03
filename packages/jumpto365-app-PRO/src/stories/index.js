import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';

import Feedback from '../components/Feedback';
import MattNiels from '../components/MattNiels';
import FlipSide from '../components/FlipSide';
//import ServiceDetails from '../components/ServiceDetails';
import About from '../components/About';
import { Button, Welcome } from '@storybook/react/demo';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
//import Cell from '../components/PeriodicSystem/Cell'
//import ServicePage from '../pages/Service'
import WhichToolWhenPanel from '../pages/WhichToolWhen/WhichToolWhenPanel'

import 'office-ui-fabric-react/dist/css/fabric.min.css'

const cell = {
    "id": "5:2",
    "type": "service",
    "title": "Teams",
    "about": "",
    "image": "Teams.png",
    "color": "#3f418e",
    "descriptor": "Discussions de groupe & discussion vidéo [Slack]",
    "subtitle": "",
    "ispremium": false,
    "link": "https://hexatown.github.io/docs/microsoft/office365/Teams",
    "linkLanguage": "en",
    "tags": [
      "chat",
      "communication"
    ],
    "shareable": "Partial"

}

const cellRTL = {
  "id": "5:2",
  "type": "service",
  "title": "Teams",
  "about": "",
  "image": "Teams.png",
  "color": "#3f418e",
  "descriptor": "צ'אט קבוצתי ווידאו צ'אט  [Slack]",
  "subtitle": "",
  "ispremium": false,
  "link": "https://hexatown.github.io/docs/microsoft/office365/Teams",
  "linkLanguage": "en",
  "tags": [
    "chat",
    "communication"
  ],
  "shareable": "Partial"

}

// storiesOf('Cell',module)
// .add('Core',withInfo (` Container`) (() => <Cell col={cell} onClick={action('clicked')}></Cell>))
// .add('Dimmed',withInfo (` Container`) (() => <Cell col={cell} dimmed="true" onClick={action('clicked')}></Cell>))
// .add('Not Dimmed',withInfo (` Container`) (() => <Cell col={cell} dimmed="false" onClick={action('clicked')}></Cell>))
// .add('RTL',withInfo (` Container`) (() => <Cell col={cellRTL} dimmed="false" rtl={true} onClick={action('clicked')}></Cell>))




// storiesOf('Feedback',module)
// .add('Dialogue',withInfo (` Container`) (() => <Feedback onClose={action('close')} onClick={action('clicked')}>Hello Button</Feedback>))
// .add('About',withInfo (` Container`) (() => <About onClose={action('close')}/>))

storiesOf('Flip side of Office 365',module)
.add('Core',withInfo (` Container`) (() => <FlipSide onClick={action('clicked')}>Hello Button</FlipSide>))

storiesOf('Components',module)
.add('Matt & Niels',withInfo (` Container`) (() => <MattNiels onClick={action('clicked')}>Hello Button</MattNiels>))
.add('Matt & Niels',withInfo (` Container`) (() => <WhichToolWhenPanel title="Teams"></WhichToolWhenPanel>))

const link = text("link","https://hexatown.github.io/docs/microsoft/office365/teams/")
const col = cell

// storiesOf('Service Details',module)
// .add('Ordinary',withInfo (` Container`) (() => <ServicePage location="teams" />))
