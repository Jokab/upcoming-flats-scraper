import { Component } from 'react';
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
            <ApartmentCard link={"https://bjurfors.se" + a.link} sqMeter={a.sqMeter} rooms={a.rooms} price={a.price}/>
          );
        })}
      </div>
    );
  }

  async componentDidMount() {
    const result = await fetch( "http://localhost:5000/apartments", {
      method: 'GET',
    });

    const response = await result.json();
    this.setState({...this.state, apartments: response});
  }
}

type ApartmentProps = {
  link: string;
  sqMeter: string;
  rooms: string;
  price: string;
}

class ApartmentCard extends Component<ApartmentProps, {}> {
  render() {
    return (
        <div>
          <a href={this.props.link}>{this.props.link}</a>
          <p>{this.props.sqMeter} {this.props.rooms} {this.props.price}</p>
          <br/>
        </div>
      );
  }
}

export default App;


