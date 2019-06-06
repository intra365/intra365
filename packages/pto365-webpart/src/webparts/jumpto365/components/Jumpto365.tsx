import * as React from "react";
import styles from "./Jumpto365.module.scss";
import { IJumpto365Props } from "./IJumpto365Props";
import { escape } from "@microsoft/sp-lodash-subset";
import {IJumpto365State} from "./IJumpto365State"
export default class Jumpto365 extends React.Component<IJumpto365Props, {}> {
  //private _handleResize: any;
  private boundsRef: any;
  constructor(props) {
    super(props);
    this.boundsRef = React.createRef();
    this.handleResize = this.handleResize.bind(this)
  }

  private handleResize = (): void => {
    if (!this.boundsRef) return
    var bounds :any = this.boundsRef.current

    this.setState({width:bounds.clientWidth})

  console.log(bounds.clientWidth)
  };
  public componentDidMount(): void {
  //  this._handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);
    setTimeout(this.handleResize, 500);
  }

  public componentWillUnmount() {
    // clean up listeners
    window.removeEventListener("resize", this.handleResize);
  }

  public render(): React.ReactElement<IJumpto365Props> {
    var tenant: string = this.props.tenant
      ? this.props.tenant
      : "jumpto365.com";
    var table: string = this.props.table ? this.props.table : "default";


  //  var calcedHeight : number = this.state.width * 3 / 3 
  var containerHeight :any = this.boundsRef && this.boundsRef.current && this.boundsRef.current.clientWidth ? (this.boundsRef.current.clientWidth *9 /16)-32 : 300
    var height: string = containerHeight// calcedHeight.toString()  // this.props.height ? this.props.height : "400";
    var ok: boolean = tenant && table ? true : false;
    var url: string = `https://pro.jumpto365.com/@/${tenant}/${table}`;

    if (table === "---") {
      debugger;
    }
    if (!ok) {
      return (
        <div>
          You need to select a tenant and table name - click "Edit webpart"
        </div>
      );
    }
    return (
      <div ref={this.boundsRef} style={{height}}>
     
        <iframe
          style={{ overflow: "hidden", borderStyle: "hidden" }}
          src={url}
          width="100%"
          height={height}
        />
        <a href={url} target="_blank">
          Full screen
        </a>
      </div>
    );
  }
}
