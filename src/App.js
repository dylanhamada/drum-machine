import React from "react";
import "./App.css";

/* Array of drum pad objects to be passed into various components,
and which include the corresponding key, drum name, drum color, and
audio source */
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

/* Displays the name of the drum pad being played, using props passed in
via the App component */
function Display(props) {
  return <div id="display">{props.drumPad}</div>;
}

/* Displays app author as well as an info button that displays the Modal
component, which contains further information about the app */
class Author extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    document.querySelector(".modal").style.display = "block";
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

/* Modal component that displays further info about the app, including
instructions and any media credit */
function Modal() {
  /* Sets the CSS display value of the component to 'none' when the 
  'x' button is clicked */
  function handleClose() {
    document.querySelector(".modal").style.display = "none";
  }

  return (
    <div className="modal">
      <div className="modalContent">
        <span className="closeBtn" onClick={handleClose}>
          &times;
        </span>
        <h1 className="appName">Drum Machine App</h1>
        <h4 className="appDesc">
          A FreeCodeCamp Front End Development Project built with React
        </h4>
        <h4 className="instructions">Instructions:</h4>
        <ul>
          <li>
            Click the buttons or press the corresponding key to play drum sounds
          </li>
          <li>
            Click the Record button to begin recording your clicks or key
            presses, then click Stop to finish recording
          </li>
          <li>Click Play to hear your drum-playing sequence</li>
        </ul>
        <p>
          Background image courtesy of Hamed Daram on{" "}
          <a href="https://unsplash.com/photos/-5fbmfaInwg" target="_blank">
            Unsplash
          </a>
        </p>
      </div>
    </div>
  );
}

/* Toggles the recordStop property in App state that permits state to 
begin tracking drumPad clicks and key presses and add them to the
timeStamps array */
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

  /* MouseOver and MouseOut event handlers to change the recordButton's style */
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

  /* Iterates through the timeStamps object passed in via the App component,
  which contains time stamps and drum pad ids as recorded by the user;
  It then calculates the time intervals between these time stamps, and
  recursively calls the onPlay function passed in via App, using the 
  drumpad ids as arguments */
  pressPlay() {
    /* Only fires if the timeStamps object is not empty, ie. it won't
    execute if the user has not recorded any sequences yet */
    if (
      this.props.timeStamps[0].length > 0 &&
      this.props.timeStamps[1].length > 0
    ) {
      /* Calculates the intervals between time stamps */
      let intervals = this.props.timeStamps[0]
        .map((element, index, array) => element - array[index - 1])
        .filter(element => element);

      /* Changes the text of the playButton span to 'Playing' while the
      sequence is playing, then changes it back to 'Play' */
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

      /* Initializes a counter to iterate through the timeStamps object */
      let soundArr = this.props.timeStamps[1];
      let counter = 0;
      let delay = intervals[counter];
      let soundId = soundArr[counter];

      /* Recursive function that calls itself based on the calculated
      intervals between time stamps */
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

/* Individual drum pad elements that use elements passed in from the
drumPads array for styling */
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

  /* Passes event data to the handleKeyPress function passed in via the
  App component, which plays the corresponding audio element */
  handleDrumPlay(event) {
    this.props.onChange(event);
  }

  /* MouseOver and MouseOut event handlers to change the styles of the
  component */
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

/* The main component that amalgamates all other components */
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

  /* Document-wide event handler that listens for key presses, and calls the
  handleKeyPress function to play the corresponding audio file if one of
  the specified keys is pressed */
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

  /* Updates the drum name in App state, and updates the timeStamps object
  in App state with a new timestamp and drum id when the user presses a
  relevant key or clicks a DrumPad element */
  handleDrumChange(drum) {
    this.setState({
      drumName: drum[0].drumName
    });

    /* If Recording is on, clicking/pressing drums will push a new Date 
    and drum id to timeStamps array */
    if (!this.state.recordStop) {
      let totalTime = this.state.timeStamps;

      totalTime[0].push(new Date());
      totalTime[1].push(drum[0].keyPress);

      this.setState({
        timeStamps: totalTime
      });
    }
  }

  /* Changes text of Record button and sets initial and 
  final Date elements in timeStamp array, to be used to 
  determine playing sequence for the Play component */
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
    /* Generate a series of DrumPad elements using the map method */
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
