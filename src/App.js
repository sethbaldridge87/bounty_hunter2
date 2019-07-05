import React from 'react';
import planet_list from './assets/planets.json';
import Time from './components/Time.js';
import PlanetName from './components/PlanetName.js';
import PlanetImage from './components/PlanetImage.js';
import PlanetDesc from './components/PlanetDesc.js';
import Area from './components/Area.js';
import Spaceport from './components/Spaceport.js';
import ClueSpot from './components/ClueSpot.js';
import Guild from './components/Guild.js';
import './App.css';

class App extends React.Component {
  constructor(props){
    let initialPlanet = planet_list[Math.floor(Math.random() * 11)];
    let secondPlanet = initialPlanet.destinations[Math.floor(Math.random() * initialPlanet.destinations.length)];
    for (let i = 0; i < planet_list.length; i++) {
      if (planet_list[i].name === secondPlanet) {
        secondPlanet = planet_list[i];
      }
    }

    var setPlanet = (planetData) => {
      let options = [];
      for (let i = 0; i < planetData.destinations.length; i++) {
        if (planetData.destinations[i] !== initialPlanet.name && planetData.destinations[i] !== secondPlanet.name) {
          options.push(planetData.destinations[i]);
        }
      }
      let newPlanet = options[Math.floor(Math.random() * options.length)];
      for (let z = 0; z < planet_list.length; z++) {
        if (planet_list[z].name === newPlanet) {
          newPlanet = planet_list[z];
        }
      }
      return newPlanet;
    }
    let thirdPlanet = setPlanet(secondPlanet);
    let fourthPlanet = setPlanet(thirdPlanet);
    let nextPlanet = secondPlanet;
    let lastStop = Math.floor(Math.random() * fourthPlanet.locations.length);
    lastStop = fourthPlanet.locations[lastStop];
    super(props);
    this.state = {
      planets: planet_list,
      current_planet: initialPlanet,
      current_locale: "",
      previous_planet: "",
      first_planet: initialPlanet,
      second_planet: secondPlanet,
      third_planet: thirdPlanet,
      fourth_planet: fourthPlanet,
      next_planet: nextPlanet,
      onTrack: true,
      current_dialogue: "",
      investigate: false,
      finalPlanet: false,
      hideout: lastStop
    }
    console.log(this.state.current_planet.name);
    console.log('next planets are ' + this.state.second_planet.name + ', ' + this.state.third_planet.name + ', ' + this.state.fourth_planet.name);
  }

  newPlanet = (planetName) => {
    this.setState({investigate:false})
    for (let i = 0; i < planet_list.length; i ++) {
      if (planet_list[i].name === planetName) {
        this.setState({finalPlanet: false});
        this.setState({current_planet: planet_list[i]}, () => {
          if (this.state.current_planet === this.state.first_planet) {
            this.setState({onTrack:true});
            this.setState({next_planet: this.state.second_planet});
          } else if (this.state.current_planet === this.state.second_planet) {
            this.setState({onTrack:true});
            this.setState({next_planet: this.state.third_planet});
          } else if (this.state.current_planet === this.state.third_planet) {
            this.setState({onTrack:true});
            this.setState({next_planet: this.state.fourth_planet});
          } else if (this.state.current_planet === this.state.fourth_planet) {
              this.setState({onTrack:true});
              this.setState({finalPlanet: true});
              console.log('Target found');
              console.log(this.state.hideout);
          } else {
            this.setState({onTrack:false})
            console.log('incorrect');
          }
        });
      }
    }
  }

  investigate = (locale) => {
    let arrayKey;
    let clueText;
    for (let i = 0; i < this.state.current_planet.locations.length; i++) {
      if (this.state.current_planet.locations[i].name === locale.data.name) {
        arrayKey = i;
      }
    }
    this.setState({
      investigate:true,
      current_locale:locale.data
    });
    if (this.state.current_locale === this.state.hideout) {
      alert("There he is!");
    }
    if (this.state.onTrack === true) {
      if (this.state.finalPlanet === true) {
        clueText = this.state.next_planet.dialogue[arrayKey].final;
      } else {
        clueText = this.state.next_planet.dialogue[arrayKey].clue;
      }
    } else {
      clueText = this.state.next_planet.dialogue[arrayKey].unknown;
    }
    this.setState({
        current_dialogue: clueText
    });
  }
  
  render() {
    if (this.state.investigate === false) {
      return (
        <div>
          <Time />
          <PlanetName 
            name={this.state.current_planet.name}
          />
          <PlanetImage
            source={this.state.current_planet.image}
          />
          <PlanetDesc 
            text={this.state.current_planet.description}
          />
          <div className="container" id="mainScreens">
            <div className="row">
              <Area 
                places={this.state.current_planet.locations}
                investigate={this.investigate}
              />
              <Spaceport 
                worlds={this.state.current_planet.destinations}
                id={this.state.current_planet_number}
                travel={this.newPlanet}
              />
              <Guild />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Time />
          <PlanetName 
            name={this.state.current_planet.name}
          />
          <ClueSpot
            data={this.state.current_locale}
            nextData={this.state.current_dialogue}
          />
          <PlanetDesc 
            text={this.state.current_planet.description}
          />
          <div className="container">
            <div className="row">
              <Area 
                places={this.state.current_planet.locations}
                investigate={this.investigate}
              />
              <Spaceport 
                worlds={this.state.current_planet.destinations}
                id={this.state.current_planet_number}
                travel={this.newPlanet}
              />
              <Guild />
            </div>
          </div>
        </div>
      )
    }
  }
  
}

export default App;