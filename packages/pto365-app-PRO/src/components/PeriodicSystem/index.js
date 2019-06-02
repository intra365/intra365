import React from 'react';
import data from './office365periodictable.json'
import  './periodicsystem.css'
//import Select from 'react-select';
import 'react-select/dist/react-select.css';
//import ServiceInfo from './ServiceInfo'
//import Modal from 'react-modal';
import Cell from './Cell';
import Translate from "../Sidebar/translation"
import Package from "../../../package.json"
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Groupbox from './Groupbox'

class Connector extends React.Component {
    render() {
        const className = this.props.connector.class + " hide-small hide-medium hide-large hide-xlarge  ";

        return (<div className={className}>&nbsp;</div>)
    }
}

function html(title) {
    if (title) {
        return title ? title.replace("\\n", "<br/>") : "";
    }
}

function nohtml(title) {
    if (title) {
        return title ? title.replace("\\n", " ") : "";
    }
}

class LeftCell extends React.Component {
    render() {
        const left = this.props.left;
        const title = html(left.title);
        const simpletitle = nohtml(left.title);
        
        const style = { "backgroundColor": left.color };
        const tags = this.props.left.tags
        return (
            <Groupbox tags={tags}  onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut}>
            <div className="CellLeft" style={style} title={simpletitle} onClick={this.props.onGroupClicked}>
                <table className="CellLeftTitle GroupTitle hide-small hide-medium  hide-large hide-xlarge">
                    <tbody>
                        <tr><td className="CellWidth" dangerouslySetInnerHTML={{ __html: title }}>
                        </td></tr>
                    </tbody>
                </table>
            </div>
            </Groupbox>
            /*
            <div className="CellLeft" style={style}>
                <span className="CellLeftTitle GroupTitle hide-small hide-medium  hide-large hide-xlarge">{left.title}</span>
            </div>
            */
        )
    }
}

class RightCell extends React.Component {
    render() {
        const right = this.props.right;
        const title = html(right.title);
        const simpletitle = nohtml(right.title);
        
        const style = { "backgroundColor": right.color };
        const tags = this.props.right.tags
        
        return (
            <Groupbox tags={tags} onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut}>
            
        <div className="CellRight" style={style} title={simpletitle}  onClick={this.props.onGroupClicked}>
            <table className="CellRightTitle GroupTitle hide-small hide-medium  hide-large hide-xlarge">
                <tbody>
                    <tr><td className="CellWidth" dangerouslySetInnerHTML={{ __html: title }}>
                    </td></tr>
                </tbody>
            </table>
        </div>
        </Groupbox>


        )
    }
}


class CellLeft extends React.Component {


    render() {
        const col = this.props.col
        const title = html(col.title) // "Skype for Business"
        const simpletitle = nohtml(col.title);
        
        const style = {
            backgroundColor: col.color
        }
        const tags = this.props.col.tags
        
        return (
            <Groupbox tags={tags} onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut}>
            
            <div className="CellLeft" style={style} title={simpletitle} onClick={this.props.onGroupClicked}>
                <table className="CellLeftTitle GroupTitle hide-small hide-medium  hide-large hide-xlarge">
                    <tbody>
                        <tr><td className="CellWidth" dangerouslySetInnerHTML={{ __html: title }}>
                        </td></tr>
                    </tbody>
                </table>

            </div>
            </Groupbox>
          
        )

    }
}

class CellRow extends React.Component {

    render() {
        const col = this.props.col
        const title = html(col.title) // "Skype for Business"
        const simpletitle = nohtml(col.title);
        
        const style = {
            backgroundColor: col.color
        }
        return (
            
            <div className="CellRow" style={style} title={simpletitle}>
                <div className="CellRowTitle GroupTitle hide-small hide-medium hide-large  hide-xlarge" dangerouslySetInnerHTML={{ __html: title }}></div>
            </div>
            
        )

    }
}

