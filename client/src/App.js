import React from 'react';
import Canvas from './Components/Canvas'
import Game from './Class/Game'

class App extends React.Component {
  constructor(){
    super()
    this.game = new Game([]);
  }

  render(){
    return (
      <div className="App">
        <Canvas game={this.game}/>
      </div>
    );
  }
}

export default App;
