import React from 'react';
import FontAwesome from 'react-fontawesome';
import style from './card.module.css';
import moment from 'moment';
const Card = (props)=>{
const teamrender= (teams,id)=>{
    let data = teams.find((item)=>{
        return item.teamId === id 
    })
    if(data){
        return data.name;
    }
}
const formatDate = (date)=>{
    return moment(date).format('MM-DD-YYYY');
}
return(
    <div className={style.card}>
       <span className={style.teamname}>
            {teamrender(props.teams,props.id)}
       </span>
       <span className={style.date}>
           <FontAwesome name="clock-o"/>
            {formatDate(props.date)}
       </span>
    </div>
)
}


export default Card;