import React from 'react';
import Timer from './components/Timer';
import './App.css';
import NotificationsRequest from './components/NotificationsRequest';

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
        { this.state.notificationsEnabled 
          ? <Timer /> 
          : <NotificationsRequest enableNotifications={() => this.enableNotifications()}/> 
        }
      </div>
    );
  }
}

export default App;
