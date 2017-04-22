import React, { Component } from 'react';
import Square from './Square';
import Label from './Label';
import './board.css';

class Board extends Component {
    
    render() {
        const row = [1, 2, 3, 4, 5, 6, 7, 8];
        const bottomLabel = ["h", "g", "f", "e", "d", "c", "b", "a"];

        return (
            <div>
                {row.map(i => {
                    return (
                        <div key={i} className="board-row">
                            <Label key={i.toString() + "Label"} className="rowLabel" text={i.toString()} />
                            {row.map(j => {
                                var col = "squareOdd";
                                if ( (j+i) % 2 === 0) {
                                    col = "squareEven";
                                }
                                return ( 
                                        <Square key={i.toString() + j.toString()} className={col} /> 
                                    
                                )
                            })}
                        </div>
                    )
                })}
                <div className="board-row">
                    {bottomLabel.map(k => {
                        return (<Label key={k} className="bottomLabel" text={k} />)
                    })}
                </div>
            </div>
        )
    }
}

export default Board