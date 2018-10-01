import React from 'react';
import SearchInputs from './SearchInputs';
import Info from './Info';
import Thumbs from './Thumbs';
import FavouritesAdd from './FavouritesAdd';
import FavouritesRemove from './FavouritesRemove';

const myStorage = window.localStorage;

class App extends React.Component {
  constructor() {
    super();


    this.state= {
      movieArray: [],
      searchQuery : "Star Trek",
      movieTitle: "",
      poster : "",
      plot : "",
      pageNum: 1
    }

    this.receiveQuery = this.receiveQuery.bind(this);
    this.receivePlot = this.receivePlot.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }


  componentDidMount() {
    this.apiMovieCall()
  }


  apiMovieCall(){
    let movieUrl = `http://www.omdbapi.com/?apikey=323bfd8f&s=${this.state.searchQuery}&page=${this.state.pageNum}`

    fetch(movieUrl)
    .then(response => response.json())
    .then(content => {
      // console.log(content)
      const title = content.Search[0].Title
      this.setState( {
        movieArray: content.Search,
        movieTitle: title,
        poster: content.Search[0].Poster
      })
      let titleUrl =`http://www.omdbapi.com/?apikey=323bfd8f&t=${title}&plot=full`
      return fetch(titleUrl)
    })
    .then(response => response.json())
    .then(content => {
      console.log(content)
      this.setState( {
        plot: content.Plot,
        imdbRating: content.imdbRating
      })
    })
  }



  receiveQuery(userInput) {
    this.setState( {
      searchQuery : userInput
    } , () => this.apiMovieCall())
  }


  //Only when u click on the image thumb
  receivePlot(imdbID, poster) {
    //Below URL returns the imdbID, full plot along with the first page number
    let titleUrl =`http://www.omdbapi.com/?apikey=323bfd8f&i=${imdbID}&plot=full&page=${this.state.pageNum}`
    fetch(titleUrl)
    .then(response => response.json())
    .then(content => {
      // console.log(content)
      this.setState( {
        plot: content.Plot,
        poster: poster
      })
      //below code returns the screen view to the movie title set
      //with the ref attribute on the h2.
      if (this._title) {
        this._title.scrollIntoView();
      }
    })
  }


  //Pagenation functions:
  handleNext(){
    event.preventDefault();
    this.setState(
      {pageNum: this.state.pageNum + 1}
      , () => this.apiMovieCall()
    );
    if (this._title) {
      this._title.scrollIntoView();
    }
  }


  handlePrevious() {
    event.preventDefault();
    this.setState(
      {pageNum: this.state.pageNum - 1}
      , () => this.apiMovieCall()
    );
    if (this._title) {
      this._title.scrollIntoView();
    }
  }

  // Empty object that is due to hold the Title of
  // the favourite movie selected a s a key, and the poser as the value.
  //Add this object to local storage.
  // Tried declaring favObject in the global scope to use in the favourites functions
  //but got a build fail error?
  //Currently favourites seem to store whether I use add or remove function.
  //Also debugging shows that it is the imdbID that is being used as a key,
  ///even though I changed it to movieTitle in both favourites components
  //..not sure why this is

  addToLocalStore(titleKey, moviePoster) {
    const favObject = {};
    favObject.titleKey = "moviePoster"
    myStorage.setItem('titleKey', JSON.stringify(favObject));
    console.log(myStorage);
  }


  removeFromLocalStore(titleKey) {
    const favObject = {};
    myStorage.removeItem(favObject['titleKey']);
    console.log(myStorage);
  }


  render() {
    return (
      <div className="app">

        <div className="app__headercontainer">
          <h1 className="app__logo__container"> <img className="app__logo__image" src="/Users/tonygriffin/workspace/react-cinema/src/images/cinema-logo.png"/> </h1>
          <h2 className="app__title">Darkside Movies</h2>

          <SearchInputs className="app__searchinputs" receiveQuery={this.receiveQuery} />
        </div>

        <main className="app__content">

          <div className="app__movie" >
            <h2 ref={h2 => this._title = h2} className="app__movietitle"> {this.state.movieTitle} </h2>
            <img className="app__movieposter" src={this.state.poster} />
            <Info className="app__movieplot" moviePlot={this.state.plot} />
          </div>

          <div className="app__thumbs__container">
            <Thumbs className="app__thumbs" movieArray={this.state.movieArray} moviePlot={this.state.plot} imdbRating={this.state.imdbRating}  receivePlot={this.receivePlot} addToLocalStore={this.addToLocalStore} removeFromLocalStore={this.removeFromLocalStore}/>
          </div>

          <div className="app__pagenationbuttons" >
            <button className="app__pageprevious" onClick={this.handlePrevious}>Previous</button>
            <button className="app__pagenext" onClick={this.handleNext}>Next</button>
          </div>

        </main>

      </div>
    )
  }
}

export default App;
