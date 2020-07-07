import React from 'react';
import style from './article.module.css';
import moment from 'moment';

const PostData = (props)=>{
    const dateRender =(date)=>{
        return moment(date).format('MM-DD-YYYY')
    }
return(
    <div className={style.postdata}>
        <div>
            Date :
            <span><strong>{dateRender(props.data.date)}</strong></span>
        </div>
        <div>
            Arthor:
            <span><strong>{props.data.author}</strong></span>
        </div>
    </div>
)
}

export default PostData;