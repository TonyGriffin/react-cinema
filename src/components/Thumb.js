import React from 'react';

class Thumb extends React.Component {

  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
  // if(this.props.movieItem.Poster) {
    this.props.receivePlot(this.props.movieItem.imdbID, this.props.movieItem.Poster);
    // }
    //  else {
    //    const noImage = "No image details here!!"
    //    this.props.receivePlot(noImage);
    //  }
    this.props.addToLocalStore(this.props.movieItem.imdbID, this.props.movieItem.Poster)
    this.props.removeFromLocalStore(this.props.movieItem.imdbID, this.props.movieItem.Poster)

  }

  render() {
    return (
      <div className="thumb__container">
        <button className="thumb__favbutton__add" onClick={this.handleClick} >Add to Favourites</button>
        <img className="thumb__singlethumbimage" onClick={this.handleClick} src={this.props.movieItem.Poster} />
        <button className="thumb__favbutton__remove" onClick={this.handleClick} >Remove from Favourites</button>
      </div>
    );
  }

}

export default Thumb;
