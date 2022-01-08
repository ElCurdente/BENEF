import React from 'react';
import upvoteBas from './images/icon/upvote.svg';
import upvoteHaut from './images/icon/upvote2.svg';

class Upvote extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  increment = () => {

    this.setState({
      count: this.state.count + 1
    })
  }

  decrement = () => {

    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    return (
      <div>
        <div className="bg-white-0 text-black text-xl font-bold flex w-max py-1 rounded-lg">
          {this.state.count < 1 && <button onClick={this.increment} className="pl-2">
            <img src={upvoteHaut} className=""></img>
          </button>}
          <span className="px-2">{this.state.count}</span>
          {this.state.count > -1 && <button onClick={this.decrement} className="pr-2">
            <img src={upvoteBas} className=""></img>
          </button>}
        </div>
      </div>
    );
  }
}

export default Upvote;