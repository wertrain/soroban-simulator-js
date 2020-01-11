import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Soroban extends React.Component {
  cell(props) {
    const tamaClass = (props.tama ? "tama icon" : null)
    const separaterClass = (props.sep ? "separater" : null)
    return (
      <td class={separaterClass}>
        <div class={tamaClass}></div>
      </td>
    );
  }
  cells(props) {
    const td = (this.cell({
      tama:props.tama,
      sep:props.sep
    }));
    
    let tds = [];
    for(let i=0; i < props.num - 1; i++) {
        tds.push(td);
    }
    
    tds.push(this.cell({
      tama:false,
      sep:props.sep
    }))
    return (<tr>{tds}</tr>);
  }
  render() {
    return (
      <table>
        { this.cells({num:14}) }
        { this.cells({num:14, sep:true, tama:true}) }
        { this.cells({num:14}) }
        { this.cells({num:14, tama:true}) }
        { this.cells({num:14, tama:true}) }
        { this.cells({num:14, tama:true}) }
        { this.cells({num:14, tama:true}) }
      </table>
    );
  }
}

ReactDOM.render(
  //<Game />,
  <Soroban />,
  //<SorobanEx />,
  document.getElementById('root')
);
  