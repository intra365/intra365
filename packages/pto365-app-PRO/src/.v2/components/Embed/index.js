import React from "react";
import Config from "../../../config"

import PropTypes from 'prop-types'


export default class Key extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "new",
      language : this.props.language ? this.props.language : "en"
    }
  }

  static propTypes  = {
    // set it focus should not be set, usefull when generating design guide so that this component does not pull is focus
    nofocus : PropTypes.bool   
}
  componentDidMount = () => {
    var id = "embedCode"
  //   if (!this.props.nofocus){
  //   document.getElementById(id).focus();
  //   document.getElementById(id).select();
  // }
  }

  render() {
    const code = '<center><iframe id="#periodictable" src="'+ Config.embedlink +this.state.language+'" style="overflow:hidden;border-style: hidden;" width="800" height="600"></iframe></center>'
    return (

              <textarea id="embedCode" style={{width:"100%",resize:"none"}} className="embedcode" defaultValue={code}></textarea>


          
    );
}
}

