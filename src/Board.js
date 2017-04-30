import React, { Component } from 'react';
import Square from './Square';
import Label from './Label';
import './board.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            locations : createInitLocations()
        };
    }
    
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
                                        <Square key={i.toString() + j.toString()} className={col} row={i.toString()} column={bottomLabel[j -1]} locations={this.state.locations}/> 
                                    
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

function createInitLocations() {
    return  {   "1h":"", "1g":{"team":"white", "isKing":false}, "1f":"", "1e":{"team":"white", "isKing":false}, "1d":"", "1c":{"team":"white", "isKing":false}, "1b":"", "1a":{"team":"white", "isKing":false}, 
                "2h":{"team":"white", "isKing":false}, "2g":"", "2f":{"team":"white", "isKing":false}, "2e":"", "2d":{"team":"white", "isKing":false}, "2c":"", "2b":{"team":"white", "isKing":false}, "2a":"", 
                "3h":"", "3g":{"team":"white", "isKing":false}, "3f":"", "3e":{"team":"white", "isKing":false}, "3d":"", "3c":{"team":"white", "isKing":false}, "3b":"", "3a":{"team":"white", "isKing":false},
                "4h":"", "4g":"", "4f":"", "4e":"", "4d":"", "4c":"", "4b":"", "4a":"",
                "5h":"", "5g":"", "5f":"", "5e":"", "5d":"", "5c":"", "5b":"", "5a":"",
                "6h":{"team":"red", "isKing":false}, "6g":"", "6f":{"team":"red", "isKing":false}, "6e":"", "6d":{"team":"red", "isKing":false}, "6c":"", "6b":{"team":"red", "isKing":false}, "6a":"", 
                "7h":"", "7g":{"team":"red", "isKing":false}, "7f":"", "7e":{"team":"red", "isKing":false}, "7d":"", "7c":{"team":"red", "isKing":false}, "7b":"", "7a":{"team":"red", "isKing":false},
                "8h":{"team":"red", "isKing":false}, "8g":"", "8f":{"team":"red", "isKing":false}, "8e":"", "8d":{"team":"red", "isKing":false}, "8c":"", "8b":{"team":"red", "isKing":false}, "8a":"", 
            };
}
export default Board