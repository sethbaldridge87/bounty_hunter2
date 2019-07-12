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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      planets: planet_list,
      current_planet: initialPlanet,
      current_locale: "",
      first_planet: initialPlanet,
      second_planet: secondPlanet,
      third_planet: thirdPlanet,
      fourth_planet: fourthPlanet,
      next_planet: nextPlanet,
      onTrack: true,
      current_dialogue: "",
      investigate: false,
      finalPlanet: false,
      hideout: lastStop,
      show: false,
      victory: false
    }
  }
  gameSetup = () => {
    console.log('Game is being setup');
  }
  handleClose() {
    this.setState({ show: false });
    if (this.state.victory === true) {
      console.log("You've won the game!");
      this.gameSetup();
    }
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount(){
    this.handleShow();
    this.gameSetup();
  }
  
  newPlanet = (planetName) => {
    this.setState({investigate:false});
    this.setState({current_planet: planet_list[11]});
    setTimeout(
      function() {
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
              } else {
                this.setState({onTrack:false});
              }
            });
          }
        }
      }.bind(this),3000
    );
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
    }, () => {
      if (this.state.current_locale === this.state.hideout) {
        // Target
        this.handleShow();
        this.setState({
          victory: true
        });
      }
    });
    
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
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Body>
              Attention bounty hunter! You have been hired by the Galactic Republic to recover a valuable item that has been stolen. Your target was last seen on the planet {this.state.first_planet.name}. Investigate the planet and find clues to help you determine where your target has fled. Continue to follow their trail until you find them! <br></br><br></br>Good luck!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Body>
              Congratulations! You have successfully tracked down and apprehended the criminal! You can collect your credits at the local Bounty Hunter's Guild chapter.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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