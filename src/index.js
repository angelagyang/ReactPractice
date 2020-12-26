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
    renderSquare(i) {
      return(
        <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
      ); 
    }
  
    render() {
        return (
            <div>
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
  

/** Responsible for tracking game history **/
class Game extends React.Component {
    constructor(props) {
        super(props); 
        /** We lift state up from the board into the game **/
        this.state = {
            history: [{
                squares: Array(9).fill(null), 
            }], 
            stepNumber: 0, 
            xIsNext: true,
        }
    }
    
    jumpTo(step) {
        this.setState({
            stepNumber: step, 
            xIsNext: (step & 2) === 0,
        });
    }

    handleClick(i) {
        /** Read history up until current step number - allows history to be "rewritten" **/
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];     
        /** Note the immutability here - better for extensibility and for detecting modifications **/
        const squares = current.squares.slice() // creates a copy instead of modifying original

        /** Ignore click if there's already a winner or if a square has already been filled **/
        if (calculateWinner(squares) || squares[i]) {
            return; 
        }       
        squares[i] = this.state.xIsNext ? 'X' : 'O'; 
        this.setState({
            history: history.concat([{ // .concat() doesn't mutate original array
                squares: squares
            }]),
            stepNumber: history.length, 
            xIsNext: !this.state.xIsNext, // alternate X and O turns 
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]; // render selected move     
        const winner = calculateWinner(current.squares); 

        /** Display the move history **/
        const moves = history.map((step, move) => {
            const desc = move ? 
                'Go to move #' + move : 
                'Go to game start'; 
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        }); 

        let status; 
        if (winner) {
            status = 'Winner: ' + winner; 
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); 
        }
        return (
            <div className="game">
            <div className="game-board">
                <Board 
                    squares = {current.squares}
                    onClick = {(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
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
