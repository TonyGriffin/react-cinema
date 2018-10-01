import React from 'react';

class Favourites extends React.Component {

  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.addToLocalStore(this.props.movieItem.Title, this.props.movieItem.Poster)
  }

  render() {
    return (
      <div className="favbutton__add__container">
        <button className="favbutton__add__button" onClick={this.handleClick} >Add to Favourites</button>
      </div>
    );
  }

}

export default Favourites;
