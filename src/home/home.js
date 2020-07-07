import React from 'react'
import Slider from '../widgets/slider/slider'
import NewsList from '../widgets/newslist/newslist';
import VideoList from '../widgets/videolist/videolist'
const home = ()=>{
    return(
        <div>
            <Slider
             type='slide'
             start={0}
             end={3}
            />
            <NewsList
             type='card'
             start={0}
             amount={3}
             loadMore={true}   
            />
            <VideoList
             type='card'
             title={true}
             loadMore={true}
             start={0}
             amount={3}  
             />
        </div>
    )
}


export default home;