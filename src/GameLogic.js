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