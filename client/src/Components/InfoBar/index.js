import React from 'react'

import onlineIcon from '../../Icon/onlineIcon.png';
import closeIcon from '../../Icon/closeIcon.png';

import './style.css'

export default function InfoBar({room}) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close icon" /></a>
            </div>
        </div>
    )
}
