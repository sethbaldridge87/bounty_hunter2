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
        if (planetData.destinations[i] !== initialPlanet.name) {
          options.push(planetData.destinations[i]);
        }
      }
      let newPlanet = options[Math.floor(Math.random() * options.length)];
      for (let z = 0; z < planet_list.length; z++) {
        if (planet_list[z].name === newPlanet) {
          newPlanet = planet_list[z];
        }
      }
      // SOLVE DUPLICATE PROBLEM!
      return newPlanet;
    }
    let thirdPlanet = setPlanet(secondPlanet);
    let fourthPlanet = setPlanet(thirdPlanet);
    let nextPlanet = secondPlanet;

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
      finalPlanet: false
      // deprecated_planets: initialUsed
    }
    console.log('next planets are ' + this.state.second_planet.name + ', ' + this.state.third_planet.name + ', ' + this.state.fourth_planet.name);
    
  }

  newPlanet = (planetName) => {
    this.setState({investigate:false})
    for (let i = 0; i < planet_list.length; i ++) {
      if (planet_list[i].name === planetName) {
        this.setState({current_planet: planet_list[i]}, () => {
          if (this.state.current_planet === this.state.second_planet) {
            this.setState({next_planet: this.state.third_planet});
          } else if (this.state.current_planet === this.state.third_planet) {
            this.setState({next_planet: this.state.fourth_planet});
          } else if (this.state.current_planet === this.state.fourth_planet) {
              this.setState({finalPlanet: true});
              console.log('Target found');
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
    // console.log(locale.data);
    for (let i = 0; i < this.state.current_planet.locations.length; i++) {
      // console.log(this.state.current_planet.locations[i]);
      if (this.state.current_planet.locations[i].name === locale.data.name) {
        arrayKey = i;
      }
    }
    this.setState({
      investigate:true,
      current_locale:locale.data
    });
    if (this.state.onTrack === true) {
      clueText = this.state.next_planet.dialogue[arrayKey].clue;
    } else {
      clueText = this.state.next_planet.dialogue[arrayKey].unknown;
    }
    this.setState({
        current_dialogue: clueText
      })
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
    } else {
      // let speech;
      // if (this.state.onTrack === true) {
      //   speech = this.state.next_planet.dialogue;
      // } else {
      //   speech = this.state.next_planet.dialogue;
      // }
      // console.log(speech);
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

  // newPlanet = (planetName) => {
  //   this.setState({previous_planet: this.state.current_planet});
  //   for (let i = 0; i < planet_list.length; i++) {
  //     if (planet_list[i].name === planetName) {
  //       this.setState({current_planet: planet_list[i]}, () => {
  //         if (planetName === this.state.next_planet.name) {
  //           let options = [];
  //           for(let z = 0; z < this.state.current_planet.destinations.length; z++) {
  //             options.push(this.state.current_planet.destinations[z]);
  //           }
  //           for (let i = 0; i < this.state.deprecated_planets.length; i++) {
  //             for (let y = 0; y < options.length; y++) {
  //               if (this.state.deprecated_planets[i] === options[y]) {
  //                 options.splice(y, 1);
  //               }
  //             }
  //           }
  //           console.log(options);
  //           let nextPlanet = Math.floor(Math.random() * options.length);
  //           nextPlanet = this.state.current_planet.destinations[nextPlanet];
  //           for (let i = 0; i < planet_list.length; i++) {
  //             if (planet_list[i].name === nextPlanet) {
  //               this.setState({next_planet: planet_list[i]}, () => {
  //                 console.log('next planet is ' + nextPlanet);
  //                 let usedPlanets = [];
  //                 for (let i = 0; i < this.state.current_planet.destinations.length; i++) {
  //                   if (this.state.current_planet.destinations[i] !== this.state.next_planet.name) {
  //                     usedPlanets.push(this.state.current_planet.destinations[i]);
  //                   }
  //                 }
  //                 // console.log(usedPlanets);
  //                 let otherUsedPlanets = this.state.deprecated_planets;
  //                 // console.log(otherUsedPlanets);
  //                 let allUsedPlanets = usedPlanets.concat(otherUsedPlanets);
  //                 // console.log(allUsedPlanets);
  //                 this.setState({deprecated_planets: allUsedPlanets});
  //               });
  //             }
  //           }
            
  //         } else {
  //           console.log('incorrect');
  //         }
  //       });
  //     }
  //   }   
  // }
