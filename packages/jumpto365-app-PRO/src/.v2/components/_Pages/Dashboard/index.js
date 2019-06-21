import React, { Component } from "react";
import PageHeader from "../../PageHeader";
import Jumpto365Service from "../../../services";
import { ProgressIndicator } from "office-ui-fabric-react/lib/ProgressIndicator";
import { Link, navigate } from "@reach/router";
import $ from "jquery";
import PageBody from "../../PageBody";
import WireFrame from "../../WireFrame";
import TableContainer from "../../../containers/TableContainer";
import MyTablesBrowser from "../../MyTablesBrowser";
import _ from "lodash";
import "./dashboard.css";
const Jumpto365API = require("../../../services/Jumpto365API");
class TableTemplate extends Component {
    state = {};
    get $title() {
      return this.props.title;
    }
    get $height() {
      return this.props.height;
    }
    get $width() {
      return this.props.width;
    }
  
    get $domain() {
      return this.props.domain;
    }
    get $tag() {
      return this.props.tag;
    }
    _onMouseOver = () => {
      this.setState({ mouseOver: true });
    };
  
    _onMouseOut = () => {
      this.setState({ mouseOver: false });
    };
    _onClick = () => {
        navigate(`/root/v2/${this.$tag}?saveas=1`)
    
    };
    render() {
      return (
        <div
          
          style={{
            position: "relative",
            width: this.$width,
            height: this.$height
          }}
          onMouseOver={this._onMouseOver}
          
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
           
            <TableContainer
              isRoot
              tag={this.$tag}
              title={this.props.title}
              height={this.$height}
              width={this.$width}
            />
          </div>
          {this.state.mouseOver && (
            <div
            className="ms-font-xxl"
            onMouseOut={this._onMouseOut}
            onClick={this._onClick}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                lineHeight: `${this.$height}px`,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#ffffffdd",
                width: this.$width,
                height: this.$height,
                color:"#000000"
              }}
            >
              Click to open
            </div>
          )}
        </div>
      );
    }
  }
class TableMiniature extends Component {
    state = {};
    get $title() {
      return this.props.title;
    }
    get $height() {
      return this.props.height;
    }
    get $width() {
      return this.props.width;
    }
  
    get $domain() {
      return this.props.domain;
    }
    get $tag() {
      return this.props.tag;
    }
    _onMouseOver = () => {
      this.setState({ mouseOver: true });
    };
  
    _onMouseOut = () => {
      this.setState({ mouseOver: false });
    };
    _onClick = () => {
        navigate(`/@/${this.$domain}/${this.$tag}`)
    
    };
    render() {
      return (
        <div
          
          style={{
            position: "relative",
            width: this.$width,
            height: this.$height
          }}
          onMouseOver={this._onMouseOver}
          
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
           
            <TableContainer
              domain={this.$domain}
              tag={this.$tag}
              title={this.props.title}
              height={this.$height}
              width={this.$width}
            />
          </div>
          {this.state.mouseOver && (
            <div
            className="ms-font-xxl"
            onMouseOut={this._onMouseOut}
            onClick={this._onClick}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                lineHeight: `${this.$height}px`,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#ffffffdd",
                width: this.$width,
                height: this.$height,
                color:"#000000"
              }}
            >
              Click to open
            </div>
          )}
        </div>
      );
    }
  }

export default class DashboardPage extends React.PureComponent {
  state = {};
  get $title() {
    return this.props.title;
  }
  get $height() {
    return this.props.height - 30;
  }
  get $width() {
    return this.props.width - 30;
  }

  _loadMyTables = ()=>{
    const TABLENAME = "Table";
    var context = this.props.context ? this.props.context : { me: {} };
    var upn = context.me.upn;
    Jumpto365API.itemTablesForUpn(upn, TABLENAME).then(tables => {
      var myTables = _.sortBy(tables.result, item => {
        return -item.genericId;
      });
      this.setState({
        myTables,
        loaded: true,
        currentTableKey: null,
        currentItem: null
      });
    });
  }


