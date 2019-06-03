import React, { Component } from "react";
import {
  Grid,
  Image,
  Button,
  Icon,
  Label,
  GridColumn,
  Input
} from "semantic-ui-react";

import Quill from "quill";
import "quill/dist/quill.snow.css"; // ES6
import "quill/dist/quill.bubble.css"; // ES6

import $ from "jquery";
import "./editor.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
let Inline = Quill.import("blots/inline");
let Block = Quill.import("blots/block");
let BlockEmbed = Quill.import("blots/block/embed");

class Integrator extends Component {
  onChange = (delta, oldDelta, source) => {
    if (this.props.onChange) {
      this.props.onChange(delta, oldDelta, source);
    }
  };
  render() {
    return <div />;
  }
}

class BoldBlot extends Inline {}
BoldBlot.blotName = "bold";
BoldBlot.tagName = "strong";

class ItalicBlot extends Inline {}
ItalicBlot.blotName = "italic";
ItalicBlot.tagName = "em";

class LinkBlot extends Inline {
  static create(url) {
    let node = super.create();
    node.setAttribute("href", url);
    node.setAttribute("target", "_blank");
    return node;
  }

  static formats(node) {
    return node.getAttribute("href");
  }
}
LinkBlot.blotName = "link";
LinkBlot.tagName = "a";

class BlockquoteBlot extends Block {}
BlockquoteBlot.blotName = "blockquote";
BlockquoteBlot.tagName = "blockquote";

class HeaderBlot extends Block {
  static formats(node) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}
HeaderBlot.blotName = "header";
HeaderBlot.tagName = ["H1", "H2"];

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute("alt", value.alt);
    node.setAttribute("src", value.url);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute("alt"),
      url: node.getAttribute("src")
    };
  }
}
ImageBlot.blotName = "image";
ImageBlot.tagName = "img";

class VideoBlot extends BlockEmbed {
  static create(url) {
    let node = super.create();
    node.setAttribute("src", url);
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", true);
    return node;
  }

  static formats(node) {
    let format = {};
    if (node.hasAttribute("height")) {
      format.height = node.getAttribute("height");
    }
    if (node.hasAttribute("width")) {
      format.width = node.getAttribute("width");
    }
    return format;
  }

  static value(node) {
    return node.getAttribute("src");
  }

