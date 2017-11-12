import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import App from './App';
import './index.css';
import './css/style.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
            {
                squares: Array(9).fill(null),
                colors: Array(9).fill(null)
            }
            ],
            stepNumber: 0,
            xIsNext: true,
            playerOne: this.props.playerOne,
            playerTwo: this.props.playerTwo,
            aSignForPlayerOne: this.props.aSign,
            aSignForPlayerTwo: this.props.aSign === "X" ? "O" : "X",
            colorForPlayerOne: this.props.aSign === "X" ? "#000080" : "#b22222",
            colorForPlayerTwo: this.props.aSign === "X" ? "#b22222" : "#000080",
            countWinForPlayerOne: 0,
            countWinForPlayerTwo: 0,
            ties: 0,
            winner: ""
      };
    }
  
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const colors = current.colors.slice();
        if (calculateWinner(squares) || this.state.winner) {
            alert("Because this turn is finished, please click [New Game] to continue.")
            return;
        }
        if (squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? this.state.aSignForPlayerOne : this.state.aSignForPlayerTwo;
        colors[i] = this.state.xIsNext ? this.state.colorForPlayerOne : this.state.colorForPlayerTwo;
        this.setState({
            history: history.concat([{
                squares: squares,
                colors: colors
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
  
    jumpTo(step) {
        if (step === 0) {
            this.setState({
                history: [
                {
                    squares: Array(9).fill(null),
                    colors: Array(9).fill(null)
                }
                ],
                stepNumber: 0,
                xIsNext: true,
                winner: ""
            });
        } else {
            if (this.state.winner) {
                alert("Because this turn is finished, please click [New Game] to continue.");
                return;
            }
            this.setState({
                stepNumber: step,
                xIsNext: step % 2 === 0
            });
        }
    }

    goToHome() {
        
        ReactDOM.render(<App 
            playerOne={this.state.playerOne}
            playerTwo={this.state.playerTwo}  
            aSign={this.state.aSignForPlayerOne}/>, 
          document.getElementById('root'));
    }
  
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "New Game";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} className="btn-game-info">{desc}</button>
                </li>
            );
        });
  
        let status;
        if (winner) {           
            if (!this.state.xIsNext) {
                this.state.countWinForPlayerOne ++;
                this.state.winner = this.state.playerOne;
            } else {
                this.state.countWinForPlayerTwo ++;
                this.state.winner = this.state.playerTwo;
            }
            status = "Winner: " + this.state.winner;            
        } else if (this.state.stepNumber === current.squares.length) {
            status = "Draw";
            this.state.winner = status;
            this.state.ties ++;
        } else {
            status = "Next player: " + (this.state.xIsNext ? this.state.playerOne : this.state.playerTwo);
        }
  
        return (
            <div className="App">
                <h1 className="App-title">Welcome to Tic Toc Toe</h1>
                <div className="App-intro app-intro-detail">
                    <div className="row-detail">
                        <label htmlFor="playerOne" className="label-detail">Player One:</label>
                        <label id="playerOne">{this.state.playerOne}</label>
                        <br/>
                        <span className="squareInput">{this.state.countWinForPlayerOne}</span>
                    </div>
                    <div className="row-detail">
                        <label htmlFor="ties" className="label-detail">Ties</label>
                        <br/>
                        <span className="squareInput">{this.state.ties}</span>
                    </div>
                    <div className="row-detail">
                        <label htmlFor="playerOne" className="label-detail">Player Two:</label>
                        <label id="playerOne">{this.state.playerTwo}</label>
                        <br/>
                        <span className="squareInput">{this.state.countWinForPlayerTwo}</span>
                    </div>
                    <div className="game">
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                colors={current.colors}
                                onClick={i => this.handleClick(i)}
                            />
                        </div>
                        <div className="game-info">
                            <div>{status}</div>
                            <div><button onClick={() => this.goToHome()} className="btn-game-info">Back To Home</button></div>
                            <ol>{moves}</ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
}
export default Game;