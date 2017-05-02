import React from 'react';

import "./board.css";

const Piece = ({color, onClick}) => (
    <button 
        className={color}
        onClick={onClick} >
        
    </button>
)

export default Piece