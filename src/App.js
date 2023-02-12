
import { Component} from 'react';
import './App.css';
import Button from './components/Button';


class App extends Component {
  constructor(){
   super();
    this.state = {
      preState:'',
      curState:'',
      result:'0',
      operator:null,
      total:false,
      accessZero:false,
    };
  }
 inputNum = (e) => {
  if (this.state.curState === '0' && !this.state.accessZero) {
    return;
  }else if(e.target.value !== '0' && !this.state.accessZero){
  this.setState({curState:'0', accessZero:true});
}
  if (this.state.total) {
      this.setState({ curState: '', preState: '', total: false });
  }
  this.state.curState ? this.setState((pre) => ({ curState: pre.curState + e.target.value })): this.setState({curState:e.target.value});
  this.setState({total:false});
};

componentDidUpdate(prevProps, prevState){
  if (this.state.curState !== prevState.curState) {
    this.setState({ result: this.state.curState }); 
  }
}
operatorType = (e) => {
  if (!this.state.curState) return;
  this.setState({ total: false, operator: e.target.value, preState: this.state.curState, curState: '' });
};
equals = (e) => {
  if (!this.state.curState) return;
  if (e?.target.value === '=') {
      this.setState({ total: true });
  }
  let cal;
  switch (this.state.operator) {
      case '/':
          cal = String(this.state.preState / this.state.curState);
          break;

      case '+':
          cal = String(+this.state.preState + +this.state.curState);
          break;

      case '*':
          cal = String(this.state.preState * this.state.curState);
          break;

      case '-':
          cal = String(this.state.preState - this.state.curState);
          break;

      default:
          return;
  }
  this.setState({ curState: cal, preState: cal });
};
percent = () => {
  this.state.preState
      ? this.setState({
            curState: String((this.state.curState / 100) * this.state.preState),
        })
      : this.setState({ curState: String(this.state.curState / 100) });
};

squaring = () => {
  if (this.state.curState === '') return;
  if (!this.state.preState) {
      this.setState({ curState: String(Math.pow(this.state.curState, 2)) });
  } else if (this.state.preState && this.state.curState) {
      this.setState({ curState: String(Math.pow(this.state.curState, 2)) });
  }
};

sqrt = () => {
  if (this.state.curState === '') return;
  if (!this.state.preState) {
      this.setState({ curState: Math.sqrt(this.state.curState) });
  } else if (this.state.preState && this.state.curState) {
      this.setState({ curState: String(Math.sqrt(this.state.curState)) });
  }
};

reset = () => {
  this.setState({ preState: '', curState: '', operator: null, total: false,accessZero:false });
};
render(){
  return (
      <div className='wrapper'>
          <div className='result'>{this.state.curState || this.state.preState || '0'}</div>
          <div className='App'>
              <Button value='x2' squaring={this.squaring} />
              <Button value='%' percent={this.percent} />
              <Button value='x^' sqrt={this.sqrt} />
              <Button value='/' operatorType={this.operatorType} />
              <Button value='7' inputNum={this.inputNum} />
              <Button value='8' inputNum={this.inputNum} />
              <Button value='9' inputNum={this.inputNum} />
              <Button value='*' operatorType={this.operatorType} />
              <Button value='4' inputNum={this.inputNum} />
              <Button value='5' inputNum={this.inputNum} />
              <Button value='6' inputNum={this.inputNum} />
              <Button value='-' operatorType={this.operatorType} />
              <Button value='1' inputNum={this.inputNum} />
              <Button value='2' inputNum={this.inputNum} />
              <Button value='3' inputNum={this.inputNum} />
              <Button value='+' operatorType={this.operatorType} />
              <Button value='0' inputNum={this.inputNum} />
              <Button value='C' reset={this.reset} />
              <Button value='=' equals={this.equals} />
          </div>
      </div>
  );
}
}

export default App;