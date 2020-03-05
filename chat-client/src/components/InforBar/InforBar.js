import React from 'react';

import closeIcon from '../../Icons/closeIcon.png';
import onlineIcon from '../../Icons/onlineIcon.png';

import './InforBar.css';

const InforBar = ({room}) => (
    <div className = "infoBar">
        <div className = "leftInnerContainer">
            <img className = "onlineIcon" src={onlineIcon} alt = "online image" />
            <h3>{room}</h3>
        </div>

        <div className = "rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /></a>
        </div>
    </div>
)

export default InforBar;