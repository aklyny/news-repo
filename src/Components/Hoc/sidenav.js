import React from 'react';
import SideNav from 'react-simple-sidenav';
import NavItems from './navitems';


const Navbar = (props)=>{
  
    return(
        <div>
            <SideNav
            showNav ={props.showNav}
            onHideNav = {props.hideNav}
            navStyle={{
                background:'#242424',
                maxWidth:'300px'

            }}
            >
                <NavItems {...props}/>
            </SideNav>
        </div>
    )
}

export default Navbar;