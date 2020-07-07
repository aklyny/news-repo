import React,{Component} from 'react';
import style from './signin.module.css';
import FormField from '../Formfields/formfield';
import {firebase} from '../../firebase';

class SignIn extends Component{
    state= {
        registerError:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    type:'email',
                    placeholder:'Enter Your Email'
                },
                validation:{
                    required:true,
                    email:true
                },
                touched:false,
                valid:false,
                validationMsg:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    type:'password',
                    placeholder:'Enter Ur Password'
                },
                valid:false,
                touched:false,
                validationMsg:'',
                validation:{
                    required:true,
                    password:true
                }
            }
        }
    }
    updateForm = (element)=>{
        const newData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newData[element.id]
        }
        newElement.value = element.event.target.value;
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
        if(data.validation.email){
            const valid= /\S+@\S+\.\S+/.test(data.value);
            const msg=`${!valid ? 'Invalid mail id':''} `
            err = !valid ? [valid,msg]:err
        }
        if(data.validation.password){
            const valid= data.value.length >=5;
            const msg=`${!valid ? 'Must be greater than 5 character':''} `
            err = !valid ? [valid,msg]:err
        }
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
            <button onClick={(event)=>this.submitForm(event,false)}>Register</button>
            <button onClick={(event)=>this.submitForm(event,true)}>Log in</button>
        </div>
    )
    submitForm = (event,type)=>{
        event.preventDefault();
        if(type!==null){
            let dataSubmit={};
            let  formValid = true;
            for(let key in this.state.formdata){
                dataSubmit[key]=this.state.formdata[key].value;
            }
            for(let key in this.state.formdata){
                formValid = this.state.formdata[key].valid && formValid;
            }
            if(formValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataSubmit.email,
                        dataSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch(err=>{
                        this.setState({
                            loading:false,
                            registerError:err.message

                        })
                    }) 
                }else{
                    firebase.auth().createUserWithEmailAndPassword(
                        dataSubmit.email,
                        dataSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch(err=>{
                        this.setState({
                            loading:false,
                            registerError:err.message

                        })
                    })
                }
            }
        }
    }
    showError = ()=>(
        this.state.registerError !=='' ? 
        <div className={style.regerr}>{this.state.registerError}</div>
        :''
    )
    render(){
        return(
            <div className={style.logcont}>
            <h2>Register</h2>
                <form onSubmit={(event)=>this.submitForm(event,null)}>
                    <FormField
                     id={'email'}
                     formdata={this.state.formdata.email}  
                     change = {(element)=>this.updateForm(element)} 
                    />
                     <FormField
                     id={'password'}
                     formdata={this.state.formdata.password}  
                     change = {(element)=>this.updateForm(element)} 
                    />
                    {this.submitButton()}
                    {this.showError()}
                </form>         
            </div>
        )
    }
}

export default SignIn;