class CellHide extends React.Component {

    render() {
        
        const style = {
            display: "none"
        }
        
        
        return (
            
        <div  style={style} >

        </div>
        

        )

    }
}

class CellRight extends React.Component {

    render() {
        const col = this.props.col
        const title = html(col.title) // "Skype for Business"
        const simpletitle = nohtml(col.title);
        
        const style = {
            backgroundColor: col.color
        }
        const tags = this.props.col.tags
        
        return (
            <Groupbox tags={tags} onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut}>
            
        <div className="CellRight" style={style} title={simpletitle} onClick={this.props.onGroupClicked}>
            <table className="CellRightTitle GroupTitle hide-small hide-medium  hide-large hide-xlarge">
                <tbody>
                    <tr><td className="CellWidth" dangerouslySetInnerHTML={{ __html: title }}>
                    </td></tr>
                </tbody>
            </table>


        </div>
        </Groupbox>
        

        )

    }
}

class CellBottom extends React.Component {

    render() {
        const col = this.props.col
        const title = html(col.title) // "Skype for Business"
        const simpletitle = nohtml(col.title);
        
        const style = {
            backgroundColor: col.color
        }
        const tags = this.props.col.tags
        return (
            <Groupbox tags={tags} onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut}>
            
            <div className="CellBottom" style={style} title={simpletitle} onClick={this.props.onGroupClicked}>
                <div className="CellBottomTitle GroupTitle hide-small hide-medium hide-large  hide-xlarge" dangerouslySetInnerHTML={{ __html: title }}></div>
            </div>
            </Groupbox>
           
        )

    }
}

class PeriodicSystemTableRow extends React.Component {
    

    render() {
        const product = this.props.product;
        const columns = [];
        var id = 0;
        product.columns.forEach((col) => {
            id += 1;
            switch (col.type) {
                case "bottom":

                    columns.push(<CellBottom col={col} key={id} onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut} onGroupClicked={this.props.onGroupClicked} />)
                    break;
                case "right":

                    columns.push(<CellRight col={col} key={id} onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut} onGroupClicked={this.props.onGroupClicked}/>)
                    break;
                case "hide":

                    columns.push(<CellHide col={col} key={id} onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut} onGroupClicked={this.props.onGroupClicked}/>)
                    break;
                case "left":

                    columns.push(<CellLeft col={col} key={id}  onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.onGroupMouseOut} onGroupClicked={this.props.onGroupClicked}/>)
                    break;
                case "row":

                    columns.push(<CellRow col={col} key={id}  onGroupMouseOver = {this.props.onGroupMouseOver} onGroupMouseOut = {this.props.OnGroupMouseOut} onGroupClicked={this.props.onGroupClicked}/>)
                    break;
                // case "language":

                //     columns.push(<CellLanguage/>)
                //     break;

                default:
                    columns.push(<Cell license={this.props.license} onChangeService={this.props.onChangeService} rtl={this.props.rtl } language={this.props.language} col={col} key={id} />)
                    break;
            }

        });

        const connectors = [];
        product.connectors.forEach((connector) => {
            id += 1;
            connectors.push(<Connector connector={connector} key={id} />)
        });

        return (

            <div className="row">
                {connectors}
                <LeftCell left={product.left}  onGroupClicked={this.props.onGroupClicked} onGroupMouseOver = {this.props.onGroupMouseOver} 
                onGroupMouseOut = {this.props.onGroupMouseOut} />
                {columns}
                <RightCell right={product.right}  onGroupClicked={this.props.onGroupClicked} onGroupMouseOver = {this.props.onGroupMouseOver} 
                onGroupMouseOut = {this.props.onGroupMouseOut} />

            </div>
        );
    }
}

class PeriodicSystemHeading extends React.Component {

