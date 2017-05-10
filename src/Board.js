import React, { Component } from 'react';
import Square from './Square';
import Label from './Label';
import './board.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            locations : createInitLocations() ,
            blackIsNext : true ,
            currentSelection : "" ,
            nextMoves : null ,
            black : 12 ,
            red : 12 ,
            multipleCheckers : false
        };
    }
    
    handleClick(row, column) {
        console.log(row + " " + column);
        const key = row + column;
        if (this.state.currentSelection) {
            if (this.state.currentSelection === key && !this.state.multipleCheckers) {
                let teamStateCopy = JSON.parse(JSON.stringify(this.state.locations)) ;
                teamStateCopy[key].isSelected = false;
                this.setState({
                    locations : teamStateCopy ,
                    currentSelection : "" ,
                    nextMoves : null ,
                    multipleCheckers : false
                });
            }
            else if (this.state.currentSelection === key && this.state.multipleCheckers) {
                let teamStateCopy = JSON.parse(JSON.stringify(this.state.locations)) ;
                teamStateCopy[key].isSelected = false;
                this.setState({
                    blackIsNext : !this.state.blackIsNext ,
                    locations : teamStateCopy ,
                    currentSelection : "" ,
                    nextMoves : null ,
                    multipleCheckers : false
                });
            }
            else if (this.state.locations[this.state.currentSelection].team === this.state.locations[key].team && !this.state.multipleCheckers) {
                let teamStateCopy = JSON.parse(JSON.stringify(this.state.locations)) ;
                teamStateCopy[key].isSelected = true;
                teamStateCopy[this.state.currentSelection].isSelected = false;
                this.setState({
                    locations : teamStateCopy ,
                    currentSelection : key ,
                    nextMoves : getNextMoves(this.state.locations[key].team, teamStateCopy, key)
                });
            }
            //User has previously clicked on valid piece and clicked on another square
            else if (this.state.nextMoves.hasOwnProperty(key)) {
                let teamStateCopy = JSON.parse(JSON.stringify(this.state.locations)) ;
                let capturedChecker = this.state.nextMoves[key];
                let red = this.state.red;
                let black = this.state.black;
                let currentSelectedPiece = teamStateCopy[this.state.currentSelection];
                if (!currentSelectedPiece.isKing && 
                        (currentSelectedPiece.team === "red" && row === "1") ||
                        (currentSelectedPiece.team === "black" && row === "8")) {
                    currentSelectedPiece.isKing = true;
                }
                if (capturedChecker !== "") {
                    if (teamStateCopy[capturedChecker].team === "red") {
                        red -= 1;
                    } else {
                        black -= 1;
                    }
                    teamStateCopy[capturedChecker] = "";
                }
                teamStateCopy[key] = teamStateCopy[this.state.currentSelection];
                teamStateCopy[key].isSelected = false;
                teamStateCopy[this.state.currentSelection] = "";
                let nextCapturableMoves = getNextMoves(teamStateCopy[key].team, teamStateCopy, key, true);
                let multipleCheckers = false;
                let blackIsNext = !this.state.blackIsNext ;
                let currentSelection = "";
                if (capturedChecker !== "" && Object.keys(nextCapturableMoves).length > 0) {
                    multipleCheckers = true;
                    blackIsNext = this.state.blackIsNext;
                    currentSelection = key ;
                    teamStateCopy[key].isSelected = true;
                }
                this.setState({
                    blackIsNext : blackIsNext ,
                    locations : teamStateCopy ,
                    currentSelection : currentSelection ,
                    nextMoves : nextCapturableMoves ,
                    red : red ,
                    black : black ,
                    multipleCheckers : multipleCheckers
                });
            }
        } else {
            let teamStateCopy = JSON.parse(JSON.stringify(this.state.locations)) ;
            if (this.state.blackIsNext && teamStateCopy[key].team === "black") {
                let nextMoves = getNextMoves("black", teamStateCopy, key);
                teamStateCopy[key].isSelected = true;
                this.setState({
                    blackIsNext : this.state.blackIsNext ,
                    locations : teamStateCopy ,
                    currentSelection : key ,
                    nextMoves : nextMoves
                });
            } else if (!this.state.blackIsNext && teamStateCopy[key].team === "red") {
                let nextMoves = getNextMoves("red", teamStateCopy, key);
                teamStateCopy[key].isSelected = true;
                this.setState({
                    blackIsNext : this.state.blackIsNext ,
                    locations : teamStateCopy ,
                    currentSelection : key ,
                    nextMoves : nextMoves
                });
            }
        }
    }

    render() {
        const row = [1, 2, 3, 4, 5, 6, 7, 8];
        const bottomLabel = ["h", "g", "f", "e", "d", "c", "b", "a"];
        let status = 'Next player: ' + (this.state.blackIsNext ? 'black' : 'Red');
        let red = 'Red count: ' + this.state.red;
        let black = 'Black count: ' + this.state.black;
        let multipleCheckerMessage = null;
        let winningMessage = (this.state.red == 0 ? "Black Wins!!" : (this.state.black == 0 ? "Red Wins!!" : null));
        if (winningMessage) {
            status = winningMessage;
        }
        if (this.state.multipleCheckers == true) {
            multipleCheckerMessage = <div>You can make another move or you can click on the selected Piece to move on</div>;
        }

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
                <div className="game-info">
                    <div>{status}</div>
                    <div>{red}</div>
                    <div>{black}</div>
                    {multipleCheckerMessage}
                </div>
            </div>
        )
    }
}

