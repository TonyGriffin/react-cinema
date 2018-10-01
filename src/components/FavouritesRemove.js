import React from 'react';

class FavouritesRemove extends React.Component {

  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.removeFromLocalStore(this.props.movieItem.Title, this.props.movieItem.Poster)
  }

  render() {
    return (
      <div className="favbutton__remove__container">
        <button className="favbutton__remove__button" onClick={this.handleClick} >Remove from Favourites</button>
      </div>
    );
  }

}

export default FavouritesRemove;
