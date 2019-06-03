import React, { Component } from 'react';
import logo from './Logo horizontal color - transparent background.png';
import './App.css';
import { Customizer,SearchBox } from 'office-ui-fabric-react';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { CommunicationColors } from '@uifabric/fluent-theme';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import _ from "lodash"
import Masonry from 'react-masonry-component';
//var {shell} = require('electron')

var verbose = true
var searchForWord = null
function log(a,b,c,d,e,f)
{
    if (!verbose) return
    console.log(a,b,c,d,e,f)
}



function ext(e){
    if (window.require){
        const electron = window.require('electron');
        e.preventDefault()
        //debugger
        electron.shell.openExternal(e.currentTarget.href);
    }

}
export default  class MegaMenu extends Component {
    state = {} 
    componentDidMount(){
        window.location.assign("https://app.jumpto365.com?electron=1")
        this.setState({links:this.props.links})
    }

  _getMegaMenu = (root,level,childState,childCount) => {

    if (childState.length < level){
        childState.push(false)
        childCount.push(0)
    }
    else
    {
        childState[level-1] = false
        childCount[level-1] = 0
    }
    var getStyle = (l) =>{
        
        switch (l) {
            case 0:
                return {}
                break;
        
            case 1:
            return {minWidth:"240px",maxWidth:"240px",overflowX:"clip", xborder:"0px solid #888888",margin:"0px",overflow:"hidden"}
                break;
            case 2:
            return {padding:"8px",minWidth:"240px",maxWidth:"240px",overflowX:"clip", xborder:"0px solid #888888",margin:"0px",overflow:"hidden"}
            break;
            case 3:
            return {}
            break;
            default:
            return {}
            break;
        }
    }
    var getClass = (l) =>{
        
        switch (l) {
            case 0:
                return ""
                break;
        
            case 2:
            return "ms-font-l xmegaMenuLevel1 ms-fontWeight-bold"
                break;
            case 3:
                return "ms-font-m ms-fontWeight-semibold"
                break;
                
            default:
            return ""
            break;
        }
    }
    if (!root ) return []
    if (!root.childrens ) return []
    var getchildren = () => {return root.childrens.map((child,key)=>{

        var links = child.links.map((link,ix)=>{
            if (!searchForWord || (searchForWord && link.text.toUpperCase().indexOf(searchForWord.toUpperCase()) > -1)){

            

            childState[level-1] = true // has children
            childCount[level-1]++ // has children
            return <li><a target="_blank" onClick={ext} href={link.link} title={link.text}> <span key={ix} dangerouslySetInnerHTML={{ __html: link.text }}></span></a></li>
        }
        else{
            return null
        }
        })

        var children = this._getMegaMenu(child,level+1,childState,childCount)
        if ( childState[level] ){
            childState[level-1] = true
            childCount[level-1]++
        }
        var style = getStyle(level)
        var className = getClass(level)

        log(child,childState)
        if ( !childState[level-1]) return ""
        //childState[level-1] = false
        return <div key={key} style={style} ><div class={className}  > {child.text} </div> 
        <ul>
        {links}
        </ul>
        {children}
        </div>
    }) }
    var getRootchildren = () => {return root.childrens.map((child,key)=>{

        var links = child.links.map((link,ix)=>{
            childState[level-1] = true // has children
            childCount[level-1]++
            // {searchForWord? "(" + links.length + ")": "" }
            return <li><a target="_blank" href={link.link} title={link.text}> <span key={ix} dangerouslySetInnerHTML={{ __html: link.text  }}></span></a></li>
        })

        var children = this._getMegaMenu(child,level+1,childState,childCount)
        if ( childState[level] ){
            childState[level-1] = true
            childCount[level-1]++
        }
        var style = getStyle(level)
        var className = getClass(level)

        log(child,childState)
        if ( !childState[level-1]) return ""
        //childState[level-1] = false
        return  <PivotItem linkText={child.text + (searchForWord ? " ("+childCount[level-1] +")": "")} key={key} >
        <Masonry>
        
        {links}
        
        {children}
        </Masonry>
        </PivotItem>
    }) }
  
    if (level === 1){
        
        return getRootchildren()
    }else
    {
        return getchildren()
    }
}
  
    _filter =  (searchFor) => {
      
       searchForWord = searchFor
        this.setState({searchFor})

    }

  render() {
    
    var tempLinks =   _.cloneDeep(this.props.links) // copyArray(this.props.links)
    var megamenu =   this._getMegaMenu(tempLinks,1,[],[])
    var ptoUrl =  window.location && window.location.hostname === "localhost" ? "http://localhost:3000" : "https://beta.jumpto365.com"

    var ptoUrl = "https://beta.jumpto365.com/@/niels@jumpto365.com"
    return (
     
      <Customizer {...FluentCustomizations}>
      

        
         <div className="App" >
      <a href={ptoUrl} xtarget="_blank"><img style={{position:"fixed",bottom:"10px",left:"10px",height:"32px",width:"auto"}} src={logo}></img></a>

                             <SearchBox 
                        
                        placeholder={'Search'  }
                        onEscape={ (ev) => {
                            console.log('Custom onEscape Called');
                        } }
                        onClear={ (ev) => {
                            console.log('Custom onClear Called');
                        } }
                        onChange={ (newValue) => {
                            console.log('SearchBox onChange fired: ' + newValue)
                            this._filter(newValue) }}
                        onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
                        onFocus={ () => console.log('onFocus called') }
                        onBlur={ () => console.log('onBlur called') }
                        /> 
                    
          <Pivot>
            {megamenu}
         
        </Pivot>
        </div>
        </Customizer>
  
    );
  }
}


