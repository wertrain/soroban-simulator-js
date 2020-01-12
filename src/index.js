import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Transition } from 'react-transition-group';

const FLIP_STYLE = {
  entering: {
    transition: 'all .5s ease',
    marginTop: -50,
  },
  entered: {
    transition: '',
  },
  exiting: {
    transition: 'all .5s ease',
    //transform: 'perspective(25rem) rotateY(-360deg)'
  },
  exited: {
    transition: '',
    //transform: 'left: 30px'
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
    this.digit = props.digit;
    this.value = props.value;
    this.tama = props.tama;
    this.sep = props.sep;
    this.state = {
      on: false,
    };
  }
  getValue() {
    return (this.tama && this.state.on) ? (this.digit * this.value) : 0;
  }
  render() {
    const tamaClass = (this.tama ? "tama icon" : null)
    const separaterClass = (this.sep ? this.tableCellSeparaterStyle : this.tableCellStyle)
    return (<Transition in={this.state.on} timeout={50000}>
      {
        state => (
        <td style={separaterClass}>
          <div style={FLIP_STYLE[state]}>
            <div className={tamaClass} onClick={() => this.setState({on: !this.state.on})}></div>
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
    };
    // デザイン定義
    // テーブル
    this.tableStyle = {
      border: '24px #5a2a08 solid',
      borderLeft: '32px #5a2a08 solid',
      borderRight: '32px #5a2a08 solid',
      width: 64 * props.length,
    };
    this.cells = [];
  }
  renderCells(params) {
    let cells = [];
    for(let i = 0; i < params.num - 1; i++) {
      let value = (params.index === 1) ? 4 : 1;
      cells.push(<SorobanCell key={"" + params.index + i} value={value} digit={params.num - i} tama={params.tama} sep={params.sep} />);
    }
    cells.push(<SorobanCell key={"" + params.index + params.num} value={0} digit={0} tama={false} sep={params.sep} />)
    this.cells[params.index] = cells;
    return (<tr>{cells}</tr>);
  }
  calcValue() {
    let amount = 0;
    for (let i = 0; i < this.cells.length; ++i) {
      for (let j = 0; j < this.cells[i].length; ++j) {
        let params = this.cells[i][j].props;
        console.log(new SorobanCell(params));
        amount += (params.tama) ? (params.digit * params.value) : 0;
      }
    }
    this.setState({amountValue: amount});
  }
  render() {
    return (
      <>
        <table style={this.tableStyle}>
          <tbody>
            { this.renderCells({index:0, num:this.props.length}) }
            { this.renderCells({index:1, num:this.props.length, sep:true, tama:true}) }
            { this.renderCells({index:2, num:this.props.length}) }
            { this.renderCells({index:3, num:this.props.length, tama:true}) }
            { this.renderCells({index:4, num:this.props.length, tama:true}) }
            { this.renderCells({index:5, num:this.props.length, tama:true}) }
            { this.renderCells({index:6, num:this.props.length, tama:true}) }
          </tbody>
        </table>
        <button onClick={() => this.calcValue()}>{this.state.amountValue}</button>
      </>
    );
  }
}
ReactDOM.render(
  <Soroban length={14}/>,
  document.getElementById('root')
);
