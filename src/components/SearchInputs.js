import React from 'react';

class SearchInputs extends React.Component {

  constructor(){
    super();
    this.state ={
      searchQuery: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.receiveQuery(this.state.searchQuery)
  }


  render(){
    return (
      <div className="searchinputs">

        <form className="searchinputs__form" onSubmit={this.handleSubmit} id="searchinputs__form">
          <input className="searchinputs__textbox" onChange={this.handleChange} placeholder="Enter Your Search"  value={this.state.searchQuery}/>
          <button className="searchinputs__button">Press For Movie Info!</button>
        </form>

      </div>
    );
  }
}

export default SearchInputs;
