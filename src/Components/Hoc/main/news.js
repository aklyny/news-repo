import React from 'react';
import Slider from '../../../widgets/slider/slider';

import NewsList from '../../../widgets/newslist/newslist';

const NewsMain = ()=>{
    return(
        <div>
           <Slider
             type='slide'
             start={0}
             end={6}
            />
            <NewsList
             type='cardMain'
             start={0}
             amount={3}
             loadMore={true}   
            />
        </div>
    )
}

export default NewsMain;