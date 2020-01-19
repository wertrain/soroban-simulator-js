import React from 'react';
import './App.css';
import { Transition } from 'react-transition-group';

const BALL_MOVE = 25;
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

// そろばんの珠を表すコンポーネント
// 
// 親の持つ配列を参照してアニメーションさせるかを判定する
// 珠のアニメーションはすべて上に移動させるもの。
// つまり、五珠はアニメーションしている状態がゼロで、
// 一珠はアニメーションしていない状態がゼロである
class SorobanCell extends React.Component {
  constructor(props) {
    super(props);
    // テーブルセルスタイル
    this.tableCellStyle = {
      border: '4px #ca7d45 solid',
      height: 24,
      borderTop: '0px',
      borderBottom: '0px',
    };
    this.tableCellSeparaterStyle = {
      border: '4px #ca7d45 solid',
      height: 24,
      borderTop: '0px',
      borderBottom: '10px #C0C0C0 solid'
    };
    // 珠の位置スタイル
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
    const tamaClass = (this.props.tama ? "tama icon" : (this.props.teiiten ? "teiiten icon" : null));
    const separaterClass = (this.props.separater ? this.tableCellSeparaterStyle : this.tableCellStyle);
    return (<Transition in={this.state.cells[this.props.index]} timeout={ANIM_DURATION} {...callbacks}>
      {
        state => (
        <td style={separaterClass}>
          <div style={this.state.cellStyle}>
            <div style={BALL_ANIM[state]}>
              <div className={tamaClass}
                onMouseOver={(e) => {
                  if (!this.props.tama) return;
                  if (!this.props.isEnableTouch()) return;
                  if (e.buttons === 0) return; // 何かボタンを押していたら
                  if (state === 'entered' || state === 'exited') {
                    this.props.changeCell(this.props.index);
                  }
                }}
                onMouseDown={() => {
                  if (!this.props.tama) return;
                  if (!this.props.isEnableTouch()) return;
                  if (state === 'entered' || state === 'exited') {
                    this.props.changeCell(this.props.index);
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

class SorobanValueView extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.hide = { display: 'none' };
    this.show = { display: '' };
    this.state = {
      input: false,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.input && !prevState.input) {
      //this.textInput.focus();
    }
  }
  render() {
    let focused = false;
    return (
      <>
        <div style={this.state.input ? this.show : this.hide}>
          <input type="number" style={{imeMode: 'disabled'}} ref={(input) => { this.textInput = input; }} placeholder={this.props.amountValue.toLocaleString()} className="amount"
            onBlur={(e) => {
              this.setState({input:false});
              focused = false;
            }}
            onMouseEnter={(e) => {
              if (!focused) {
                this.textInput.focus();
                focused = true;
              }
            }}
            onChange={()=> {
              this.props.calc(this.textInput.value);
            }}
          ></input >
        </div>
        <div style={this.state.input ? this.hide : this.show}>
          <div className="amount" onMouseDown={(e) => {
            this.setState({input:true});
            this.textInput.value = this.props.amountValue;
          }}>{this.props.amountValue.toLocaleString()}</div>
        </div>
      </>
    );
  }
}

class Soroban extends React.Component {
  constructor(props) {
    super(props);
    this.length = (props.length + 1); // 左端は空列にするのでテーブル自体は +1 増やす
    this.state = {
      amountValue: 0,
      cells: Array(this.length * 7).fill(false)
    };
    this.cellComponents = [];
    // デザイン定義
    // テーブル
    this.tableStyle = {
      border: '16px #5a2a08 solid',
      borderLeft: '32px #5a2a08 solid',
      borderRight: '32px #5a2a08 solid',
      width: 48 * this.length,
    };
    this.enableTouch = false;
    // 操作可能か判定するコールバック
    this.isEnableTouch = () => {
      return this.enableTouch;
    }
    // 珠を動かす（おく）コールバック
    this.changeCell = (index) => {
      let cells = this.state.cells;
      // 自身の珠を動かす
      let toggle = !cells[index];
      cells[index] = toggle;
      // 自身より上にある珠を動かす
      if (toggle) {
        let i = index;
        let max = this.length * 3; // 最初の3行は動かさない
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
      this.calcValue();
    }
    // 数値文字列からそろばん配置に反映
    this.setPositionByNumber = (num) => {
      let cells = this.state.cells;
      let isBallOf5 = (v) => { return (this.length * 2) > v; }
      for(let i = 0; i < this.state.cells.length; i++) {
        cells[i] = isBallOf5(i);
      }
      let chars = num.split("");
      let center = Math.ceil(this.length / 2);
      let skipRaw = 3; // 五珠の二行と一珠の一行目をスキップ
      if (chars.length < center) {
        let startIndex = center - chars.length;
        for (let i = 0; i < chars.length; ++i) {  
          let c = parseInt(chars[i]);
          if (c >= 5) {
            cells[startIndex + this.length + i] = false;
            c -= 5;
          }
          for (let j = 0; j < c; ++j) {
            cells[startIndex + (this.length * (j + skipRaw)) + i] = true;
          }
        }
      }
      this.setState({cells: cells});
      this.calcValue();
    }
  }
  renderCells(params) {
    // そろばんの一行を作成
    let cellComponents = [];
    let max = params.num - 1;
    for(let i = 0; i < max; i++) {
      let index = (params.index * params.num) + i;
      let d = Math.floor(max / 2) - i;
      let digit = Math.pow(10, Math.abs(d)) * (d >= 0 ? 1 : -1);
      cellComponents.push(<SorobanCell 
        key={index} index={index} value={params.value} digit={digit}
        tama={params.tama} teiiten={params.teiiten && digit === 1} separater={params.sep} cells={this.state.cells} 
        changeCell={this.changeCell} isEnableTouch={this.isEnableTouch}
      />);
    }
    // 最後の列は珠なし
    let lastIndex = (params.index * params.num) + params.num;
    cellComponents.push(<SorobanCell 
      key={lastIndex} index={lastIndex} value={0} digit={0}
      tama={false} separater={params.sep} cells={this.state.cells}
      changeCell={this.changeCell}
    />)
    this.cellComponents[params.index] = cellComponents;
    return (<tr>{cellComponents}</tr>);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => {
        let cells = this.state.cells;
        let isBallOf5 = (v) => { return (this.length * 2) > v; }
        for(let i = 0; i < this.state.cells.length; i++) {
          if (isBallOf5(i) && !cells[i]) {
            cells[i] = true;
            this.setState({cells: cells});
            return;
          }
        }
        this.enableTouch = true;
        clearInterval(this.timerID);
      },
      20
    );
  }
  resetZeroPosition() {
    let cells = this.state.cells;
    let isBallOf5 = (v) => { return (this.length * 2) > v; }
    for(let i = 0; i < this.state.cells.length; i++) {
      cells[i] = isBallOf5(i);
    }
    this.setState({cells: cells});
    this.calcValue();
  }
  calcValue() {
    let amount = 0;
    for (let i = 0; i < this.cellComponents.length; ++i) {
      for (let j = 0; j < this.cellComponents[i].length; ++j) {
        let params = this.cellComponents[i][j].props;
        let on = this.state.cells[(this.length * i) + j];
        if (typeof params.tama === 'undefined') continue;
        let value = (params.digit * params.value);
        if (params.value === 5)  amount += !on ? value : 0;
        else if (params.value === 1)  amount += on ? value : 0;
      }
    }
    this.setState({amountValue: amount});
  }

  render() {
    return (
      <>
        <table style={this.tableStyle}>
          <tbody>
            { this.renderCells({ index:0, num:this.length}) }
            { this.renderCells({ index:1, num:this.length, sep:true, tama:true, value:5 }) }
            { this.renderCells({ index:2, num:this.length, teiiten:true }) }
            { this.renderCells({ index:3, num:this.length, tama:true, value:1 }) }
            { this.renderCells({ index:4, num:this.length, tama:true, value:1 }) }
            { this.renderCells({ index:5, num:this.length, tama:true, value:1 }) }
            { this.renderCells({ index:6, num:this.length, tama:true, value:1 }) }
          </tbody>
        </table>
        <div className="amount-value-area">
          <SorobanValueView amountValue={this.state.amountValue} calc={this.setPositionByNumber} />
        </div>
        <div className="btn-area">
          <button className="btn-square-little-rich" onClick={() => this.resetZeroPosition()}>RESET ZERO</button>
        </div>
      </>
    );
  }
}
export default Soroban;
