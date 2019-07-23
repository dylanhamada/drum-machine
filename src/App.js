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

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let modal = document.querySelector(".modal");

    modal.style.display = "block";
  }

  render() {
    return (
      <div className="authorContainer">
        <span className="author">Coded and designed by Dylan Hamada</span>
        <span className="infoBtn" onClick={this.handleClick}>
          <i id="infoIcon" className="fas fa-info-circle" />
        </span>
      </div>
    );
  }
}

function Modal() {
  function handleClose() {
    document.querySelector(".modal").style.display = "none";
  }

  return (
    <div className="modal">
      <div className="modalContent">
        <span className="closeBtn" onClick={handleClose}>
          &times;
        </span>
        <h1>Drum Machine App</h1>
        <ul>
          <li>
            Click the buttons or press the corresponding key to play drum sounds
          </li>
          <li>
            Click the Record button to begin recording your clicks or key
            presses
          </li>
          <li>Click Play to hear your drum playing sequence</li>
        </ul>
        <p>
          Background image courtesy of Hamed Daram on
          <a href="https://unsplash.com/photos/-5fbmfaInwg">Unsplash</a>
        </p>
      </div>
    </div>
  );
}

// Records sequence of drum clicks or presses and passes them to an array in App component state
class Record extends React.Component {
  constructor(props) {
    super(props);
    this.pressRecord = this.pressRecord.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  pressRecord() {
    this.props.onChange();
  }

  handleMouseOver() {
    document.getElementById("recordButton").classList.remove("hover-text-out");
    document.getElementById("recordButton").classList.add("hover-text");
  }

  handleMouseOut() {
    document.getElementById("recordButton").classList.remove("hover-text");
    document.getElementById("recordButton").classList.add("hover-text-out");
  }

  render() {
    return (
      <div
        id="record"
        onClick={this.pressRecord}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <span id="recordButton">{this.props.recordText}</span>
      </div>
    );
  }
}

/* Plays back sequence of drum clicks or presses based on timeStamps 
array in App component state */
class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playText: "Play"
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.pressPlay = this.pressPlay.bind(this);
  }

  /* MouseOver and MouseOut event handlers */
  handleMouseOver() {
    document.getElementById("playButton").classList.remove("hover-text-out");
    document.getElementById("playButton").classList.add("hover-text");
  }

  handleMouseOut() {
    document.getElementById("playButton").classList.remove("hover-text");
    document.getElementById("playButton").classList.add("hover-text-out");
  }

  pressPlay() {
    if (
      this.props.timeStamps[0].length > 0 &&
      this.props.timeStamps[1].length > 0
    ) {
      let intervals = this.props.timeStamps[0]
        .map((element, index, array) => element - array[index - 1])
        .filter(element => element);

      let intervalTotal = intervals.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      this.setState({
        playText: "Playing"
      });
      let textTimer = setTimeout(() => {
        this.setState({
          playText: "Play"
        });
      }, intervalTotal);

      let soundArr = this.props.timeStamps[1];
      let counter = 0;
      let delay = intervals[counter];
      let soundId = soundArr[counter];

      // Uses a recursive function to sequence playback via setTimeout method
      let playAudio = () => {
        this.props.onPlay(soundId);
        counter++;
        delay = intervals[counter];
        soundId = soundArr[counter];

        if (delay && soundId) {
          timerId = setTimeout(playAudio, delay);
        }
      };

      let timerId = setTimeout(playAudio, delay);
    }
  }

  render() {
    return (
      <div
        id="play"
        onClick={this.pressPlay}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <span id="playButton">{this.state.playText}</span>
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
        color: "rgb(" + this.props.drumColor + ")",
        backgroundColor: "#f8f8f8",
        transition: "all 0.3s"
      }
    };
    this.handleDrumPlay = this.handleDrumPlay.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  // Passes event data to the event handler passed in by App via props
  handleDrumPlay(event) {
    this.props.onChange(event);
  }

  handleMouseOver() {
    this.setState({
      drumStyle: {
        color: "#f8f8f8",
        backgroundColor: "rgb(" + this.props.drumColor + ")",
        transition: "all 0.3s"
      }
    });
  }

  handleMouseOut() {
    this.setState({
      drumStyle: {
        color: "rgb(" + this.props.drumColor + ")",
        backgroundColor: "#f8f8f8",
        transition: "all 0.3s"
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
        <div className="drumLetter">{this.props.letterKey}</div>
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
      drumName: "Drum Machine",
      recordStop: true,
      recordText: "Record",
      timeStamps: [[], []]
    };
    this.handleDrumChange = this.handleDrumChange.bind(this);
    this.handleRecordChange = this.handleRecordChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.drumPadPress = this.drumPadPress.bind(this);
  }

  // When this component loads, a document-wide 'keydown' event handler is created that calls handleDrumChange()
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  /* Plays the child audio element of the DrumPad element being clicked,
  or whose related key is being pressed, or the audio element being passed
  by the Play component */
  handleKeyPress(event) {
    let audioElement;

    /* Sets audioElement based on what component or function is calling
    handleKeyPress */
    if (event.type === "click") {
      audioElement = document.getElementById(event.target.innerHTML);
    } else if (event.type === "keydown") {
      audioElement = document.getElementById(event.key.toUpperCase());
    } else {
      audioElement = document.getElementById(event);
    }

    if (audioElement) {
      /* Filters the drumPad array for the element whose "keyPress" property
      matches the id of audioElement, then passes the element to the
      handleDrumChange function */
      let drum = drumPads.filter(
        drumPad => drumPad.keyPress === audioElement.id
      );
      this.handleDrumChange(drum);

      /* Plays audioElement, and sets the "currentTime" property to 0 to
      allow rapid playing of the element even before the previous play
      has finished */
      audioElement.currentTime = 0;
      audioElement.play();

      /* Calls the drumPadPress function to simulate a button press on the
      parent DrumPad element of audioElement */
      this.drumPadPress(audioElement.parentElement);
    }
  }

  /* Changes a DrumPad element's style to simulate a visual "push" whenever 
  the element is clicked, the related key is pressed, or the child audio 
  element is played via the Play component functionality */
  drumPadPress(element) {
    /* Filters the drumPads array to find the relevant element,
    so the drumColor property can be referenced */
    let drumInfo = drumPads.filter(
      drumPad => drumPad.keyPress === element.childNodes[1].id
    )[0];

    element.style.fontSize = "1.5em";
    element.style.color = "white";
    element.style.backgroundColor = "rgb(" + drumInfo.drumColor + ")";
    element.style.transition = "all 0.05s";

    /* Visually simulates a button press by "resetting" the previously
    set styles using a setTimeout method */
    let timerId = setTimeout(() => {
      element.style.fontSize = "1em";
      element.style.color = "rgb(" + drumInfo.drumColor + ")";
      element.style.backgroundColor = "#f8f8f8";
      element.style.transition = "all 0.05s";
    }, 100);
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
    let recordText;
    let recordState = this.state.recordStop ? false : true;

    if (this.state.recordStop) {
      recordText = "Stop";
    } else {
      recordText = "Record";
    }

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
      recordText: recordText
    });
  }

  render() {
    // Generate a series of DrumPad components using the map method
    const drumList = drumPads.map(drumPad => (
      <DrumPad
        key={drumPad.keyPress}
        letterKey={drumPad.keyPress}
        audioSrc={drumPad.audioSrc}
        onChange={this.handleKeyPress}
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
          recordText={this.state.recordText}
        />
        <Play timeStamps={this.state.timeStamps} onPlay={this.handleKeyPress} />
        <Author />
        <Modal />
      </div>
    );
  }
}

export default App;
