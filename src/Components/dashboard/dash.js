import React,{Component} from 'react';
import style from './dash.module.css';
import FormField from '../Formfields/formfield'
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {firebaseTeams,firebaseArticle,firebase} from '../../firebase';
import FileUpload from '../../widgets/Fileuploader/file_uploader';
class DashBoard extends Component{
    state= {
        editorState:EditorState.createEmpty(),
        postError:'',
        loading:false,
        formdata:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:'author_name',
                    type:'text',
                    placeholder:'Enter Your Name'
                },
                validation:{
                    required:true,
                },
                touched:false,
                valid:false,
                validationMsg:''
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:'title_name',
                    type:'text',
                    placeholder:'Enter the title'
                },
                validation:{
                    required:true,
                },
                touched:false,
                valid:false,
                validationMsg:''
            },
            body:{
                element:'texteditor',
                value:'',
                valid:true
            },
            image:{
                element:'image',
                value:'',
                valid:true
            },
            team:{
                element:'select',
                value:'',
                config:{
                    name:'team_input',
                    options:[]
                },
                validation:{
                    required:true,
                },
                touched:false,
                valid:false,
                validationMsg:''
            }
        }
    }
    componentDidMount(){
        this.loadTeams()
    }
    submitForm = (event)=>{
        event.preventDefault();
 
            let dataSubmit={};
            let  formValid = true;
            for(let key in this.state.formdata){
                dataSubmit[key]=this.state.formdata[key].value;
            for(let key in this.state.formdata){
                formValid = this.state.formdata[key].valid && formValid;
            }
            console.log(dataSubmit)
            if(formValid){
                this.setState({
                    loading:true,
                    postError:''

                })
                firebaseArticle.orderByChild('id').limitToLast(1)
                .once('value')
                .then(snapShot=>{
                    let articleId=null;
                    snapShot.forEach(data=>{
                        articleId=data.val().id
                    })
                    dataSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                    dataSubmit['id']=articleId+1
                    dataSubmit['team']=parseInt(dataSubmit['team'],10)
                    firebaseArticle.push(dataSubmit)
                    .then(article=>{
                        this.props.history.push(`/articles/${article.key}`)
                    })
                    .catch(err=>{
                        this.setState({
                            postError:err.message
                        })
                    })
                })
            }else{
                this.setState({
                    postError:'Somwthing went wrong'
                })
            }}
    }

    loadTeams = ()=>{
        firebaseTeams.once('value')
        .then((snapShot)=>{
            let team = [];
            snapShot.forEach((childSnapshot)=>{
                team.push({
                    id:childSnapshot.val().teamId,
                    name:childSnapshot.val().city
                })
            })
           const newFormData = {...this.state.formdata}
           const newElement = {...newFormData['team']}
           newElement.config.options=team;
           newFormData['team']=newElement;
           this.setState({
               formdata:newFormData
           })
        })
    }
    updateForm = (element,content='')=>{
        const newData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newData[element.id]
        }
        if(content===''){
            newElement.value = element.event.target.value;
        }
        else{
            newElement.value = content;
        }

        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid=validData[0];
            newElement.validationMsg=validData[1];
        }
        newElement.touched=element.blur;
        newData[element.id]=newElement 
        this.setState({
            formdata:newData
        })
    }
    validate =(data)=>{
        let err = [true,''];
        if(data.validation.required){
            const valid= data.value.trim() !=='';
            const msg=`${!valid ? 'Field is Required':''} `
            err = !valid ? [valid,msg]:err
        }
        return err;
    }
    submitButton = ()=>(
        this.state.loading ? <div><h2>loading......</h2></div> :
        <div className={style.btn}>
            <button type="submit">Add Post</button>
        </div>
    )
    showError = ()=>(
        this.state.postError !=='' ? 
        <div className={style.regerr}>{this.state.postError}</div>
        :''
    )
    onEditorStateChange = (editorState)=>{
        let curContent = editorState.getCurrentContent();
        let html = stateToHTML(curContent)
            this.updateForm({id:'body'},html)
        this.setState({
            editorState
        })
    }
    storeFilename = (filename)=>{
        this.updateForm({id:'image'},filename);

    }
    render(){
        return(
            <div className={style.dash}>
                <form onSubmit={this.submitForm}>
                <h2>Add post</h2>
                <FileUpload 
                    filename={(filename)=>this.storeFilename(filename)}
                />
                <FormField
                     id={'author'}
                     formdata={this.state.formdata.author}  
                     change = {(element)=>this.updateForm(element)} 
                />
                <FormField
                     id={'title'}
                     formdata={this.state.formdata.title}  
                     change = {(element)=>this.updateForm(element)} 
                />
                <Editor 
                editorState={this.state.editorState}
                wrapperClassName="myeditor_wrap"
                editorClassName="editor"
                onEditorStateChange={this.onEditorStateChange}    
                />
                 <FormField
                 id={'team'}
                 formdata={this.state.formdata.team}  
                 change = {(element)=>this.updateForm(element)} 
                />
                    {this.submitButton()}  
                    {this.showError()}
                </form>
            </div>
        )
    }
}



export default DashBoard;