import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


type AppState = {
  apartments: any[];
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {apartments: []}
  }

  render() {
    return (
      <div className="App">
        {this.state.apartments.map((a: any, i: number) => {
          return (
            <ApartmentCard link={"https://bjurfors.se" + a}/>
          );
        })}
      </div>
    );
  }

  async componentDidMount() {
    const result = await fetch( "http://localhost:5000", {
      method: 'GET',
    });

    const response = await result.json();
    console.log(response);
    this.setState({...this.state, apartments: response});
  }
}

type ApartmentProps = {
  link: string;
}

class ApartmentCard extends Component<ApartmentProps, {}> {
  render() {
    return (
        <div>
          <a href={this.props.link}>{this.props.link}</a>
          <br/>
        </div>
      );
  }
}

export default App;


