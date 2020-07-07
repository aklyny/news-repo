import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {firebase} from './firebase';
//dependies
import {BrowserRouter} from 'react-router-dom';
//components
import Routes from './routes'
const App = (props)=>{
  return(
    <div>
     <BrowserRouter>
      <Routes {...props}/>
     </BrowserRouter>
    </div>
  )
}
firebase.auth().onAuthStateChanged((user)=>{
  ReactDOM.render(<App user={user}/>,document.getElementById('root'));
})
