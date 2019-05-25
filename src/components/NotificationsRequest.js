import React from 'react';

class NotificationsRequest extends React.Component {
    render() {
        return (
            <div>
                <h3>You must have nofications enabled to use this website.</h3>
                <button onClick={() => this.props.enableNotifications()}>ENABLE</button>
            </div>
        );
    }
}

export default NotificationsRequest;
