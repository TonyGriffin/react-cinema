import React from 'react';
import SearchInputs from './SearchInputs';
import Info from './Info';
import Thumbs from './Thumbs';

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
      pageNum: 1,
      localStore: []
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
    let titleUrl =`http://www.omdbapi.com/?apikey=323bfd8f&i=${imdbID}&plot=full&page=${this.state.pageNum}`
    fetch(titleUrl)
    .then(response => response.json())
    .then(content => {
      console.log(content)
      this.setState( {
        plot: content.Plot,
        poster: poster
      })
      //below code returns the view to the movie title set
      //with the ref attribute on the h2.
      if (this._title) {
        this._title.scrollIntoView();
      }
    })
  }

  //PagenationS
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



  addToLocalStore(imdbKey, moviePoster) {
    myStorage.setItem(imdbKey, moviePoster);
    console.log(myStorage);
  }

  removeFromLocalStore(imdbKey) {
    myStorage.removeItem(imdbKey);
    console.log(myStorage);
  }

  // addToLocalStore(imdbKey, moviePoster) {
  //   // create a new item
  //   const newItem = {
  //     imdbKey: moviePoster,
  //     value: this.state.newItem.slice()
  //   };
  //
  //   // copy current list of items
  //   const list = [...this.state.list];
  //
  //   // add the new item to the list
  //   list.push(newItem);
  //
  //   // update state with new list, reset the new item input
  //   this.setState({
  //     list,
  //     newItem: ""
  //   });
  // }



  render() {
    return (
      <div className="app">

        <div className="app__headercontainer">
          <h1 className="app__logo">Tony's Titles</h1>
          <SearchInputs className="app__searchinputs" receiveQuery={this.receiveQuery} />
        </div>

        <main className="app__content">


        <div className="app__movie" >
          <h2 ref={h2 => this._title = h2} className="app__movietitle"> {this.state.movieTitle} </h2>
          <img className="app__movieposter" src={this.state.poster} />
          <Info className="app__movieplot" moviePlot={this.state.plot} />
        </div>

          <Thumbs className="app__thumbs" movieArray={this.state.movieArray} moviePlot={this.state.plot} imdbRating={this.state.imdbRating}  receivePlot={this.receivePlot} addToLocalStore={this.addToLocalStore}/>

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
