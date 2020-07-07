import React from 'react';
import style from './button.module.css';
import {Link} from 'react-router-dom';

const Button = (props)=>{
    let template =null;
    switch(props.type){
        case 'loadMore':
            template = (
                <div className={style.btn}
                onClick={props.loadMore}
                >
                    {props.title}
                </div>
            )
            break;
            case 'link':
                template=(
                    <Link to={props.linkTo}
                    className={style.btn}
                    >{props.title}</Link>
                )
            break;
        default:template =null;    
    }
    return template;
  
} 

export default Button;