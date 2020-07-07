import React from 'react';
import style from './body.module.css';

const Content = (props)=>{

    return(
        <div className={style.article_body}>
            <h1>{props.article.title}</h1>
            <div className={style.article_image} style={{
                background:`url('${props.image}')`
            }}
            ></div>
            <div className={style.article_text}
            dangerouslySetInnerHTML={{
                __html:props.article.body
            }}
            >

            </div>
        </div>
    )
}

export default Content;