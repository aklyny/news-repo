import React from 'react';
import style from './header.module.css';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import SideNav from './sidenav';


const Header = (props)=>{

    const logo = ()=>{
        return(
            <Link to='/' className={style.logo}>
                <img alt='nba log' src='/images/nba_logo.png' />
            </Link>
        )
    }
    const navs = ()=>(
        <div className={style.bar}>
            <FontAwesome name='bars'
            onClick={props.openNav}
            style= {{
                color:'yellow',
                cursor:'pointer',
                padding:'6px'
            }}
            ></FontAwesome>
        </div>
    )
    return(
        
        <header className={style.nav}>
           <SideNav {...props} />
            <div className={style.view}>
                
                <div className={style.headerOpt}>
                {navs()}
                {logo()}
                </div>
            </div>
        </header>
    )
}

export default Header;