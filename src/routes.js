import React from 'react';
import {Switch} from 'react-router-dom';
import Home from './home/home';
import Layout from './layout/layout';
import Articles from './Components/Article/article';
import Videos from './Components/Videos/videos';
import NewsMain from './Components/Hoc/main/news';
import VideosMain from './Components/Hoc/main/videos';
import SignIn from './Components/signin/signin';
import DashBoard from './Components/dashboard/dash';
import PublicRoute from './Components/AuthRoute/public';
import PrivateRoute from './Components/AuthRoute/private';
const routes = (props)=>  {
        return (
            <Layout user={props.user}>
           <Switch>
               <PublicRoute {...props} restricted={false} path='/' exact component={Home} />
               <PublicRoute {...props} restricted={false} path='/articles/:id' exact component={Articles}/>
               <PublicRoute {...props} restricted={false} path='/videos/:id' exact component={Videos}/>
               <PublicRoute {...props} restricted={false} path='/articles' exact component={NewsMain}/>
               <PublicRoute {...props} restricted={false} path='/videos' exact component={VideosMain}/>
               <PublicRoute {...props} restricted={true} path='/sign-in' exact component={SignIn} />
               <PrivateRoute {...props} path='/dashboard' exact component={DashBoard} />
           </Switch>
            </Layout>
        );
    }


export default routes;