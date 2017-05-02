import React, { PropTypes } from 'react';
import Piece from './Piece';

const Square = ({className, row, column, locations, onClick}) => {

    if (locations[row+column] !== "") {
        let squareClassname = className;
        if (locations[row+column].isSelected) {
            squareClassname += " selected";
        }
        return (
            <div className={squareClassname}>
                <Piece 
                    color={"piece " + locations[row+column].team}
                    onClick={() => onClick(row, column)} /> 
            </div>
        )
    } else {
        return (
            <div 
                className={className}
                onClick={() => onClick(row, column)} > 
            </div>
        )
    }
    
}

export default Square