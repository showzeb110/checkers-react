import React, { Component } from 'react';
import Square from './Square';
import Label from './Label';
import './board.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            locations : createInitLocations() ,
            whiteIsNext : true ,
            currentSelection : ""
        };
    }
    
    handleClick(row, column) {
        console.log(row + " " + column);
        const key = row + column;
        if (this.state.currentSelection) {
            //User has previously clicked on valid piece and clicked on another square
            if (isNextMoveValid(this.state.locations,  this.state.currentSelection, key)) {
                let teamStateCopy = JSON.parse(JSON.stringify(this.state.locations)) ;
                teamStateCopy[key] = teamStateCopy[this.state.currentSelection];
                teamStateCopy[key].isSelected = false;
                teamStateCopy[this.state.currentSelection] = "";
                this.setState({
                    whiteIsNext : !this.state.whiteIsNext ,
                    locations : teamStateCopy ,
                    currentSelection : ""
                });
            }
        } else {
            let teamStateCopy = JSON.parse(JSON.stringify(this.state.locations)) ;
            if (this.state.whiteIsNext && teamStateCopy[key].team === "white") {
                teamStateCopy[key].isSelected = true;
                this.setState({
                    whiteIsNext : this.state.whiteIsNext ,
                    locations : teamStateCopy ,
                    currentSelection : key
                });
            } else if (!this.state.whiteIsNext && teamStateCopy[key].team === "red") {
                teamStateCopy[key].isSelected = true;
                this.setState({
                    whiteIsNext : this.state.whiteIsNext ,
                    locations : teamStateCopy ,
                    currentSelection : key
                });
            }
        }
    }

    render() {
        const row = [1, 2, 3, 4, 5, 6, 7, 8];
        const bottomLabel = ["h", "g", "f", "e", "d", "c", "b", "a"];
        let status = 'Next player: ' + (this.state.whiteIsNext ? 'White' : 'Red');

        return (
            <div>
                <div className="board">
                    {row.map(i => {
                        return (
                            <div key={i} className="board-row">
                                {/*<Label key={i.toString() + "Label"} className="rowLabel" text={i.toString()} />*/}
                                {row.map(j => {
                                    var col = "square light";
                                    if ( (j+i) % 2 === 0) {
                                        col = "square dark";
                                    }
                                    return ( 
                                            <Square 
                                                key={i.toString() + j.toString()} 
                                                className={col} 
                                                row={i.toString()} 
                                                column={bottomLabel[j -1]} 
                                                locations={this.state.locations}
                                                onClick={this.handleClick.bind(this)} /> 
                                        
                                    )
                                })}
                            </div>
                        )
                    })}
                    {/*<div className="board-row">
                        {bottomLabel.map(k => {
                            return (<Label key={k} className="bottomLabel" text={k} />)
                        })}
                    </div>*/}
                </div>
                {/*<div className="game-info">
                    <div>{status}</div>
                </div>*/}
            </div>
        )
    }
}

function isNextMoveValid(locations, pieceLoc, selectionLoc) {
    const piece = locations[pieceLoc];
    const bottomLabel = ["h", "g", "f", "e", "d", "c", "b", "a"];

    const pieceLocRow = parseInt(pieceLoc.substring(0, 1));
    const pieceLocCol = pieceLoc.substring(1);
    const pieceLocColIdx = bottomLabel.indexOf(pieceLocCol);
    const selectionLocRow = parseInt(selectionLoc.substring(0, 1));
    const selectionLocCol = selectionLoc.substring(1);
    const selectionLocColIdx = bottomLabel.indexOf(selectionLocCol);

    if (piece.team === "white") {
        if(selectionLocRow > pieceLocRow && (selectionLocColIdx + 1 === pieceLocColIdx || selectionLocColIdx - 1 === pieceLocColIdx)) {
            return true;
        } else {
            return false;
        }
    } else if (piece.team === "red") {
        if(selectionLocRow < pieceLocRow && (selectionLocColIdx + 1 === pieceLocColIdx || selectionLocColIdx - 1 === pieceLocColIdx)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
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