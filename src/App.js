import React from 'react';
import Timer from './components/Timer';
import About from './components/About';
import './App.scss';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h1>Prevent Computer Eye Strain with the 20-20-20 Rule</h1>
        <h2>Every <em>20</em> minutes of screen time look at least <em>20</em> feet away for <em>20</em> seconds</h2>
        <Timer /> 
        <About />
      </div>
    );
  }
}

export default App;
