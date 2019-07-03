import React from "react";

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

function Display(props) {
  return (
    <div id="display">
      <h1 className="text-center">{props.drumPad}</h1>
    </div>
  );
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrumPlay = this.handleDrumPlay.bind(this);
  }

  handleDrumPlay(event) {
    this.props.onChange(event);
  }

  render() {
    return (
      <div className="drum-pad" onClick={this.handleDrumPlay}>
        <h1>{this.props.letterKey}</h1>
        <audio
          id={this.props.letterKey}
          className="clip"
          src={this.props.audioSrc}
          drumname={this.props.drumName}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumName: "High Hat"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleChange);
  }

  handleChange(event) {
    let audioElement;

    if (event.type === "click") {
      audioElement = document.getElementById(event.target.innerHTML);
    } else {
      audioElement = document.getElementById(event.key.toUpperCase());
    }

    if (audioElement) {
      audioElement.play();

      this.setState({
        drumName: audioElement.id
      });
    }
  }

  render() {
    const drumList = drumPads.map(drumPad => (
      <DrumPad
        key={drumPad.keyPress}
        letterKey={drumPad.keyPress}
        audioSrc={drumPad.audioSrc}
        onChange={this.handleChange}
        drumName={drumPad.drumName}
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
