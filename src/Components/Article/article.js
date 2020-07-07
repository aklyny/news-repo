import React,{Component} from 'react';
import {firebase,firebaseDB,firebaseTeams,firebaseLopper} from '../../firebase';
import Header from './header';
import Content from './content'
class Articles extends Component{
    state= {
        article:[],
        team:[],
        imageURL:''
    }
    componentWillMount(){
        firebaseDB.ref(`/articles/${this.props.match.params.id}`).once('value')
        .then((snapShot)=>{
            let article = snapShot.val();
            firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then((snapShot)=>{
                const team = firebaseLopper(snapShot);
                this.setState({
                    article,
                    team
                })
                this.getImage(article.image)
            })
        })
    }
    getImage= (filename)=>{
        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then(url=>{
            this.setState({
                imageURL:url
            })
        })
    }
    render(){
        const article = this.state.article;
        const team = this.state.team;
        return(
            <div>
              <Header
               teamData= {team[0]} 
               date={article.date}
               author={article.author}  
              />
              <Content article={article} image= {this.state.imageURL}/>
            </div>
        )
    }
}

export default Articles;