    render() {
        const language = this.props.language.toUpperCase();
     
        var licenseMarkup = null
        if (this.props.license){
            licenseMarkup = <div style={{marginTop:"-8px",marginLeft:"97px", marginRight:"98px",backgroundColor:"#2B579A",color:"#ffffff",padding:"3px",paddingTop:"6px"}}>{this.props.license}</div>
        }
        const img = require("./media/Title-"+language+".png")
        const icansharepointimg = require("./media/icansharepoint logo transparent.png")
        const hexatownimg = require("./media/hexatown-logo.png")
        const jumpto365img = require("./media/Logo color - transparent background.png")
        
        
        //const img = "https://office365periodictable.github.io/components/fullsize/media/" + "Title-EN.png"

        return (
            
            
            <div className="PeriodicSystemHeading  hide-small hide-medium hide-large  hide-xlarge">
                <img className="PeriodicSystemHeadingImage" src={img} alt="" />
                <div>
                {licenseMarkup}
                {/* <a href="http://icansharepoint.com" rel="noopener noreferrer" target="_blank" className="zindex-high "><img className="icansharepointlogo" src={icansharepointimg} alt="" /></a>
                <a href="https://www.hexatown.com" rel="noopener noreferrer" target="_blank" className="zindex-high "><img className="hexatownlogo" src={hexatownimg} alt="" /></a> */}
                <a href="https://medium.com/jumpto365/latest/home" rel="noopener noreferrer" target="_blank" className="zindex-high "><img className="jumpto365img" src={jumpto365img} alt="" /></a>
                </div>
                
            </div>
            
            
        );
    }
}

export class PeriodicSystemFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          status: "new",
          language : this.props.language,
          license: props.license
        }
      }
    render() {
        
        const feedback = (1===2) ? <DefaultButton className="feedbackButtons" style={{"margin-top":"-15px"}} onClick={this.props.onAbout} text={Translate(this.state.language,19)}/> : null
        return (
            <div className="PeriodicSystemFooter  hide-small hide-medium hide-large  hide-xlarge">
                <div style={{ float: "left" }}>{Translate(this.state.language,7)}&nbsp;©2017-18&nbsp;
                <a href="https://twitter.com/thatmattwade" rel="noopener noreferrer" target="_blank">Matt Wade</a>&nbsp;&amp;&nbsp;
                <a href="http://icansharepoint.com" rel="noopener noreferrer" target="_blank">icansharepoint.com</a>;&nbsp;{Translate(this.state.language,8)}&nbsp;©2017-18&nbsp;
                <a href="https://twitter.com/niegrejoh" rel="noopener noreferrer" target="_blank">Niels Gregers Johansen</a>&nbsp;&amp;&nbsp;
                <a href="https://www.hexatown.com" rel="noopener noreferrer" target="_blank">hexatown.com</a> 
                &nbsp; {Translate(this.state.language,18)}&nbsp;{Package.version} {this.state.license  }
                </div>
                <div style={{ float: "right",position:"absolute","right":64 }}>

                
        {feedback }               

                </div>
            </div>

        );
    }
}

