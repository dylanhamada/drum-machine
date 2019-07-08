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

// Records sequence of drum clicks or presses and passes them to an array in App component state
class Record extends React.Component {
  constructor(props) {
    super(props);
    this.pressRecord = this.pressRecord.bind(this);
  }

  pressRecord() {
    this.props.onChange();
  }

  render() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.pressRecord}>
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.pressPlay = this.pressPlay.bind(this);
  }

  pressPlay() {}

  render() {
    return (
      <div>
        <button className="btn btn-info" onClick={this.pressPlay}>
          Play
        </button>
      </div>
    );
  }
}

// Displays an individual drum pad
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrumPlay = this.handleDrumPlay.bind(this);
  }

  // When this component loads, a document-wide 'keydown' event handler is created that calls handleDrumChange()
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

      // Allows rapid repeated plays of an individual audio element
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
      drumName: "Drum Name",
      recordStop: true,
      recordText: "Record",
      timeStamps: [[], []]
    };
    this.handleDrumChange = this.handleDrumChange.bind(this);
    this.handleRecordChange = this.handleRecordChange.bind(this);
  }

  handleDrumChange(drum) {
    this.setState({
      drumName: drum[0].drumName
    });

    // If Record button pressed, clicking/pressing drums will push a new Date and drum id to timeStamps array
    if (!this.state.recordStop) {
      let totalTime = this.state.timeStamps;

      totalTime[0].push(new Date());
      totalTime[1].push(drum[0].keyPress);

      this.setState({
        timeStamps: totalTime
      });
    }
  }

  // Changes text of Record button and sets initial and final Date elements in timeStamp array, to be used to determine playing sequence for the Play component
  handleRecordChange() {
    let recordState = this.state.recordStop ? false : true;
    let buttonState = this.state.recordText === "Record" ? "Stop" : "Record";

    if (this.state.recordStop) {
      let newTime = [[new Date()], []];

      this.setState({
        timeStamps: newTime
      });
    } else {
      let totalTime = this.state.timeStamps;
      totalTime[0].push(new Date());

      this.setState({
        timeStamps: totalTime
      });
    }

    this.setState({
      recordStop: recordState,
      recordText: buttonState
    });
  }

  render() {
    // Generate a series of DrumPad components using the map method
    const drumList = drumPads.map(drumPad => (
      <DrumPad
        key={drumPad.keyPress}
        letterKey={drumPad.keyPress}
        audioSrc={drumPad.audioSrc}
        onChange={this.handleDrumChange}
      />
    ));

    return (
      <div id="drum-machine" className="container bg-primary">
        <Display drumPad={this.state.drumName} />
        {drumList}
        <Record
          onChange={this.handleRecordChange}
          recording={this.state.recordStop}
          buttonText={this.state.recordText}
        />
        <Play timeStamps={this.state.timeStamps} />
      </div>
    );
  }
}

export default App;
