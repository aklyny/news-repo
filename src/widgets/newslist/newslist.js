import React,{Component} from 'react';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import style from './newslist.module.css';
import Button from '../LoadMore/button';
import Card from './card';
import {firebaseArticle,firebaseTeams,firebaseLopper} from '../../firebase';
class NewsList extends Component{
    state = {
        list:[],
        teams:[],
        start:this.props.start,
        end:this.props.start+this.props.amount,
        amount:this.props.amount
    }
    componentWillMount(){
        this.request(this.state.start,this.state.end);
    }
    request(start,end){
        if(this.state.teams.length<1){
            firebaseTeams.once('value')
            .then((snapShot)=>{
                const teams = firebaseLopper(snapShot);
                this.setState({
                    teams
                })
            }).catch(e=>{
                console.log(e)
            })
            // axios.get(`${URL}/teams`)
            // .then(res=>{
            //     this.setState({
            //         teams:res.data
            //     })
            // })
        }
        firebaseArticle.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapShot)=>{
            const article = firebaseLopper(snapShot);
            this.setState({
                list:[...this.state.list,...article],
                start,
                end
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    loadMore= ()=>{
        let end = this.state.end + this.state.amount;
        this.request(this.state.end +1 ,end);
    }
    newsRender=(type)=>{
        let template = null;
        switch(type){
            case ('card'):
                template = this.state.list.map((item,i)=>(
                   <CSSTransition
                   classNames={{
                       enter:style.newslist_wrap,
                       enterActive:style.news_active,
                       }}
                       timeout={500}
                       key={i}
                   >
                        <div key={i} className={style.news}>
                   
                        <Link to={`/articles/${item.id}`}>
                        <Card
                          teams= {this.state.teams}
                          id = {item.team}
                          date={item.date}  
                        />
                        <h2>{item.title}</h2>
                        </Link>
                        
                    </div>
                   </CSSTransition>
                   
                ))
            break; 
            case ('cardMain' ):
                template = this.state.list.map((item,i)=>(
                    <CSSTransition
                    classNames={{
                        enter:style.newslist_wrap,
                        enterActive:style.news_active,
                        }}
                        timeout={500}
                        key={i}
                    >
                    <Link to={`/articles/${item.id}`}>
                        <div className={style.main_wrap}>
                        <div className={style.left}
                        style={{
                            background:`url('/images/articles/${item.image}')`
                        }}
                        >
                        <div></div>
                        </div>
                         <div className={style.right}>
                         <Card
                          teams= {this.state.teams}
                          id = {item.team}
                          date={item.date}  
                        />
                        <h2>{item.title}</h2>
                         </div>   
                        </div>
                    </Link>
                    </CSSTransition>))
                break;
             default: template=null;
        }
        return template;
    }
    render(){
        return(
            <div>
                <TransitionGroup 
                component='div'
                className='list'
                >
                {this.newsRender(this.props.type)}
                </TransitionGroup>
                <Button 
                 type='loadMore'
                 loadMore={()=>this.loadMore()}
                 title='Load More News'    
                />
            </div>
        )
    }
}

export default NewsList;