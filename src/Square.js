import React, { PropTypes } from 'react';
import Piece from './Piece';

const Square = ({className, row, column, locations}) => {

    if (locations[row+column] !== "") {
        return (
            <div className={className}>
                <Piece color={"piece " + locations[row+column].team}/> 
            </div>
        )
    } else {
        return (
            <div className={className}> 
            </div>
        )
    }
    
}

export default Square