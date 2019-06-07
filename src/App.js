import React from 'react';
import planet_list from './assets/planets.json';
import Time from './components/Time.js';
import PlanetName from './components/PlanetName.js';
import PlanetImage from './components/PlanetImage.js';
import PlanetDesc from './components/PlanetDesc.js';
import Area from './components/Area.js';
import Spaceport from './components/Spaceport.js';
import Guild from './components/Guild.js';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      planets: planet_list,
      current_planet: Math.floor(Math.random() * 11)
    }
  }
  
  newPlanet = (planetName) => {
    console.log(planetName);
    for (let i = 0; i < planet_list.length; i++) {
      console.log(planet_list[i].name);
      if (planet_list[i].name === planetName) {
        console.log(i);
        this.setState({current_planet: i})
      }
    }
  }

  render() {
    return (
      <div>
        <Time />
        <PlanetName 
          name={this.state.planets[this.state.current_planet].name}
        />
        <PlanetImage 
          source={this.state.planets[this.state.current_planet].image}
        />
        <PlanetDesc 
          text={this.state.planets[this.state.current_planet].description}
        />
        <div className="container">
          <div className="row">
            <Area 
              places={this.state.planets[this.state.current_planet].locations}
            />
            <Spaceport 
              worlds={this.state.planets[this.state.current_planet].destinations}
              id={this.state.current_planet}
              travel={this.newPlanet}
            />
            <Guild />
          </div>
        </div>
      </div>
    )
  }
  
}

export default App;