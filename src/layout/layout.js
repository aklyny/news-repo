import React,{Component} from 'react';
import style from './layout.module.css';
import Header from '../Components/Hoc/header';
import Footer from '../Components/Hoc/footer';


class Layout extends Component{

    state = {
        show:false
    } 
    toggle = (action)=>{
        this.setState({
            show:action
        })
    }
    render(){
        return(
            <div>
                <Header user={this.props.user} className={style.name}
                    showNav = {this.state.show}
                    hideNav = {()=> this.toggle(false)}
                    openNav = {()=> this.toggle(true)}
                />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Layout;