import React from 'react'
import  { jumpto365API } from '../../api/pto365'

export default class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      tags:props.tags
    }
    
  }
  onFormSubmit = (e) =>{
    e.preventDefault() // Stop form submit
    this.setState({fileprogress:"uploading ..."})
    this.fileUpload(this.state.file)
    .then((response)=>{
      this.setState({fileprogress:"uploaded"})
      if (this.props.onUploaded) {
        this.props.onUploaded(response)
     }
      else {
      console.log(response.data);
    }
    })
    .catch(error => {
      this.setState({error})
    })
  }
  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }
  fileUpload = (file) => {

    return jumpto365API.uploadFile(file,this.state.tags)
  }

  render() {
    if (this.state.error){
      return (JSON.stringify(this.state.error))
    }
    if (this.state.fileprogress){
      return (this.state.fileprogress)
    }

    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}