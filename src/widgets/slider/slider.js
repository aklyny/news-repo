import React,{Component} from 'react';
import {firebase,firebaseArticle,firebaseLopper} from '../../firebase';
import SlideTemp from './slidetemp';
class Slider extends Component{

    state= {
        news:[]
    }
    componentWillMount(){
       firebaseArticle.limitToFirst(3).once('value')
       .then((snapShot)=>{
         const news = firebaseLopper(snapShot)
        const asyncFunction = (item,i,resolve)=>{
            firebase.storage().ref('images').child(item.image).getDownloadURL()
           .then(url=>{
               news[i].image = url;
                resolve()
           })
        }
         let request = news.map((item,i)=>{
             return new Promise((resolve)=>{
                 asyncFunction(item,i,resolve)
             })
         })
         Promise.all(request).then(()=>{
             this.setState({
                 news
             })
         })

    //    news.forEach((item,i)=>{
    //        firebase.storage().ref('images').child(item.image).getDownloadURL()
    //        .then(url=>{
    //            news[i].image = url;
    //            this.setState({
    //                news
    //            })
    //        })
    //    })
     })
    }
    render(){
    return(
        <div>
          <SlideTemp data= {this.state.news} type={this.props.type}/>
        </div>
    )
}
}
export default Slider;