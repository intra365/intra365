import React from 'react';
import  './periodicsystem.css'
import $ from 'jquery'

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
  };
  


class Groupbox extends React.Component {
    constructor() {
        super();
        this.state = {
          mouseover:false
        };
        this.mouseOut = this.mouseOut.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
      }
      mouseOut() {
//        console.log("Mouse out!!!");
        this.setState({mouseover: false});
        if (this.props.onGroupMouseOut){
          this.props.onGroupMouseOut(this.props.tags)
        }
      
        //$(".CellTitle").css("color","white");
      }
      
      mouseOver() {
// console.log("Mouse over!!!");
        this.setState({mouseover: true});
        //$(".CellTitle").css("color","red");
        if (this.props.onGroupMouseOver){
          this.props.onGroupMouseOver(this.props.tags)
        }
      }
    render() {

        return (
          <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className={`groupbox-mouseover-${this.state.mouseover}`} >
          {this.props.children}
          </div>)
        

    }
}



export default Groupbox