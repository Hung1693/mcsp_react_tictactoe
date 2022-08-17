import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/* Create square: class square. Each square is a button so we can click on */
// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//   /**The state in each square is created and passed from Board to calculate winner */
//   // printXWhenClicked() {
//   //   this.setState({ value: "X" });
//   // }
//   render() {
//     return (
//       <button
//         className="square"
//         /**Call props.onClick() from Board */
//         onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
/**Change Square to function component because there is no props and state needed in constructor */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/**Winner logic */
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
    /**check if squares[a] = squares[b] = square[c] = 'X' or 'O'. We will pass array state.square later in component Board */
    if (
      squares[a] != null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

/*Create a board: class Board: 9 button from class Square*/
class Board extends React.Component {
  /**Create renderSquare method(i) so we can pass value(i) for each square manually */
  renderSquare(i) {
    return (
      <Square
        /**Pass props.value and props.onClick to <Square/> */
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

class Game extends React.Component {
  /**create constructor to store history's state. History is an array, ele are objects that store value of 9 square in each turn. After each turn, a new object will be added to history array
   */
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      turn: 0,
    };
  }
  handleClick(i) {
    //each time the element clicked, new history array is created from start to turn+1. +1 because there need to have an initial state array => total ele = turn+1
    const history = this.state.history.slice(0, this.state.turn + 1);
    const current = history[history.length - 1];
    /**When click square, these events happen */
    /**Copy state array because we don't want to use state array */
    const squares = current.squares.slice();
    //when calculateWinner(squares) = true do nothing
    if (calculateWinner(squares)) {
      return;
    }
    /**Update props.value of <Square/>, if xIsNext == true => X else O */
    squares[i] = this.state.xIsNext ? "X" : "O";
    /**Update old Board's state */
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      //when clicked, turn's value also update corresponding with number of history'ele
      turn: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  //method to change turn. In this case, turn = index of state.history because after each turn, new ele added
  jumpTo(step) {
    this.setState({
      turn: step,
    });
  }
  render() {
    const history = this.state.history;
    //current always = last object added
    const current = history[this.state.turn];
    const winner = calculateWinner(current.squares);
    const move = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          {/** */}
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{move}</ol>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
