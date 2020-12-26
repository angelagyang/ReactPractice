import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * React Tutorial: https://reactjs.org/tutorial/tutorial.html
 * A TicTacToe React Tutorial 
 */

 /** The squares don't maintain their own state - we can make them "function components"
  * since they only require a render method
  **/
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
/** The board will keep track of the current player and pass props to the squares **/
class Board extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            squares: Array(9).fill(null), 
            xIsNext: true, 
        }
    };

    handleClick(i) {
        /** Note the immutability here - better for extensibility and for detecting modifications **/
        const squares = this.state.squares.slice() // creates a copy instead of modifying original
        
        /** Ignore click if there's already a winner or if a square has already been filled **/
        if (calculateWinner(squares) || squares[i]) {
            return; 
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O'; 
        this.setState({
            squares: squares, 
            xIsNext: !this.state.xIsNext, // alternate X and O turns 
        });
    }

    renderSquare(i) {
      return(
        <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />
      ); 
    }
  
    render() {
        const winner = calculateWinner(this.state.squares); 
        let status; 
        
        if (winner) { // Winner detected
            status = 'Winner: ' + winner; 
        } else { // No winner yet 
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
      );
    }
}
  

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
}
  

/** Helper function to determine winner **/
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
