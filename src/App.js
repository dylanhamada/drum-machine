import React from "react";
import "./App.css";

// Array of drum pads used by the app
const drumPads = [
  {
    keyPress: "Q",
    drumName: "Heater 1",
    drumColor: "255, 127, 80",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyPress: "W",
    drumName: "Heater 2",
    drumColor: "244, 196, 48",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyPress: "E",
    drumName: "Heater 3",
    drumColor: "23, 126, 137",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyPress: "A",
    drumName: "Heater 4",
    drumColor: "8, 76, 97",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyPress: "S",
    drumName: "Heater 6",
    drumColor: "219, 58, 52",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyPress: "D",
    drumName: "Open HH",
    drumColor: "187, 222, 240",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyPress: "Z",
    drumName: "Kick n' Hat",
    drumColor: "0, 166, 166",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyPress: "X",
    drumName: "Kick",
    drumColor: "240, 135, 0",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyPress: "C",
    drumName: "Closed HH",
    drumColor: "73, 109, 219",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

// Displays drum pad being played
// Drum pad name passed in via props
function Display(props) {
  return <div id="display">{props.drumPad}</div>;
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
      <div id="record" onClick={this.pressRecord}>
        {this.props.buttonText}
      </div>
    );
  }
}

// Plays back sequence of drum clicks or presses based on timeStamps array in App component state
class Play extends React.Component {
  constructor(props) {
    super(props);
    this.pressPlay = this.pressPlay.bind(this);
  }

  pressPlay() {
    if (this.props.timeStamps[0].length > 0) {
      let intervals = this.props.timeStamps[0]
        .map((element, index, array) => element - array[index - 1])
        .filter(element => element);

      let soundArr = this.props.timeStamps[1];
      let counter = 0;
      let delay = intervals[counter];
      let soundId = soundArr[counter];

      // Uses a recursive function to sequence playback via setTimeout method
      let timerId = setTimeout(function playAudio() {
        document.getElementById(soundId).currentTime = 0;
        document.getElementById(soundId).play();
        counter++;
        delay = intervals[counter];
        soundId = soundArr[counter];

        if (delay && soundId) {
          timerId = setTimeout(playAudio, delay);
        }
      }, delay);
    }
  }

  render() {
    return (
      <div id="play" onClick={this.pressPlay}>
        Play
      </div>
    );
  }
}

// Displays an individual drum pad
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumStyle: {
        color: "rgb(" + this.props.drumColor + ")"
      }
    };
    this.handleDrumPlay = this.handleDrumPlay.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  // Passes event data to the event handler passed in by App via props
  handleDrumPlay(event) {
    let audioElement;

    audioElement = event.target.lastChild;

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

  handleMouseOver() {
    this.setState({
      drumStyle: {
        color: "white",
        backgroundColor: "rgb(" + this.props.drumColor + ")"
      }
    });
  }

  handleMouseOut() {
    this.setState({
      drumStyle: {
        color: "rgb(" + this.props.drumColor + ")",
        backgroundColor: "#f8f8f8"
      }
    });
  }

  render() {
    return (
      // Clicking this component triggers the event handler
      <div
        id={this.props.drumName}
        className="drum-pad"
        onClick={this.handleDrumPlay}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={this.state.drumStyle}
      >
        {this.props.letterKey}
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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // When this component loads, a document-wide 'keydown' event handler is created that calls handleDrumChange()
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    let audioElement;
    audioElement = document.getElementById(event.key.toUpperCase());

    if (audioElement) {
      let drum = drumPads.filter(
        drumPad => drumPad.keyPress === audioElement.id
      );

      audioElement.currentTime = 0;
      audioElement.play();

      this.handleDrumChange(drum);
    }
  }

  handleDrumChange(drum) {
    this.setState({
      drumName: drum[0].drumName
    });

    // If Recording is on, clicking/pressing drums will push a new Date and drum id to timeStamps array
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
        drumName={drumPad.drumName}
        drumColor={drumPad.drumColor}
      />
    ));

    return (
      <div id="drum-machine">
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
