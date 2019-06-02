import React, { Component } from 'react';
import WhichToolWhenPanel from './WhichToolWhenPanel'
import CaseDetail from './CaseDetail'
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
export default class DebugWhichToolWhen extends Component {
  render(){

    var actions = [
      {
        iconProps: { iconName: 'Share' },
        onClick: (ev) => {
          console.log('You clicked the share action.');
          ev.preventDefault();
          ev.stopPropagation();
        },
        ariaLabel: 'share action'
      },
      {
        iconProps: { iconName: 'Pin' },
        onClick: (ev) => {
          console.log('You clicked the pin action.');
          ev.preventDefault();
          ev.stopPropagation();
        },
        ariaLabel: 'pin action'
      },
      {
        iconProps: { iconName: 'Ringer' },
        onClick: (ev) => {
          console.log('You clicked the ringer action.');
          ev.preventDefault();
          ev.stopPropagation();
        },
        ariaLabel: 'ringer action'
      }
    ]

    var people = [
      { name: 'Niels Gregers Johansen', profileImageSrc: '' },
      { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
      { name: 'Greta Lundberg', profileImageSrc: ''}
    ]


    var previewProps = {previewImages : [
      {
        name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
        url: 'http://bing.com',
        previewImageSrc: "https://image.freepik.com/free-vector/creative-yellow-corporate-annual-report-design_1201-1424.jpg",
        //iconSrc: TestImages.iconPpt,
        imageFit: ImageFit.cover,
        width: 318,
        height: 196
      }
    ]}
     return (<div><h1>DebugWhichToolWhen</h1>
     <WhichToolWhenPanel />
     <hr/>
     <CaseDetail 

     caseTitle="Conversation about anual report a very long long name, Title should be truncated on the long name."
     href="https://app.jumpto365.com"
     actions={actions}
     people={people}
     previewProps = {previewProps}
     title="Conversation about anual report a very long long name, Title should be truncated on the long name."
     subtitle="This is the email content preview, please feel free to give feedback. SharePoint Site Acitivity add conversation card! This is the last."
      views = "123" />

     </div>)   }
}