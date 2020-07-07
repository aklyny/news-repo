import React from 'react';
import Slick from 'react-slick';
import style from './slidetemp.module.css';
import {Link} from 'react-router-dom';
const slide = (props)=>{
      let template = null;
      const settings ={
          dots:false,
          infinite:true,
          arrows:false,
          speed:500,
          slidesToShow:1,
          slidesToScroll:1
      }  
      switch(props.type){
            case ('slide'):
                template = props.data.map((item,i)=>{
                    return(
                        <div key={i}>
                            <div className={style.slide_item}>
                                <div className={style.slide_image}
                                style={{
                                    background:`url(${item.image})`
                                }}
                                > </div>
                                <Link to={`/articles/${item.id}`}>
                                    <h1>{item.title}</h1>
                                </Link>
                            </div>
                        </div>
                    )
                })
                break;
            default: template = null;    
      }
     return(
       
          <Slick {...settings} className={style.slick}>
              {template}
          </Slick>  
        
    )
}

export default slide;