import React from 'react';
import TeamInfo from './teaminfo';
import PostData from './postdata';
const Header = (props)=>{
    const teamInfo = (team)=>{
        return team ?(
            <TeamInfo team={team}/>
        )
        :null
    }
    const postDate = (date,author) =>(
        <PostData data={{date,author}}/>
    )
    return(
        <div>
           {teamInfo(props.teamData)}
           {postDate(props.date,props.author)}
        </div>
    )
}


export default Header;