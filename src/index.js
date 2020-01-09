import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Soroban extends React.Component {
    render() {
      return (
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"><div class="tama icon"></div></td>
            <td class="separater"></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td></td>
          </tr>
          <tr>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td></td>
          </tr>
          <tr>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td></td>
          </tr>
          <tr>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td><div class="tama icon"></div></td>
            <td></td>
          </tr>
        </table>
      )
    }
}

class SorobanTama extends React.Component {
  render() {
    return (<div class="tama icon"></div>)
  }
}

class SorobanRaw extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td>{this.props.value}</td>
        <td></td>
      </tr>
    )
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button
      className="square"
      onClick={() => this.setState({value: 'X'})}
    >
      {this.state.value}
    </button>
    );
  }
}
  
class Board extends React.Component {
  renderSquare(i) {
      return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

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

// ========================================

ReactDOM.render(
  //<Game />,
  <Soroban />,
  //<SorobanEx />,
  document.getElementById('root')
);
  