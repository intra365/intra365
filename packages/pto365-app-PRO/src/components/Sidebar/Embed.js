import React from "react";
import Config from "../../config"
import Translate from "./translation"
import PropTypes from 'prop-types'


class Key extends React.Component {

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
    if (!this.props.nofocus){
    document.getElementById(id).focus();
    document.getElementById(id).select();
  }
  }

  render() {
    const code = '<center><iframe id="#periodictable" src="'+ Config.embedlink +this.state.language+'" style="overflow:hidden;border-style: hidden;" width="800" height="600"></iframe></center>'
    return (
      
            <div class="ms-Grid">
  <div class="ms-Grid-row">
  <div class="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div id="iframeLoader" className="ms-font-m" >
  
<p>The Periodic Table  of Office 365 can be embedded into other pages using the following embed code</p>
              <textarea id="embedCode" style={{width:"100%",resize:"none"}} className="embedcode" defaultValue={code}></textarea>

</div>
      </div>
    <div class="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
    <h2 className="ms-font-xl">Embedding in SharePoint Online?</h2>
    <p>Remember to check HTML Field Security settings</p>
<p>Specify whether contributors can insert external iframes in Embed web parts on pages in this site. Iframes are commonly used on Web pages to show dynamic content from other web sites, like directions from a mapping site, or a video from a video site. </p>

<p>When using the list of allowed domains, note that all subdomains of the allowed domains are automatically trusted. </p>

<p>These settings do not affect content placed in HTML Fields and Script Editor web parts. Users are permitted to insert iframes from default safe domains into HTML Fields and Script Editor web parts. </p>

<img src={require("./2018-02-26-20-02-43.png")} style={{height:"auto",width:"50%"}}/>
  </div>
</div>
      
 
           
          </div>

          
    );
}
}

export default Key;
