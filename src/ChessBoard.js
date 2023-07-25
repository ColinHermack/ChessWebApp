import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn } from '@fortawesome/free-solid-svg-icons'
import { faChessRook } from '@fortawesome/free-solid-svg-icons'
import { faChessBishop } from '@fortawesome/free-solid-svg-icons'
import { faChessKnight } from '@fortawesome/free-solid-svg-icons'
import { faChessQueen } from '@fortawesome/free-solid-svg-icons'
import { faChessKing } from '@fortawesome/free-solid-svg-icons'


class ChessBoard extends React.Component {
    constructor(props) {
      super(props);

      //FontAwesome icons in JSX for each piece
      this.pieceIcons = {
        'pawn': <FontAwesomeIcon icon={faChessPawn}/>,
        'rook': <FontAwesomeIcon icon={faChessRook}/>,
        'bishop': <FontAwesomeIcon icon={faChessBishop}/>,
        'knight': <FontAwesomeIcon icon={faChessKnight}/>,
        'queen': <FontAwesomeIcon icon={faChessQueen}/>,
        'king': <FontAwesomeIcon icon={faChessKing}/>,
        'empty': ''

      }

      //Order of the pieces when the board is set up
      this.initialPieceOrder = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook']

      //A 2d array of the chessboard layout numbering scheme.
      this. boardLayout = [
        ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
        ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
        ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
        ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
        ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
        ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
        ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
        ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
        ]

      //Initialize the state
      this.state = {
        //A 1d array with information about the current state of each square on the board
        cellInfo: []
        }

        //Initialize temporary variables for cell data
        let count = 0;
        let color = '';
        let temp = [];
        let icon = '';
        let pieceColor = '';
        let disabled = true;
        let iconColor = '';

    //Loop through each square on the board and give it an object with cell information
    //Loop through each row
        for (let i = 0; i < this.boardLayout.length; i++) {
            temp = []
            disabled = true;
            //Loop through each individual cell
            for (let j = 0; j < this.boardLayout[i].length; j++) {
                icon = ''

                //Determine the color of the square
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        color = 'white';
                    }
                    else {
                        color = 'rgb(210, 210, 210)';
                    }
                } else {
                    if (j % 2 === 0) {
                        color = 'rgb(210, 210, 210)';
                    }
                    else {
                        color = 'white';
                    }
                }

                //Add pieces to the board and make their cells clickable
                if (i === 1 || i === 6) {
                    icon = 'pawn'
                    disabled = false;
                } else if (i === 0 || i === 7) {
                    icon = this.initialPieceOrder[j]
                    disabled = false;
                }

                //Determine the color of the piece
                if (i === 0 || i === 1) {
                    iconColor = '#2e5c85';
                    pieceColor = 'black';

                } else if (i === 6 || i === 7) {
                    iconColor = '#80b7e6'
                    pieceColor = 'white'
                }


                //Add an object to the cellInfo array
                temp.push(
                    {
                        'xIndex': j,
                        'yIndex': i,
                        'cellCoordinate': this.boardLayout[i][j], //Lists the coordinate of the cell 
                        'color': color,  //Background color of the cell
                        'piece': icon,  //Piece that is currently on the cell
                        'pieceColor': pieceColor,  //Color of the piece currently on the cell,
                        'iconColor': iconColor, //The hexadecimal color of the icon for the piece that is on the cell
                        'disabled': disabled,  //Whether the cell is clickable
                        'unMoved': true  //Whether the piece on the cell has not yet been moved (needed for pawn movement mechanic)
                    }   
                )
            }
            this.state.cellInfo.push(temp);
            
        }

        this.getMovementLocations = this.getMovementLocations.bind(this);
        this.handleClick = this.handleClick.bind(this);
    
    }

      getMovementLocations(info) {
        let locations = []
        let xIndex = info.xIndex;
        let yIndex = info.yIndex;
        
        //Determine available movement locations for a pawn
        if (info.piece === 'pawn') {
            if (info.unMoved) {
                if (info.pieceColor === 'white') {
                    locations.push(this.boardLayout[yIndex - 1][xIndex]);
                    locations.push(this.boardLayout[yIndex - 2][xIndex]);
                } else {
                    locations.push(this.boardLayout[yIndex + 1][xIndex]);
                    locations.push(this.boardLayout[yIndex + 2][xIndex]);
                }
            }
        }

        return locations;
      }

      handleClick(event) {
        let currCellIndex = []
        console.log(event.target.id);
        /*
        for (let i = 0; i < this.state.cellInfo.length; i++) {
            for (let j = 0; j < this.state.cellInfo[i].length; j++) {
                if ((this.state.cellInfo[i][j].cellCoordinate) === event.target.key) {
                    currCellIndex.push(i, j);
                    break;
                }
            }
        }
        */
        //let moveLocations = this.getMovementLocations(this.state.cellInfo[currCellIndex[0]][currCellIndex[1]]);

      }
  
      render() {
        console.log('Checking cellCoordinate values:');
        for (const arr of this.state.cellInfo) {
            for (const curr of arr) {
                console.log(curr.cellCoordinate);
            }
        }


        return (
            <table id='chessboard-table'>
                <tbody>
                    {this.state.cellInfo.map((arr) => (
                        <tr>  {/*FIXME add a key for the table rows*/}
                            {arr.map((curr) => (
                                <td>
                                    <button key={curr.cellCoordinate}
                                            id={curr.cellCoordinate}
                                            style={{backgroundColor: curr.color, color: curr.iconColor}}
                                            disabled={curr.disabled}
                                            onClick = {this.handleClick}>
                                        {this.pieceIcons[(curr.piece)]}
                                    </button>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
      }
  }

  export default ChessBoard;
