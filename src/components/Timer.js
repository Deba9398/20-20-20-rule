import React from 'react';
import './Timer.css';
import worker from "../workers/timer-worker.js";
import WebWorker from "../workers/worker-setup.js";

class Timer extends React.Component {

    constructor(props) {
        super(props);

        const newWorker = new WebWorker(worker);

        newWorker.addEventListener('message', (e) => {
            this.setState(e.data);
            console.log('Message from Worker: ' + e.data);
        });

        this.state = {
            worker: newWorker,
            formatter: new Intl.RelativeTimeFormat("en", {localeMatcher: 'best fit', number: 'always', 'style': 'short' }),
            mode: 'stopped',
            remainingTicks: 0
        }
    }

    startTimer() {
        this.state.worker.postMessage('start');
    }

    stopTimer() {
        this.state.worker.postMessage('stop');
    }

    render() {
        return (
            <div className="timer">
                <h1>Timer</h1>
                <p>Mode: {this.state.mode}</p>
                <p>{this.state.formatter.format(parseInt(this.state.remainingTicks, 10), 'second')}</p>
                <button onClick={() => this.startTimer()}>Start</button>
                <button onClick={() => this.stopTimer()}>Stop</button>
            </div>
        );
    }
}

export default Timer;
