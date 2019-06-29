import React from "react";

const drumPads = [
  {
    keyPress: "Q",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "W",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "E",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "A",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "S",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "D",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "Z",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "X",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
  },
  {
    keyPress: "C",
    audioSrc: "https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg"
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
    let audioElement = document.getElementById(event.target.innerHTML);
    audioElement.play();
    this.props.onChange(event.target.innerHTML);
  }

  render() {
    return (
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
      drumName: "High Hat"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(drumName) {
    this.setState({
      drumName: drumName
    });
  }

  render() {
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
