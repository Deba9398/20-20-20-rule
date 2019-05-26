import React from 'react';
import Timer from './components/Timer';
import About from './components/About';
import NotificationsRequest from './components/NotificationsRequest';
import './App.scss';

class App extends React.Component {

  state = {
    notificationsEnabled: Notification.permission === 'granted'
  }

  enableNotifications() {
    Notification.requestPermission().then((permission) => {
      this.setState({
        notificationsEnabled: permission === 'granted'
      });
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Prevent Computer Eye Strain with the 20-20-20 Rule</h1>
        <h2>Every <em>20</em> minutes of screen time look at least <em>20</em> feet away for <em>20</em> seconds</h2>

        { this.state.notificationsEnabled 
          ? <Timer /> 
          : <NotificationsRequest enableNotifications={() => this.enableNotifications()}/> 
        }

        <About />
      </div>
    );
  }
}

export default App;