  _loadSupportArticles = ()=>{
    
    Jumpto365API.getSupportArticles().then(supportArticles => {
     
      this.setState({
        supportArticles
       
      });
    });
  }
  _loadBlogArticles = ()=>{
    
    Jumpto365API.getBlogArticles().then(blogArticles => {
     
      this.setState({
        blogArticles
       
      });
    });
  }
  componentDidMount() {
    
    if (!this.props.context.me) return
   this._loadMyTables()
   this._loadSupportArticles()
   this._loadBlogArticles()
  }
  render() {

    if (!this.props.context.me){
      return (
      <div>You need to sign in to get access </div>
      )
    }
    var context = this.props.context ? this.props.context : { me: {} };
    var upn = context.me.upn;
  
    var userSettings =
    context && context.me && context.me.JSON
      ? JSON.parse(context.me.JSON)
      : {};


      if (!userSettings.canEdit){
        return (
          <div>You need an active license to get access to the Dashboard</div>
          )
      }
    var tag1 =
      this.state.myTables && this.state.myTables.length > 0
        ? this.state.myTables[0].TableKey
        : null;
    var tag2 =
      this.state.myTables && this.state.myTables.length > 1
        ? this.state.myTables[1].TableKey
        : null;
    var tag3 =
      this.state.myTables && this.state.myTables.length > 2
        ? this.state.myTables[2].TableKey
        : null;
var supportArticles = this.state.supportArticles? this.state.supportArticles : []
var blogArticles = this.state.blogArticles? this.state.blogArticles : []


    return (
      <div>
        <PageHeader title="Dashboard" color="#2a7ab9" />

        <PageBody>
          <div>
            <div style={{ display: "flex", margin: "16px" }}>
              <div style={{ flexGrow: 2 }}>
                <div className="ms-font-xl WebPartHeader">Last edited </div>
                <div style={{ display: "flex", margin: "16px" }}>
                
                  <div style={{ minWidth:this.$width / 3.75, maxWidth:this.$width / 3.75}} className="MyTablesMiniature"> 
                  <div className="MyTablesHeader">{tag1}</div>
                    <TableMiniature
                      domain={upn}
                      tag={tag1}
                      title="Table 1"
                      height={((this.$width / 3.75) * 3) / 4 }
                      width={this.$width / 3.75}
                    />
                  </div>
                  <div style={{ minWidth:this.$width / 3.8, maxWidth:this.$width / 3.8 }} className="MyTablesMiniature" >
                  <div className="MyTablesHeader">{tag2}</div> 
                    <TableMiniature
                      domain={upn}
                      tag={tag2}
                      title="Table 2"
                      height={((this.$width / 3.8) * 3) / 4}
                      width={this.$width / 3.8}
                    />
                  </div>
                </div>
                <div className="ms-font-xl WebPartHeader">All Tables </div>
                <div style={{ display: "flex", margin: "16px" }}>
                  
                  <div style={{ minWidth:this.$width / 1.9 +20, maxWidth:this.$width / 1.9 +20 }} className="MyTablesMiniature">
                   
                    <MyTablesBrowser
                      context={context}
                      upn={upn}
                      height={this.$height /4 }
                      width={this.$width / 1.9+16}
                    />
                  </div>
                </div>
                <div className="ms-font-xl WebPartHeader">
                  Starter Templates
                </div>
                <div style={{ display: "flex", margin: "16px" }}>
                  <div style={{ minWidth:this.$width / 5.75, maxWidth:this.$width / 5.75 }} className="MyTablesMiniature">
                    <TableTemplate
                      isRoot
                      tag="office365v2"
                      style={{ margin: "16px" }}
                      title="Table 1"
                      height={((this.$width / 6) * 3) / 4}
                      width={this.$width / 6}
                    />
                  </div>
                  <div style={{ minWidth:this.$width / 5.75, maxWidth:this.$width / 5.75 }} className="MyTablesMiniature">
                    <TableTemplate
                      isRoot
                      tag="ems"
                      style={{ margin: "16px" }}
                      title="Table 2"
                      height={((this.$width / 6) * 3) / 4}
                      width={this.$width / 6}
                    />
                  </div>
                  <div style={{ minWidth:this.$width / 5.75, maxWidth:this.$width / 5.75 }}  className="MyTablesMiniature">
                    <TableTemplate 
                      isRoot
                      tag="digitalworkplace"
                      style={{ margin: "16px" }}
                      title="Table 3"
                      height={((this.$width / 6) * 3) / 4}
                      width={this.$width / 6}
                    />
                  </div>
                </div>
              
              </div>
              <div style={{ flexGrow: 1 }}>
              <div className="ms-font-xl WebPartHeader">Latest News</div>
                <div className="BlogNewsContainer">
                {blogArticles.map((article,key)=>{
                    if (key > 3 )return
                    return (<div key={key} className="BlogNewsItem">
                        <div>{article.title}</div>
                        <div><a target="_blank" href={article.link}>Read</a></div>
                        
                        </div>)

                })}
                </div>
                <div className="ms-font-xl WebPartHeader">Latest from Support </div>
                <div className="SupportNewsContainer">
                {supportArticles.map((article,key)=>{
                     if (key > 5 )return
                    return (<div key={key} className="SupportNewsItem">
                        <div>{article.title}</div>
                        <div><a target="_blank" href={article.html_url}>Read</a></div>
                        </div>)

                })}
                </div>
                <div style={{ margin: "16px" ,position:"fixed",right:"0px",top:"90px"}} >
                <a target="_blank" 
                title="Site monitoring by Uptime.com" 
                href="https://uptime.com/s/overview" 
                style={{display: "inline-block", width: "140px",height: "60px",overflow: "hidden"}}>
                <img src="https://uptime.com/devices/services/widget/615/fd0322af911607e6/statuspage?light" width="140" height="60" 
                alt="Site monitoring by Uptime.com" style={{display: "inline",width: "140px" ,height: "60px", margin: "0px", padding: "0px", border: "0px"}} /></a>
              </div>
                <div className="ms-font-xl WebPartHeader">Getting Started</div>
                <div style={{ margin: "16px" }} >
                <a target="_blank" href="https://jumpto365.zendesk.com/hc/en-us/sections/360003870492-Editing-and-Creating-Tables">Written how-to guides</a>
                
                </div>
                <div style={{ margin: "16px" }} >
                <a target="_blank" href="http://jum.to/YouTube">Video guides</a>
                
                </div>
{/*                 
                <iframe  style={{ margin: "16px" }} width={this.$width / 3.2} height={this.$width / 3.2 * 3 / 4} src="https://www.youtube.com/embed/OIvcVgOIG0s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;fullscreen" allowfullscreen></iframe>
                <div className="ms-font-xl WebPartHeader">Other Resources</div>
                <div style={{ margin: "16px" }} ><a target="_blank" href="https://365adm.sharepoint.com/sites/Customer">Customer Hub</a></div> */}
           
              </div>
              <div />
            </div>
          </div>
        </PageBody>
      </div>
    );
  }
}
