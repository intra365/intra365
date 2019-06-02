import React from "react";
import maps from "../../data/fasttrackmap.json"
import appdata from "../PeriodicSystem/office365periodictable.json"
import Cell from "../PeriodicSystem/Cell"
export class Apps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apps : this.props.apps,
      mini : (props.miniature !== null)
    }

  }


  render() {
    var cells = []
    if (this.state.apps){
      var tags = this.state.apps.toUpperCase().split(",")
      var apps = []

      tags.forEach(tag => {
        maps.data.forEach(map => {
          if (map.fasttrack.toUpperCase() === tag){
            apps.push(map)
          }
        });
      });

      apps.forEach(app => {
        appdata[0].data.forEach(row => {
          row.columns.forEach(column => {
              if (column.cellId && column.cellId === app.id)  {
                cells.push(<Cell {...this.props} col={column}/>)
              }
        });
      });
    });
    }    
    return (
   
        <div >
      {cells} 
      
          </div>



    );
  }
}


