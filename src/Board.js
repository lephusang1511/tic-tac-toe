import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        color={this.props.colors[i]}
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

function Square(props) {
  const buttonStyle = {
    color: props.color
  };
  return (
    <button className="square" onClick={props.onClick} style={buttonStyle}>
      {props.value}
    </button>
  );
}

export default Board;