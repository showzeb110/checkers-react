import React, { PropTypes } from 'react';
import Piece from './Piece';

const Square = ({className, row, column, locations, onClick}) => {

    if (locations[row+column] !== "") {
        let squareClassname = className;
        squareClassname += " movable";
        let isSelected = "";
        if (locations[row+column].isSelected) {
            isSelected = " selected";
        }
        return (
            <div className={squareClassname}>
                <Piece 
                    color={"pieces piece " + isSelected + locations[row+column].team}
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