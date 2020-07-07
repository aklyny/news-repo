import React from 'react';
import style from './videos.module.css';
import VideoTemp from '../../widgets/videolist/videotemp';

const Related = (props)=>{
    console.log(props)
    return(
        <div className={style.con}>
        <VideoTemp data={props.data} teams={props.teams} />
        </div>
    )
}

export default Related;