  format(name, value) {
    if (name === "height" || name === "width") {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}
VideoBlot.blotName = "video";
VideoBlot.tagName = "iframe";

// class TweetBlot extends BlockEmbed {
//   static create(id) {
//     let node = super.create();
//     node.dataset.id = id;
//     twttr.widgets.createTweet(id, node);
//     return node;
//   }

//   static value(domNode) {
//     return domNode.dataset.id;
//   }
// }
export default class MyEditor extends Component {
  get $editable() {
    return this.props.editable;
  }
  get $html() {
    return this.props.html;
  }
  get $delta() {
    return this.props.delta;
  }

  get $height (){
    return this.props.height
  }
  save = ()=>{
    
    return new Promise((resolve, reject) => {
      if (!this.props.onSave){
        return reject("No onSave method passed as prop to MyEditor")
      }
      var payLoad = JSON.stringify(this.quill.getContents())
      
       this.props.onSave("editor",".json",payLoad)
       .then(
         url=>{
         
         resolve(url)})
       .catch(error=>reject(error))
      
    })
    
  }
  constructor(props) {
    super(props);
    this.myEditorRef = React.createRef();
  }

  componentDidUpdate(prevProps){
    if (prevProps.delta !== this.props.delta){
     
      if (this.props.delta){
        this.quill.setContents(this.props.delta)
      }else{
        this.quill.setContents([
         
          { insert: '\n' }
        ]);


        
      }
     
    }
  }
  componentDidMount() {
    //   TweetBlot.blotName = 'tweet';
    // TweetBlot.tagName = 'div';
    // TweetBlot.className = 'tweet';

    var myEditor = this.myEditorRef.current;
    // Quill.register(BoldBlot);
    // Quill.register(ItalicBlot);
    // //Quill.register(LinkBlot);
    // Quill.register(BlockquoteBlot);
    // Quill.register(HeaderBlot);
    // Quill.register(DividerBlot);
    //Quill.register(ImageBlot);
    //Quill.register(TweetBlot);
    //Quill.register(VideoBlot);
var toolbar = this.$editable ? [
  [{ header: [1, 2, false] }],

  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

//  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
 // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  
  ['link','image',"video"],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
   [{ 'align': [] }],

   ['clean']                                         // remove formatting button

] : null
    let quill = new Quill("#ql-editor", {
      //debug: 'info',
      modules: {
        toolbar
      },
      // placeholder:
      //   "Write addtional stuff here, click the (+) to insert pictures / video references (Optionally)",
      readOnly: !this.$editable,
      theme: this.$editable ? "snow" : null
    });
    this.quill = quill
    //quill.addContainer($("#tooltip-controls").get(0));
    //TODO: Reenable sidebar controls
    //quill.addContainer($("#sidebar-controls").get(0));
    quill.on("text-change", function(delta, oldDelta, source) {
      
      if (myEditor && myEditor.onChange) {
        if (source!=="api"){
        myEditor.onChange(delta, oldDelta, source);
      }
      }
    });
    quill.on(Quill.events.EDITOR_CHANGE, function(eventType, range) {
      Quill.events.return;

      if (eventType !== Quill.events.SELECTION_CHANGE) return;
      if (range == null) return;
      if (range.length === 0) {
        $("#tooltip-controls").hide();
        let [block, offset] = quill.scroll.descendant(Block, range.index);
        if (
          block != null &&
          block.domNode.firstChild instanceof HTMLBRElement
        ) {
          let lineBounds = quill.getBounds(range);
          $("#sidebar-controls")
            .removeClass("active")
            .show()
            .css({
              left: lineBounds.left - 50,
              top: lineBounds.top - 2
            });
        } else {
          $("#tooltip-controls, #sidebar-controls").hide();
          $("#sidebar-controls").removeClass("active");
        }
      } else {
        $("#sidebar-controls, #sidebar-controls").hide();
        $("#sidebar-controls").removeClass("active");
        let rangeBounds = quill.getBounds(range);
        // $('#tooltip-controls').show().css({
        //   left: rangeBounds.left + rangeBounds.width/2 - $('#tooltip-controls').outerWidth()/2,
        //   top: rangeBounds.bottom + 10
        // });
      }
    });

    $("#bold-button").click(function() {
      quill.format("bold", true);
    });

    $("#italic-button").click(function() {
      let active = $(this).hasClass("active");
      quill.format("italic", true);
    });

    $("#link-button").click(function() {
      let value = prompt("Enter link URL");
      quill.format("link", value);
    });

    $("#blockquote-button").click(function() {
      console.log("blockquote");
      quill.format("blockquote", true);
    });

    $("#header-1-button").click(function() {
      quill.format("header", 1);
    });

    $("#header-2-button").click(function() {
      quill.format("header", 2);
    });

    $("#divider-button").click(function() {
      let range = quill.getSelection(true);
      quill.insertEmbed(range.index, "divider", true, Quill.sources.USER);
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
      $("#sidebar-controls").hide();
    });

    $("#image-button").click(function() {
      let range = quill.getSelection(true);
      quill.insertEmbed(
        range.index,
        "image",
        {
          alt: "Quill Cloud",
          url: "https://quilljs.com/0.20/assets/images/cloud.png"
        },
        Quill.sources.USER
      );
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
      $("#sidebar-controls").hide();
    });

    $("#video-button").click(function() {
      let range = quill.getSelection(true);
      let url = "https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0";
      quill.insertEmbed(range.index, "video", url, Quill.sources.USER);
      quill.formatText(range.index + 1, 1, { height: "170", width: "400" });
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
      $("#sidebar-controls").hide();
    });

    $("#tweet-button").click(function() {
      let range = quill.getSelection(true);
      let id = "464454167226904576";
      quill.insertEmbed(range.index, "tweet", id, Quill.sources.USER);
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
      $("#sidebar-controls").hide();
    });

    $("#show-controls").click(function() {
      //$("#sidebar-controls").toggleClass("active");
      quill.focus();
    });
    if (this.props.registerEditor){
      this.props.registerEditor(this)
    }
    quill.focus();
  }
  render() {
    // return ( <trix-editor></trix-editor>)

    return (
      <div>
        <Integrator ref={this.myEditorRef} {...this.props} />
       { false && <div><div id="tooltip-controls">
          <button id="bold-button">
            <i class="fa fa-bold" />
          </button>
          <button id="italic-button">
            <i class="fa fa-italic" />
          </button>
          <button id="link-button">
            <i class="fa fa-link" />
          </button>
          <button id="blockquote-button">
            <i class="fa fa-quote-right" />
          </button>
          <button id="header-1-button">
            <i class="fa fa-header">
              <sub>1</sub>
            </i>
          </button>
          <button id="header-2-button">
            <i class="fa fa-header">
              <sub>2</sub>
            </i>
          </button>
        </div>
        <div id="xsidebar-controls">
          <button id="show-controls">
            <i class="fa fa-plus" />
          </button>
          <span class="controls">
            <button id="image-button">
              <i class="fa fa-camera" />
            </button>
            <button id="video-button">
              <i class="fa fa-play" />
            </button>
            {/* <button id="tweet-button"><i class="fa fa-twitter"></i></button> */}
            <button id="divider-button">
              <i class="fa fa-minus" />
            </button>
          </span>
        </div></div>}
        <div id="ql-editor" style={{overflowY:"auto",height:this.$height}}>
          <p />
        </div>
      </div>
    );
  }
}
