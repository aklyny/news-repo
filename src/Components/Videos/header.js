import React from 'react';
import TeamInfo from '../Article/teaminfo';
const Header = (props)=>{
    const teaminfo = (team)=>{
        return team ?
        <TeamInfo team={team}/>
        :null
    }
    return(
        <div>
            {teaminfo(props.teamData)}
        </div>
    )
}

export default Header;