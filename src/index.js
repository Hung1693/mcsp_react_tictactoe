import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/* Create square: class square. Each square is a button so we can click on */
class Square extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }
  /**The state in each square is created and passed from Board to calculate winner */
  // printXWhenClicked() {
  //   this.setState({ value: "X" });
  // }
  render() {
    return (
      <button
        className="square"
        /**Call props.onClick() from Board */
        onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

/*Create a board: class Board: 9 button from class Square*/
class Board extends React.Component {
  constructor(props) {
    super(props);
    /**Keep then state in Board instead of individual square to calculate winner later */
    this.state = {
      /**Create state.square array fill with 9 null elements */
      squares: Array(9).fill(null),
    };
    console.log(this.state.squares);
  }
  handleClick(i) {
    /**When click square, these events happen */
    /**Copy state array because we don't want to use state array */
    const squares = this.state.squares.slice();
    /**Update props.value of <Square/> */
    squares[i] = "X";
    /**Update old Board's state */
    this.setState({ squares: squares });
  }
  /**Create renderSquare method(i) so we can pass value(i) for each square manually */
  renderSquare(i) {
    return (
      <Square
        /**Pass props.value and props.onClick to <Square/> */
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    const status = "Next player X";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
