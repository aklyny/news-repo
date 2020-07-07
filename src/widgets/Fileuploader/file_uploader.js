import React,{Component} from 'react';
import {firebase} from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class FileUpload extends Component{
state={
    name:'',
    isUplaoding:false,
    progress:0,
    fileURL:''
}

handleUploadStart = ()=>{
    this.setState({isUplaoding:true,progress:0})
}
handleUploadError = (err)=>{
    this.setState({isUplaoding:false})
    console.log(err)
}
handleUploadSuccess = (filename)=>{
    console.log(filename)
    this.setState({
        name:filename,
        progress:100,
        isUplaoding:false
    })
    firebase.storage().ref('images')
    .child(filename).getDownloadURL()
    .then(url=>{ this.setState({
         fileURL:url
        })
    })
    this.props.filename(filename)
}
handleProgress = (progress)=>{
        this.setState({
            progress:progress
        })
}
    render(){
        return(
            <div>
               <FileUploader
                accept="image/*"
                name='image'
                randomizeFilename
                storageRef={firebase.storage().ref('images')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}   
               />
               {this.state.isUplaoding ? 
               <p>Progress : {this.state.progress}%</p>
               :null
               }
               {this.state.fileURL ? 
               <img 
               alt='img'
                style={{
                    width:'500px',
                    height:'300px'
                }}   
                src={this.state.fileURL}
               />
               :''}
            </div>
        )
    }
}


export default FileUpload;