class PeriodicSystem extends React.Component {
    render() {
        const language = this.props.language;
        
        const title = {
            "Language": "English",
            "Title": "The Periodic table of Office 365",
            "SubTitle1": "App availability depends on license type",
            "SubTitle2": "Provided services include: Office 365 Groups • Enterprise Search • Microsoft Graph • MyAnalytics • Security & Compliance • Plus More",
            "Brackets": "*Items in [brackets] identify software with similar functionality for the sake of context",
            "ByLine": "Original design ©2017 Matt Wade & icansharepoint.com; web development ©2017 Niels Gregers Johansen & hexatown.com",
            "Link": "http://icsh.pt/O365Table",
            "Copyright": "© 2017 icansharepoint.com"
        };
        const rows = [];
        rows.push(<PeriodicSystemHeading key="head" license={this.props.license}  title={title} language={language}/>)
        const datarows = this.props.rows;
        


        var rowid = 0;
        datarows.forEach((product) => {
            for (let index = 0; index < product.columns.length; index++) {
                const element = product.columns[index];
                if (element.id === "6:2"){
                    product.columns[index] = {
                        "id": "6:2",
                        "type": "language",
                        "title": "Language ",
                        "cellId": "371"
                    }

                }
                    if (element.id === "5:6"){
                switch (this.props.sponsor) {
                    case 'valo':
                        product.columns[index] = {
                            "id": "5:6",
                            "type": "service",
                            "title": "Valo ",
                            "about": "",
                            "image": "valo.png",
                            "color": "#27427C",
                            "descriptor": "Fall in ♥ with your intranet",
                            "subtitle": "sponsored",
                            "ispremium": true,
                            "link": "http://www.valointranet.com/da/fordele/",
                            "linkLanguage": "en",
                            "tags": [
                                "x"                            
                            ],
                            "shareable": "",
                            "cellId": "370"
                        }

                        
                        break;
                        case 'hyperfish':
                            product.columns[index] = {
                                "id": "5:6",
                                "type": "service",
                                "title": "Hyperfish",
                                "about": "",
                                "image": "hyperfish.png",
                                "color": "#215fac",
                                "descriptor": "Bring your Directory to life",
                                "subtitle": "sponsored",
                                "ispremium": true,
                                "link": "http://www.valointranet.com/da/fordele/",
                                "linkLanguage": "en",
                                "tags": [
                                "x"
                                ],
                                "shareable": "",
                                "cellId": "370"
                            }
                        
                        break;
                        case 'atbot':
                            product.columns[index] = {
                                "id": "5:6",
                                "type": "service",
                                "title": "AtBot",
                                "about": "",
                                "image": "bizzy.png",
                                "color": "#ed217c",
                                "descriptor": "Bot as a service for Office 365",
                                "subtitle": "sponsored",
                                "ispremium": true,
                                "link": "https://hexatown.github.io/docs/sponsored/atbot",
                                "play":"https://atbot.io",
                                "linkLanguage": "en",
                                "tags": [
                                    "x"                                
                                ],
                                "shareable": "",
                                "cellId": "370"
                            }
                        
                        break;
                
                    default:
                        break;
                }
                
                    
                }
                
            }

            rowid+=1;
            rows.push(
                <PeriodicSystemTableRow
                    onChangeService={this.props.onChangeService}
                    onGroupMouseOver = {this.props.onGroupMouseOver}        
                    onGroupMouseOut = {this.props.onGroupMouseOut}
                
                    onGroupClicked={this.props.onGroupClicked}
                    language= {language}
                    rtl={this.props.rtl}
                    license={this.props.license}
                    product={product}
                    key={rowid} />
            );
        });
        rows.push(<PeriodicSystemFooter license={this.props.license} key="footer" title={title} language={language} onFeedback={this.props.onFeedback} onAbout={this.props.onAbout}/>)
        const style = {
            clear: "both"
        }
        return (

            <div className="PeriodicSystem" style={style}>{rows}</div>


        );
    }
}





