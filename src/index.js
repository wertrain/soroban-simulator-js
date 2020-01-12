import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Transition } from 'react-transition-group';

const BALL_MOVE = 50;
const ANIM_DURATION = 200;
const BALL_ANIM = {
  entering: {
    transition: 'all ' + ANIM_DURATION + 'ms ease',
    marginTop: -BALL_MOVE,
  },
  entered: {
    transition: '',
  },
  exiting: {
    transition: 'all ' + ANIM_DURATION + 'ms ease',
    marginTop: BALL_MOVE,
  },
  exited: {
    transition: '',
  }
}

class SorobanCell extends React.Component {
  constructor(props) {
    super(props);
    // テーブルセル
    this.tableCellStyle = {
      border: '4px #ca7d45 solid',
      height: 35,
      borderTop: '0px',
      borderBottom: '0px solid',
    };
    this.tableCellSeparaterStyle = {
      border: '4px #ca7d45 solid',
      height: 35,
      borderTop: '0px',
      borderBottom: '16px #5a2a08 solid'
    };
    this.index = props.index;
    this.digit = props.digit;
    this.value = props.value;
    this.tama = props.tama;
    this.separater = props.separater;
    this.cellChanged = props.callback;
    this.upStyle = {
      marginTop: -BALL_MOVE
    };
    this.defaultStyle = {
      marginTop: 0
    };
    this.state = {
      cells: props.cells,
      cellStyle: this.defaultStyle,
    };
  }
  render() {
    const callbacks = {
      onEnter: () => this.setState({cellStyle: this.defaultStyle}),
      onEntered: () => this.setState({cellStyle: this.upStyle}),
      onExit: () => this.setState({cellStyle: this.upStyle}),
      onExited: () => this.setState({cellStyle: this.defaultStyle}),
    };
    const tamaClass = (this.tama ? "tama icon" : null)
    const separaterClass = (this.separater ? this.tableCellSeparaterStyle : this.tableCellStyle)
    return (<Transition in={this.state.cells[this.index]} timeout={ANIM_DURATION} {...callbacks}>
      {
        state => (
        <td style={separaterClass}>
          <div style={this.state.cellStyle}>
            <div style={BALL_ANIM[state]}>
              <div className={tamaClass}
                onMouseOver={(e) => {
                  if (e.buttons === 0) return; // 何かボタンを押していたら
                  if (state === 'entered' || state === 'exited') {
                    this.cellChanged(this.index);
                  }
                }}
                onMouseDown={() => {
                  if (state === 'entered' || state === 'exited') {
                    this.cellChanged(this.index);
                  }
                }}
              ></div>
            </div>
          </div>
        </td>)
      }
    </Transition>);
  }
}

class Soroban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: 0,
      cells: Array(props.length * 7).fill(false)
    };
    this.cellComponents = [];
    // デザイン定義
    // テーブル
    this.tableStyle = {
      border: '16px #5a2a08 solid',
      borderLeft: '32px #5a2a08 solid',
      borderRight: '32px #5a2a08 solid',
      width: 64 * props.length,
    };
    this.length = props.length;
    this.cellChanged = (index) => {
      let cells = this.state.cells;
      // 自身の珠を動かす
      let toggle = !cells[index];
      cells[index] = toggle;
      // 自身より上にある珠を動かす
      if (toggle) {
        let i = index;
        let max = this.length * 2; // 最初の2行は動かさない
        while (i > max) {
          cells[i] = toggle;
          i = i - this.length;
        }
      // 最初の2行以外、自身より下にある珠を動かす
      } else if (index > this.length * 2) {
        let i = index;
        let max = cells.length;
        while (i < max) {
          cells[i] = toggle;
          i = i + this.length;
        }
      }
      this.setState({cells: cells});
    }
  }
  renderCells(params) {
    let cellComponents = [];
    let max = params.num - 1;
    for(let i = 0; i < max; i++) {
      let index = (params.index * params.num) + i;
      let d = Math.floor(max / 2) - i;
      let digit = Math.pow(10, Math.abs(d)) * (d > 0 ? 1 : -1);
      cellComponents.push(<SorobanCell 
        key={index} index={index} value={params.value} digit={digit}
        tama={params.tama} separater={params.sep} cells={this.state.cells} callback={this.cellChanged} 
      />);
    }
    let lastIndex = (params.index * params.num) + params.num;
    cellComponents.push(<SorobanCell 
      key={lastIndex} index={lastIndex} value={0} digit={0}
      tama={false} separater={params.sep} cells={this.state.cells} callback={this.cellChanged}
    />)
    this.cellComponents[params.index] = cellComponents;
    return (<tr>{cellComponents}</tr>);
  }
  reset() {
    let cells = this.state.cells;
    for(let i = 0; i < this.state.cells.length; i++) {
      cells[i] = false;
    }
    this.setState({cells: cells});
  }
  calcValue() {
    let amount = 0;
    for (let i = 0; i < this.cellComponents.length; ++i) {
      for (let j = 0; j < this.cellComponents[i].length; ++j) {
        let params = this.cellComponents[i][j].props;
        amount += (params.tama && this.state.cells[(this.length * i) + j]) ? (params.digit * params.value) : 0;
      }
    }
    this.setState({amountValue: amount});
  }
  render() {
    return (
      <>
        <table style={this.tableStyle}>
          <tbody>
            { this.renderCells({ index:0, num:this.props.length}) }
            { this.renderCells({ index:1, num:this.props.length, sep:true, tama:true, value:5 }) }
            { this.renderCells({ index:2, num:this.props.length}) }
            { this.renderCells({ index:3, num:this.props.length, tama:true, value:1 }) }
            { this.renderCells({ index:4, num:this.props.length, tama:true, value:1 }) }
            { this.renderCells({ index:5, num:this.props.length, tama:true, value:1 }) }
            { this.renderCells({ index:6, num:this.props.length, tama:true, value:1 }) }
          </tbody>
        </table>
        <button onClick={() => this.reset()}>RESET</button>
        <button onClick={() => this.calcValue()}>{this.state.amountValue}</button>
      </>
    );
  }
}
ReactDOM.render(
  <Soroban length={14}/>,
  document.getElementById('root')
);
