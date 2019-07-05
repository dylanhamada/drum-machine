import React from "react";

// Array of drum pads used by the app
const drumPads = [
  {
    keyPress: "Q",
    drumName: "Heater 1",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyPress: "W",
    drumName: "Heater 2",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyPress: "E",
    drumName: "Heater 3",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyPress: "A",
    drumName: "Heater 4",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyPress: "S",
    drumName: "Heater 6",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyPress: "D",
    drumName: "Open HH",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyPress: "Z",
    drumName: "Kick n' Hat",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyPress: "X",
    drumName: "Kick",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyPress: "C",
    drumName: "Closed HH",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

// Displays drum pad being played
// Drum pad name passed in via props
function Display(props) {
  return (
    <div id="display">
      <h1 className="text-center">{props.drumPad}</h1>
    </div>
  );
}

// Displays an individual drum pad
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrumPlay = this.handleDrumPlay.bind(this);
  }

  // When this component loads, a document-wide 'keydown' event handler is created that calls handleChange()
  componentDidMount() {
    document.addEventListener("keydown", this.handleDrumPlay);
  }

  // Passes event data to the event handler passed in by App via props
  handleDrumPlay(event) {
    let audioElement;

    // Depending on the event triggered, the audio element is assigned to audioElement
    if (event.type === "click") {
      audioElement = document.getElementById(event.target.innerHTML);
    } else {
      audioElement = document.getElementById(event.key.toUpperCase());
    }

    if (audioElement) {
      // Filters the drumPads array to find the element whose keyPress value matches the audio element's id
      let drum = drumPads.filter(
        drumPad => drumPad.keyPress === audioElement.id
      );

      // Allows rapid repeated plays of the audio element
      audioElement.currentTime = 0;
      audioElement.play();

      // Call the onChange function passed in from the App component, passing the drum variable so App can update the Display component
      this.props.onChange(drum);
    }
  }

  render() {
    return (
      // Clicking this component triggers the event handler
      <div className="drum-pad" onClick={this.handleDrumPlay}>
        <h1>{this.props.letterKey}</h1>
        <audio
          id={this.props.letterKey}
          className="clip"
          src={this.props.audioSrc}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumName: "Drum Name"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(drum) {
    this.setState({
      drumName: drum[0].drumName
    });
  }

  render() {
    // Generate a series of DrumPad components using the map method
    const drumList = drumPads.map(drumPad => (
      <DrumPad
        key={drumPad.keyPress}
        letterKey={drumPad.keyPress}
        audioSrc={drumPad.audioSrc}
        onChange={this.handleChange}
      />
    ));

    return (
      <div id="drum-machine" className="container bg-primary">
        <Display drumPad={this.state.drumName} />
        {drumList}
      </div>
    );
  }
}

export default App;