class FilterablePeriodicSystem extends React.Component {

    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this)

        const selectedLanguage = props.language ? props.language.toLowerCase() : 'en'
        switch (selectedLanguage) {
            case 'da':
                this.state = { language: 2,rtl:false,selectedLanguage:selectedLanguage }
                
                break;
            case 'en':
                this.state = { language: 0,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'ja':
                this.state = { language: 3,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'es':
                this.state = { language: 4,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'de':
                this.state = { language: 1,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'fr':
                this.state = { language: 6,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'secen':
                this.state = { language: 5,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'nl':
                this.state = { language: 7,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'no':
                this.state = { language: 8,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'goven':
                this.state = { language: 9,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'hu':
                this.state = { language: 10 ,rtl:false,selectedLanguage:selectedLanguage}
                break;
            case 'pt':
                this.state = { language: 11,rtl:false,selectedLanguage:selectedLanguage }
                break;
            case 'is':
                this.state = { language: 12 ,rtl:false,selectedLanguage:selectedLanguage}
                break;
            case 'he':
                this.state = { language: 13 ,rtl:true,selectedLanguage:selectedLanguage}
                break;
            case 'fi':
                this.state = { language: 14 ,rtl:false,selectedLanguage:selectedLanguage}
                break;
            case 'sv':
                this.state = { language: 15 ,rtl:false,selectedLanguage:selectedLanguage}
                break;
            case 'cs':
                this.state = { language: 16 ,rtl:false,selectedLanguage:selectedLanguage}
                break;


            default:

                this.state = { language: 0 ,rtl:false,selectedLanguage:selectedLanguage}
                break;
        }
        localStorage.setItem("language",selectedLanguage)
        this.state.languageName = selectedLanguage;

        this.selectedLanguauge = this.state.language
        this.logChange = this.logChange.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    logChange(selection) {
        if (selection) {
            this.selectedLanguauge = selection.value;
            this.setState({ language: selection.value });

        }
        console.log("Selected: " + JSON.stringify(selection));
    }
    updateDimensions() {
        //this.setState({ });
        this.setState({
            width: window.width, 
            height: window.height,
        });


    }
    getDerivedStateFromProps(nextProps, prevState){
        console.log('Periodic Table component',nextProps, prevState)
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }



    render() {

        //TODO :Refactor and clean up
       // const selectedLanguage = this.state.selectedLanguage ? this.state.selectedLanguage : "en"
        const selectedLanguage = this.props.language ? this.props.language.toLowerCase() : 'en'
        var language = {}
        switch (selectedLanguage.toLowerCase()) {
            case 'da':
            language = { language: 2,rtl:false }
                
                break;
            case 'en':
            language= { language: 0,rtl:false }
                break;
            case 'ja':
            language = { language: 3,rtl:false }
                break;
            case 'es':
            language = { language: 4,rtl:false }
                break;
            case 'de':
            language = { language: 1,rtl:false }
                break;
            case 'fr':
            language = { language: 6,rtl:false }
                break;
            case 'secen':
            language = { language: 5,rtl:false }
                break;
            case 'nl':
            language = { language: 7,rtl:false }
                break;
            case 'no':
            language = { language: 8,rtl:false }
                break;
            case 'goven':
            language = { language: 9,rtl:false }
                break;
            case 'hu':
            language = { language: 10 ,rtl:false}
                break;
            case 'pt':
            language = { language: 11,rtl:false }
                break;
            case 'is':
            language = { language: 12 ,rtl:false}
                break;
            case 'he':
            language = { language: 13 ,rtl:true}
                break;
            case 'fi':
            language = { language: 14 ,rtl:false}
                break;
            case 'sv':
            language = { language: 15 ,rtl:false}
                break;
            case 'cs':
                language = { language: 16 ,rtl:false}
                    break;
    


            default:

            language = { language: 0 ,rtl:false}
                break;
        }
        localStorage.setItem("language",selectedLanguage)
        language.languageName = selectedLanguage;
        var languagedata = data[language.language]
        var mapdata = languagedata ? languagedata.data :  data[0].data
        return (

            <div className="IfToSmallHide PeriodicSystemFrame layoutBorders " >



               <PeriodicSystem 
               license={this.props.license}
                rows={data[language.language].data}  
                onChangeService={this.props.onChangeService}
                onGroupMouseOver = {this.props.onGroupMouseOver}        
                onGroupMouseOut = {this.props.onGroupMouseOut}
                onGroupClicked={this.props.onGroupClicked}   
                onFeedback={this.props.onFeedback}  
                onAbout={this.props.onAbout} 
                language={language.languageName}
                rtl={this.state.rtl}
                sponsor={this.props.sponsor}/>
                
            </div>
        );
    }
}




export default FilterablePeriodicSystem