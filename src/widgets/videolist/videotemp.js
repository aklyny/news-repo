import React from 'react';
import {Link} from 'react-router-dom';
import Card from '../newslist/card';
import style from './videotemp.module.css';

const VideoTemp = (props)=>{
   return props.data.map((item,i)=>{
      return <Link to={`/videos/${item.id}`} key={i}>
      <div className={style.video}>
     
        <div className={style.left}
        style={{
            background:`url(/images/videos/${item.image})`
        }}
        >
        <div></div>
    </div>
    <div className={style.right}>
    <Card
       id={item.team}
       teams={props.teams}
       date={item.date}   
      />
        <h2>{item.title}</h2>
    </div>
      </div> 
      </Link>
})   

}

export default VideoTemp;