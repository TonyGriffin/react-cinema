import React from 'react';

class Thumb extends React.Component {

  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
  if(this.props.movieItem.Poster) {
    this.props.receivePlot(this.props.movieItem.imdbID, this.props.movieItem.Poster);
    }
     else {
       const noImage = "No image details here!!"
       this.props.receivePlot(noImage);
     }
  }

  render() {
    return (
      <img className="thumb__singlethumb" onClick={this.handleClick} src={this.props.movieItem.Poster} />
    );
  }

}

export default Thumb;
