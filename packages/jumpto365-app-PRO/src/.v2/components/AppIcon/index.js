import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AppIconGeneric from '../AppIconGeneric'
import Jumpto365Service from '../../services/index'
import Jumpto365ServiceApp from '../_Contexts/Jumpto365App'
export default class AppIcon extends Component {
    static propTypes  = {
        name :   PropTypes.string.isRequired,
        size : PropTypes.number


    }

constructor(props) {
    super(props);
    this.state = {item : {},loaded:false}
}


    _onJumpTo = () => {
            console.log(this.state.item.Link)

    }
    _onClick = () => {
        console.log(this.state.item.name)


    }

    componentDidMount = () => {
        var jumpto365Service = new Jumpto365Service()
        var item = jumpto365Service.getApp(this.props.name)
       
            this.setState({item,loaded: true})
       
       //     Jumpto365ServiceApp.emitError(this,err,"AppIconLoader")

       

    }
render (){
    if (!this.state.loaded) return "NOT LOADED"
    var s = this.state.item

    //return JSON.stringify(s)
    return (
    <AppIconGeneric 
                    size={this.props.size} 
                    backgroundColor={s.color} 
                    name="word" 
                    title={s.name}
                    description="Word processing in the browser."  
                    iconUrl={s.icon} />)

    // <AppIconGeneric size={this.props.size} 
    //                 name={this.state.item.name} 
    //                 backgroundColor={s.color}
    //                 iconUrl = {s.icon}
    //                 title={s.name}



    //                 onJumpTo={this._onJumpTo} 
    //                 onClick={this._onClick}/>
    
}

}
