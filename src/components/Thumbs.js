import React from 'react';
import Thumb from './Thumb';

class Thumbs extends React.Component {

  constructor(){
    super();
  }

  render() {
    return (
    <div className="thumbs">
      {this.props.movieArray.map( movieItem => {
        return (
          <Thumb className="thumbs__movieitem" key={movieItem.imdbID} movieItem={movieItem} moviePlot={this.props.moviePlot} receivePlot={this.props.receivePlot} removeFromLocalStore={this.props.removeFromLocalStore} addToLocalStore={this.props.addToLocalStore} />
        )
      })}
    </div>)
  }
}

export default Thumbs;