function getNextMoves(team, locations, currentLoc, onlyCapturablePieces) {
    const piece = locations[currentLoc];
    const bottomLabel = ["h", "g", "f", "e", "d", "c", "b", "a"];
    const selectionLocRow = parseInt(currentLoc.substring(0, 1));
    const selectionLocCol = currentLoc.substring(1);
    const selectionLocColIdx = bottomLabel.indexOf(selectionLocCol);
    let nextMoves = {};

    if(piece.isKing || team === "black") {
        //bottom-left
        let botLeft = (selectionLocRow + 1).toString() + bottomLabel[selectionLocColIdx - 1];
        let botLeftPiece = locations[botLeft];
        let botRight = (selectionLocRow + 1).toString() + bottomLabel[selectionLocColIdx + 1];
        let botRightPiece = locations[botRight];

        if (botLeftPiece === "" || (botLeftPiece && botLeftPiece.team !== team)) {
            if (botLeftPiece === ""  && !onlyCapturablePieces) {
                nextMoves[botLeft] = "";
            }
            if (botLeftPiece && botLeftPiece.team !== team && (piece.isKing || !botLeftPiece.isKing)) {
                let botLeftBotLeft = (selectionLocRow + 1 + 1).toString() + bottomLabel[selectionLocColIdx - 2];
                if (locations[botLeftBotLeft] === "") {
                    nextMoves[botLeftBotLeft] = botLeft;
                }
            }
        }
        if (botRightPiece === ""  || (botRightPiece && botRightPiece.team !== team)) {
            if (botRightPiece === "" && !onlyCapturablePieces) {
                nextMoves[botRight] = "";
            }
            if (botRightPiece && botRightPiece.team !== team && (piece.isKing || !botRightPiece.isKing)) {
                let botRightBotRight = (selectionLocRow + 1 + 1).toString() + bottomLabel[selectionLocColIdx + 2];
                if (locations[botRightBotRight] === "") {
                    nextMoves[botRightBotRight] = botRight;
                }
            }
        }
    }

    if(piece.isKing || team === "red") {
        //bottom-left
        let topLeft = (selectionLocRow - 1).toString() + bottomLabel[selectionLocColIdx - 1];
        let topLeftPiece = locations[topLeft];
        let topRight = (selectionLocRow - 1).toString() + bottomLabel[selectionLocColIdx + 1];
        let topRightPiece = locations[topRight];

        if (topLeftPiece === "" || (topLeftPiece && topLeftPiece.team !== team)) {
            if (topLeftPiece === "" && !onlyCapturablePieces) {
                nextMoves[topLeft] = "";
            }
            if (topLeftPiece && topLeftPiece.team !== team && (piece.isKing || !topLeftPiece.isKing)) {
                let topLeftTopLeft = (selectionLocRow - 1 - 1).toString() + bottomLabel[selectionLocColIdx - 2];
                if (locations[topLeftTopLeft] === "") {
                    nextMoves[topLeftTopLeft] = topLeft;
                }
            }
        }
        if (topRightPiece === "" || (topRightPiece && topRightPiece.team !== team)) {
            if (topRightPiece === "" && !onlyCapturablePieces) {
                nextMoves[topRight] = "";
            }
            if (topRightPiece && topRightPiece.team !== team && (piece.isKing || !topRightPiece.isKing)) {
                let topRightTopRight = (selectionLocRow - 1 - 1).toString() + bottomLabel[selectionLocColIdx + 2];
                if (locations[topRightTopRight] === "") {
                    nextMoves[topRightTopRight] = topRight;
                }
            }
        }  
    }
    return nextMoves;
}

function createInitLocations() {
    return  {   "1h":"", "1g":{"team":"black", "isKing":false}, "1f":"", "1e":{"team":"black", "isKing":false}, "1d":"", "1c":{"team":"black", "isKing":false}, "1b":"", "1a":{"team":"black", "isKing":false}, 
                "2h":{"team":"black", "isKing":false}, "2g":"", "2f":{"team":"black", "isKing":false}, "2e":"", "2d":{"team":"black", "isKing":false}, "2c":"", "2b":{"team":"black", "isKing":false}, "2a":"", 
                "3h":"", "3g":{"team":"black", "isKing":false}, "3f":"", "3e":{"team":"black", "isKing":false}, "3d":"", "3c":{"team":"black", "isKing":false}, "3b":"", "3a":{"team":"black", "isKing":false},
                "4h":"", "4g":"", "4f":"", "4e":"", "4d":"", "4c":"", "4b":"", "4a":"",
                "5h":"", "5g":"", "5f":"", "5e":"", "5d":"", "5c":"", "5b":"", "5a":"",
                "6h":{"team":"red", "isKing":false}, "6g":"", "6f":{"team":"red", "isKing":false}, "6e":"", "6d":{"team":"red", "isKing":false}, "6c":"", "6b":{"team":"red", "isKing":false}, "6a":"", 
                "7h":"", "7g":{"team":"red", "isKing":false}, "7f":"", "7e":{"team":"red", "isKing":false}, "7d":"", "7c":{"team":"red", "isKing":false}, "7b":"", "7a":{"team":"red", "isKing":false},
                "8h":{"team":"red", "isKing":false}, "8g":"", "8f":{"team":"red", "isKing":false}, "8e":"", "8d":{"team":"red", "isKing":false}, "8c":"", "8b":{"team":"red", "isKing":false}, "8a":"", 
            };
}

export default Board