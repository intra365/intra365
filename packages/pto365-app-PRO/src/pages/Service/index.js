import React, { Component } from 'react';
import ServiceDetails from '../../components/ServiceDetails'
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import appdata from "../../components/PeriodicSystem/office365periodictable.json"
import PTO365STORE from "../../util/PTO365STORE"
import { EPROTOTYPE } from 'constants';

export default class ServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service : props.service,
      language : props.language
    };

  }
  
  changeService = (newService) => {
    this.setState({service:newService})
  }
  
  componentDidMount = () => {
    // if (PTO365STORE && PTO365STORE.service && PTO365STORE.service.service && this.state.service !== PTO365STORE.service.service){
    //   this.setState({service:  PTO365STORE.service.service})
    // }
  }  

  componentDidUpdate = () => {
    // if (PTO365STORE && PTO365STORE.service && PTO365STORE.service.service && this.state.service !== PTO365STORE.service.service){
    //   this.setState({service:  PTO365STORE.service.service})
    // }
    if (typeof window.scale === "function") { 
      window.scale()
    }
  }

  
  render() 
  {
    var cell = {
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

  appdata[0].data.forEach(row => {
    row.columns.forEach(column => {
        if (column.key && column.key === this.state.service)  {
          cell = column
        }
  });
});


    const col = cell
    const link = col.link ? col.link.toLowerCase() : "#"

    return (    
    <div>  
      
    <ServiceDetails  onChangeService={this.changeService} 
                     language={this.props.language}
                     src={link} 
                     color={col.color} 
                     title={col.title} 
                     image={col.image}  
                     appkey={col.key} 
                     options={{logEnabled:true,sizeWidth:true}}>
    </ServiceDetails >
    
    </div>
    )
  }
}
  
