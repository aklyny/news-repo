import React from 'react';
import VideoList from '../../../widgets/videolist/videolist';

const VideosMain = ()=>{
    return(
        <div>
             <VideoList
             type='card'
             title={true}
             loadMore={true}
             start={0}
             amount={6}  
            />
        </div>
    )
}


export default VideosMain;