import React from "react";
import Translate from "./translation"
import Translators from "../../data/translators.json"
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import "../PeriodicSystem/periodicsystem.css"
class Credits extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "new",
      language : this.props.language
    }

  }


  render() {
    var credits = null;
    
    for (let index = 0; index < Translators.length; index++) {
      const translator = Translators[index];
      if (this.props.language === translator.language){
        
        credits = <tr>
        <td>
        {Translate(this.state.language,translator.promptId)}
      </td>
        <td className="bold">
        <a href={translator.link} rel="noopener noreferrer" target="_blank">{translator.author}</a>
        </td>

      </tr> 
      }
      
    }

    return (
   <div className="boxwrapper">
                 <div className="boxcaptionborder">

<div className="boxcaption">{Translate(this.state.language,6)}</div>
</div>
<div className="box">
  <table className="boxcredit">
    <tbody>
      <tr>
        <td>
        {Translate(this.state.language,7)}
</td>
        <td className="bold">
          <a href="https://twitter.com/thatmattwade" rel="noopener noreferrer" target="_blank">Matt Wade</a>
</td>

      </tr>
      <tr>
        <td>
        {Translate(this.state.language,8)}
        </td>
        <td className="bold">
        <a href="https://twitter.com/niegrejoh" rel="noopener noreferrer" target="_blank">Niels Gregers Johansen</a>
</td>
      </tr>
      <tr>
        <td>
          &nbsp;
</td>
        <td>
          &nbsp; </td>

      </tr>


{credits}

    </tbody>
  </table>
  <div style={{position:"relative",right:"16px",bottom:"7px",float:"right"}}>
  
  
</div>


</div>
</div>


);
}
}

export default Credits;
