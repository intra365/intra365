
import React, { PureComponent } from 'react'
import ReactCrop from 'react-image-crop';
import ReactJson from "react-json-view";
import 'react-image-crop/dist/ReactCrop.css';
import "./editor.css"
import {  DefaultButton,
  MessageBarButton,
  PrimaryButton, } from 'office-ui-fabric-react';


export default class ImageEditor extends PureComponent {
  state = {
    src: null,
    crop: {
      aspect: this.props.aspect ? this.props.aspect : (2100/2970),
      width: this.props.width ? this.props.width : 50,
      x: this.props.x ? this.props.x : 0,
      y: this.props.y ? this.props.y : 0,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      var name  = e.target.files[0].name
      //debugger
      reader.addEventListener('load', () =>{
       
          this.setState({ src: reader.result,name })
        
      })
      if (this.props.onFileLoaded){
        this.props.onFileLoaded(e.target.files[0])
        //reader.readAsArrayBuffer(e.target.files[0]);
      }else{
        reader.readAsDataURL(e.target.files[0]);
      }
    
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );
    this.setState({ croppedImageUrl });
      if (this.props.onPreview) {
        //debugger
        var name = this.state.name
        //this.props.onPreview(croppedImageUrl,name)
      }
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      const base64Image = canvas.toDataURL('image/jpeg');
      return(resolve(base64Image))
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="App">
      <div style={{display:"flex",width:this.props.width}}>
      {this.state.name &&
        (
          <div className="ximgCropper" style={{ flexGrow:"1", height:this.props.height,width:this.props.width/3}}>
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
          </div>
        )}
        
        

         {true && croppedImageUrl && (
                   <div className="ximgCropper" style={{ flexGrow:"1",  height:this.props.height,width:this.props.width/3}}>

          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
          <PrimaryButton onClick={()=>{
              if (this.props.onImageSelected){
                this.props.onImageSelected(croppedImageUrl,this.state.name)
              }
          }} text="Accept"/>
          
           <DefaultButton text="Clear" onClick={()=>{
            this.setState({crop:null, croppedImageUrl:null, src:null,name:null })}}>
            </DefaultButton>}
           </div>
        )}
        </div>
        {!croppedImageUrl && 
        <div className="imgFile">
          <input type="file" onChange={this.onSelectFile}  />
        </div>}
       
        {/* <h1>Editor</h1>
         */}

     
      </div>
    );
  }
}
