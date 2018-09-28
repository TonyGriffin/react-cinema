import React from 'react';
import Thumb from './Thumb';

class Thumbs extends React.Component {

  constructor(){
    super();
  }

  render() {
    return (
    <div className="thumbs">
      {this.props.movieArray.map( movie => {
        return (
          <Thumb className="thumbs__movieitem" key={movie.imdbID} movieItem={movie} moviePlot={this.props.moviePlot} receivePlot={this.props.receivePlot}/>

        )
      })}
    </div>)
  }
}

export default Thumbs;
