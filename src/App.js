import React from "react";

function Display(props) {
  return (
    <div id="display">
      <h1 className="text-center">{props.drumPad}</h1>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="drum-machine" className="container bg-primary">
        <Display drumPad="High Hat" />
      </div>
    );
  }
}

export default App;
