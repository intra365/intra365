import React from "react";
import Translate from "./translation"
class Key extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "new",
      language : this.props.language
    }
  }


  render() {
    
    return (
   
        <div className="boxwrapper">

<div className="boxcaptionborder">
            <div className="boxcaption">
              <div className="boxcaptionwrapper">{Translate(this.state.language,0)}</div>
            </div>
</div>
            <div className="box">
              <table className="boxcredit">
                <tbody>
                  <tr>
                    <td className="keyImageCell">
                      <img className="keyImage" alt="" src={require('./media/Share icon full - blue.png')}/>
          </td>
                    <td >
                    {Translate(this.state.language,1)}
          </td>

                  </tr>
                  <tr>
                  <td className="keyImageCell">
                  <img className="keyImage"  alt="" src={require('./media/Share icon half - blue.png')}/>          </td>
                    <td >
                    {Translate(this.state.language,2)}
          </td>

                  </tr>
                  <tr>
                  <td className="keyImageCell">
                  <img className="keyImage"  alt="" src={require('./media/Premium - key.png')}/>          </td>
                    <td >
                    {Translate(this.state.language,3)}
          </td>

                  </tr>
                  <tr>
                  <td className="keyImageCell">
                  <img className="keyImage"  alt="" src={require('./media/Brackets - key.png')}/>          </td>
                    <td >
                    {Translate(this.state.language,4)}
          </td>

                  </tr>
                </tbody>
              </table>

            </div>
          </div>



    );
  }
}

export default Key;
