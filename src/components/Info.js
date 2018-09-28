import React from 'react';

class Info extends React.Component {

  constructor(){
    super();
  }

  render() {
    return(
    <div>
        <p className="info__plottext"> {this.props.moviePlot} </p>
    </div>
  );

  }
}

  export default Info;
