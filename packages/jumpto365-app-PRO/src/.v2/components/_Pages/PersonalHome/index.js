import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Login  from '../../Login';

import Jumpto365Service from '../../../services';
import { subscribe, Subscribe } from 'react-contextual';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Jumpto365App from "../../_Contexts/Jumpto365App"
import PeriodicTable from '../../PeriodicTable';
import Testdata from "../../../data/TestData"
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import $ from 'jquery'
import PageBody from '../../PageBody';
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class PersonalHomePage
 * @extends {Component}
 */

export default class PersonalHomePage extends React.PureComponent {

    static propTypes  = {
        user : PropTypes.string,
        context : PropTypes.any,
        isRootPage : PropTypes.any
    }

    
        
    
    constructor(props) {
        super(props);
        this.state = {}

      
    }
    updateDimensions = () => {
        //this.setState({ });
        var win = $(window)
        var h = win.height()
        var mastHead = $("#header")
        var pageHead = $("#pageheader")
        var height = h - 40 -  (mastHead ? mastHead.height() : 0) - (pageHead.length ? pageHead.height() : 0)
        var width = pageHead.length ? pageHead.width() : 1200
        this.setState({
            
            height,
            width
        });


    }

    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.user !== this.props.user){
          this.init()
        }
        
      }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }
    init = () => {
        if (this.props.user) {
      
            let service = new Jumpto365Service()

                if (this.props.context.userId !== this.props.user){
                    this.setState({error:`You need to be signed in as ${this.props.user} to get access` })
                    return
                }


                
                service.getUser(this.props.user.replace("@","-"))
                .then(user=>{
                    this.setState({user,title:user.title})
                    if (this.props.context ){
                        
                        this.props.context.setState({user})
                    }
                })
                .catch(error => {
                    this.setState({user: {},title:this.props.context.userName,
                        errors: (this.state.errors ? this.state.errors : []).push( "User home could not be loaded")})
                    
                })
    }
    }
    componentDidMount = () => {
        this.init()
       

        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions()
    }

    
    
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ScenarioPage
     */
    render() {      
        if (!this.state.user  ) return null
     //   var icon = this.state.user && this.state.user.properties ? this.state.user.properties.logo : null
     
        return (
               
                <PageLayoutMain>
                <PageHeader icon={this.state.icon} title={this.state.title } color="green"/>
                <Toolbar />
                <PageBody>
                {this.state.error}
                <div>
                {/* <PeriodicTable width={this.state.width} height={this.state.height} grid={Testdata.pto} onScale={this._onScale}/> */}
{false && 
                <div className="ms-font-m toolbody" 
                
                dangerouslySetInnerHTML={{ __html: this.state.user.body }}></div> 
            }

                  <PeriodicTable width={this.state.width} height={this.state.height} xgrid={this.state.grid} />
                </div>
                </PageBody>
            </PageLayoutMain>
           
                
        
        )
        
    }
}

class Toolbar extends Component { 

    static propTypes  = {
        about : PropTypes.string,
        language: PropTypes.string  
    }
    

        
         
        
          render() {
        
            var lastLanguage = this.props.language ? this.props.language : "en"
          
            const farItems = [{
                key:"help",
                name: "Help",
                icon:"Info",
                disabled:true,
              }
            ]
        
            var items = [




              {
                key: "share",
                name: "Share", 
                icon: "Share",
                disabled: true,

              },
              {
                key: "download",
                name: "Download", 
                icon: "Download",
                disabled: false,
                subMenuProps: {
                    items: [{
                        key: 'pdf',
                        name: 'PDF',
                        icon : "PDF",
                        disabled: true,
                        onClick : this.props.onCreatePDF
                    },
                      {
                        key: 'word',
                        name : "Word",
                        icon: 'WordDocument',
                        disabled: true,
                      },
                      {
                        key: 'excel',
                        name : "Excel",
                        icon: 'ExcelDocument',
                        disabled: true,
                      }
                    ]
                  }
              }
            ]

            const overflowItems = []
            overflowItems.push({
              key: "rename",
              name: "Rename",
              icon: "Rename",
              disabled:true
             

            })
        
          
        
                  
  
            return (
              <div id="toolbar" style={{marginTop:"-8px",marginLeft:"-8px",marginRight:"-8px",marginBottom:"8px"}}>
        
                <CommandBar

                  isSearchBoxVisible={ true}
                  searchPlaceholderText='Search on this page'
                  elipisisAriaLabel='More options'
                  items={ items }
                //   overflowItems={ overflowItems }
                  farItems={ farItems }
                />
              </div>
            );
          }

 
}
