import React from 'react';
import FavouritesAdd from './FavouritesAdd';
import FavouritesRemove from './FavouritesRemove';

class Thumb extends React.Component {

  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.receivePlot(this.props.movieItem.imdbID, this.props.movieItem.Poster);
    // this.props.addToLocalStore(this.props.movieItem.imdbID, this.props.movieItem.Poster);
    // this.props.removeFromLocalStore(this.props.movieItem.imdbID, this.props.movieItem.Poster);
  }


  render() {
    return (
      <div className="thumb__container">

        <div>
         <FavouritesAdd className="thumb__favourite__add" onClick={this.handleClick} addToLocalStore={this.props.addToLocalStore} movieItem={this.props.movieItem} />
        </div>

        <div className="thumb__singlethumb__container">
         <img className="thumb__singlethumb__image" onClick={this.handleClick} src={this.props.movieItem.Poster} />
       </div>

       <div>
         <FavouritesRemove className="thumb__favourite__remove" onClick={this.handleClick} removeFromLocalStore={this.props.removeFromLocalStore} movieItem={this.props.movieItem}/>
       </div>

      </div>
    );
  }

}

export default Thumb;
