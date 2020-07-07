import React,{Component} from 'react';
import style from './videolist.module.css';
import Button from '../LoadMore/button';
import VideoTemp from './videotemp';
import { firebaseTeams, firebaseVideos, firebaseLopper } from '../../firebase';
class VideoList extends Component{
    state = {
        teams:[],
        videos:[],
        start:this.props.start,
        amount:this.props.amount,
        end:this.props.start+this.props.amount
    }
    componentWillMount(){
        this.request(this.state.start,this.state.end)
    }
    request = (start,end)=>{
        if(this.state.teams.length < 1){
            firebaseTeams.once('value')
            .then((snapShot)=>{
                const teams = firebaseLopper(snapShot);
                this.setState({
                    teams
                })
            })

        }
        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapShot)=>{
            const videos = firebaseLopper(snapShot);
            this.setState({
                videos:[...this.state.videos,...videos],
                start,
                end
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    renderTitle = (title)=>{
        return title ?
        <h3><strong>NBA</strong> Videos</h3>
        :null
    }
    loadMore = ()=>{
        let end = this.state.start+this.state.amount;
        this.request(this.state.end + 1,end);
    }
    renderButton = ()=>{
        return this.props.loadMore ? 
        <Button
            type='loadMore'
            title='Load More Videos'
            loadMore={()=>this.loadMore()}
        />
        :
        <Button
            type='link'
            title='More Videos'
            linkTo='/videos'
        />
    }
    renderVideos = ()=>{
        let template= null;
        switch(this.props.type){
            case 'card':
                template= <VideoTemp data={this.state.videos} teams={this.state.teams} />
                
            break;
            default: template=null;    
        }
        return template;
    }
    render(){
    return(
        <div className={style.video}>
          {this.renderTitle(this.props.title)}
          {this.renderVideos()}
          {this.renderButton()}
        </div>
    )
}
}

export default VideoList;