import React from 'react';

class Upvote extends React.Component {

    constructor(props){
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
            {this.state.count < 1 && <button onClick={this.increment}>
              +
            </button>}
            <span>{this.state.count}</span>
            {this.state.count > -1 && <button onClick={this.decrement}>
              -
            </button>}
          </div>
        );
      }
}

export default Upvote;