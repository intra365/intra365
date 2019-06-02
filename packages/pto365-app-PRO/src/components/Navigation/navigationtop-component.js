import * as React from 'react';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { RING,isAuthenticated,userName,userId } from '../Auth'
import $ from 'jquery'
import Translate from "../Sidebar/translation"
import "./nav.css"  
import {
  SearchBox
} from 'office-ui-fabric-react/lib/SearchBox';
var onSearchText = null

export class ActionCommandBar extends React.Component {

  constructor(props) {
    super(props);
    onSearchText = this.props.onSearch
    
  }


  componentDidMount = () => {
    $(".ms-CommandBarSearch-input").on('input',function(){
      //console.log(this.value)
      if (onSearchText)      onSearchText(this.value)
    })
  
    $(".ms-CommandBarSearch-input").focus()
  
  }

  
  doLogout = () => {
    if (this.props.onLogout)  this.props.onLogout()
  }

  doLogin = () => {
    if (this.props.onLogin)  this.props.onLogin()
  }

  doAbout = () => {
    if (this.props.onAbout)  this.props.onAbout()
  }
  
  doEmbed = () => {
    if (this.props.onEmbed)  this.props.onEmbed()
  }

  render() {

    var lastLanguage = localStorage.getItem("language")
    var homeAddress = lastLanguage ? "#/office365/" + lastLanguage : "#/office365/en"
    console.log(homeAddress)

    //let { items, overflowItems, farItems } = this.props;
    var userMenu = null
    if (isAuthenticated()){
      userMenu =  {
      key:"about",
      name: userName(),
      icon:"Contact",
      subMenuProps: {
        items: [
          {
            key:"profile",
            name: "Profile",
            icon:"Info",
            href:"#/debug"
          
          },

          {
            key:"Logout",
            name: "Logout ("+userId()+")",
            icon:"Clear",
            
            onClick: () => { 
              isAuthenticated() ?  this.doLogout() : this.doLogin()
              }
            
          },
        ]}
    }
  } else
   {
      userMenu = {
        key:"about",
        name: Translate(lastLanguage,19), //"About",
        icon:"Info",
        href:"#/about"
      
      }


   }
  
    const farItems = [
     

            userMenu

      
 
    
    ]

    var items=
    [
      
      {
        key:"home",
        name:  RING(1) ? "" : Translate(lastLanguage,24), // "PERIODIC TABLE of Office 365",
        icon:"Home",
        href:homeAddress
        
      },           
      {
        key:"blog",
        name:  "Blog", // "PERIODIC TABLE of Office 365",
        icon:"News",
        href:"https://medium.com/jumpto365/latest/home",
        target:"_blank"
        
      },           
]

  const overflowItems = [
      ]
      overflowItems.push({
        key:"embed",
        name:  Translate(lastLanguage,14), //  "Embed",
        icon:"Embed",
        href:"#/embed"
        
      })

      overflowItems.push({
        key: 'lang',
        name: Translate(lastLanguage,5), //'Language',
        //onRender: this._renderSplitButtonMenuItem,
        href:"#/language",
        icon:"LocaleLanguage",

      })

      items.push({
        key: 'license',
        name: Translate(lastLanguage,27) ,//'By License'  
        //onRender: this._renderSplitButtonMenuItem,
        icon:"Money",
        className: 'ms-CommandBarItem',
        subMenuProps: {
          items: [
            {
              key: 'BusinessEssentials',
              name: 'Business Essentials',
              href: '#/license/BusinessEssentials/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'Business',
              name: 'Business',
              href: '#/license/Business/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'BusinessPremium',
              name: 'Business Premium',
              href: '#/license/BusinessPremium/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'EnterpriseE1',
              name: 'Enterprise E1',
              href: '#/license/EnterpriseE1/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'EnterpriseE3',
              name: 'Enterprise E3',
              href: '#/license/EnterpriseE3/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'EnterpriseE5',
              name: 'Enterprise E5',
              href: '#/license/EnterpriseE5/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'EnterpriseF1',
              name: 'Enterprise F1',
              href: '#/license/EnterpriseF1/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'EduA1',
              name: 'Education A1',
              href: '#/license/EduA1/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'EduA3',
              name: 'Education A3',
              href: '#/license/EduA3/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'EduA5',
              name: 'Education A5',
              href: '#/license/EduA5/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'USGovG1',
              name: 'US Government G1',
              href: '#/license/USGovG1/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'USGovG5',
              name: 'US Government G3',
              href: '#/license/USGovG3/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'USGovG5',
              name: 'US Government G5',
              href: '#/license/USGovG5/'+lastLanguage,
              xtarget: "_blank"
            },
            {
              key: 'USGovF1',
              name: 'US Government F1',
              href: '#/license/USGovF1/'+lastLanguage,
              xtarget: "_blank"
            },

              
              
            
          ],
        },
      })      
if (RING(1)){
    //   overflowItems.push(
        
    //   {
    //     key:"usecases",
    //     name: "Usecases", // "PERIODIC TABLE of Office 365",
    //     icon:"TaskManager",
    //     href:"#/usecases"
        
    //   }     
    // )
    items.push( {
      key:"wtw",
      name: "Which Tool when?",
      icon:"Repair",
      href:"#/wtw"
    
    })

    overflowItems.push( {
          key:"about",
          name: Translate(lastLanguage,19), //"About",
          icon:"Info",
          href:"#/about"
        
        })
    
  }

          
    var topbar =!isAuthenticated() ?  null :  <div className="ms-Grid" >
        <div className="ms-Grid-row" style={{backgroundColor:"#0B559F"}}>
        
        <div className="ms-Grid-col ms-sm3  " >
    
    <div >
    <div ><a href="#">
    <img style={{height:"24px",width:"auto",marginLeft:"15px",marginTop:"12px",marginBottom:"6px",marginRight:"10px"}} src={require("../PeriodicSystem/media/Logo horizontal white - transparent background.png")}/></a>
    </div>
    <div  >
        </div>    </div>
                </div>
                
                
        {/* <div className='SearchBoxHeading'> <SearchBox 
          placeholder='Search'
          onEscape={ (ev) => {
            console.log('Custom onEscape Called');
          } }
          onClear={ (ev) => {
            console.log('Custom onClear Called');
          } }
          onChange={ (newValue) => console.log('SearchBox onChange fired: ' + newValue) }
          onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        /> 
        
        </div>
        
        */}
        
        
        <div className="ms-Grid-col ms-sm8  " style={{width:"100%"}}>
        <CommandBar
        
        isSearchBoxVisible={false }
        elipisisAriaLabel='More options'
        items={ items }
        overflowItems={ overflowItems }
        farItems={ farItems }
      />
        </div></div>
        </div>    

        topbar=null
    return (
      <div id="topnav">
        { topbar}    
        <CommandBar
        
          isSearchBoxVisible={ false}
          searchPlaceholderText='Search use case'
          elipisisAriaLabel='More options'
          items={ items }
          overflowItems={ overflowItems }
          farItems={ farItems }
        />
      </div>
    );
  }
}