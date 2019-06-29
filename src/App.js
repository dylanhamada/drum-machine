import React from "react";

const drumPads = [
  { keyPress: "Q" },
  { keyPress: "W" },
  { keyPress: "E" },
  { keyPress: "A" },
  { keyPress: "S" },
  { keyPress: "D" },
  { keyPress: "Z" },
  { keyPress: "X" },
  { keyPress: "C" }
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
  }

  render() {
    return (
      <div className="drum-pad">
        <h1>{this.props.letterKey}</h1>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const drumList = drumPads.map(drumPad => (
      <DrumPad key={drumPad.keyPress} letterKey={drumPad.keyPress} />
    ));

    return (
      <div id="drum-machine" className="container bg-primary">
        <Display drumPad="High Hat" />
        {drumList}
      </div>
    );
  }
}

export default App;
