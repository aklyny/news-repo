import React,{Component} from 'react';
import style from './videos.module.css';
import Headerr from './header';
import Related from './related';
import {firebaseTeams,firebaseDB, firebaseLopper,firebaseVideos} from '../../firebase';
class Videos extends Component{
    state = {
       article:[],
       team:[],
       teams:[],
       related:[]
    }
    componentWillMount(){
        firebaseDB.ref(`/videos/${this.props.match.params.id}`).once('value')
        .then((snapShot)=>{
            let article = snapShot.val();
            firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then((snapShot)=>{
                const team = firebaseLopper(snapShot);
                this.setState({
                    article:article,
                    team:team
                    
                })
                this.getRelated();
            })
        })
        // axios.get(`${URL}/videos/?id=${this.props.match.params.id}`)
        // .then(res=>{
        //     let article= res.data[0];
        //     axios.get(`${URL}/teams/?id=${article.id}`)
        //     .then(res=>{
        //         this.setState({
        //             article,
        //             team:res.data
        //         })
                
        //     })
        // })
    }
    getRelated = ()=>{
        firebaseTeams.once('value')
        .then((snapShot)=>{
            let teams = firebaseLopper(snapShot);
            firebaseVideos.orderByChild("team").equalTo(this.state.article.team)
            .limitToFirst(3).once('value')
            .then((snapShot)=>{
                const related = firebaseLopper(snapShot);
                this.setState({
                    related:related,
                    teams
                })
            })
        })
        // axios.get(`${URL}/teams`)
        // .then(res=>{
        //     let teams = res.data;
        //     axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //     .then(res=>{
        //         this.setState({
        //             teams:teams,
        //             related:res.data
        //         })
        //     })
        // })
    }
    render(){
        const article = this.state.article;
        const team =this.state.team;
        console.log(team)
        return(
            <div>
                <Headerr 
               teamData= {team[0]} />
           <div className={style.video_wrap}>
           <h1>{article.title}</h1>
           <iframe
               title='videoplayer'
               width='100%'
               height='300px'
               src={`https://www.youtube.com/embed/${article.url}`}
           />
           </div>
           <Related
             data= {this.state.related}
             teams={this.state.teams}  
           />
            </div>
        )
    }
}


export default Videos;