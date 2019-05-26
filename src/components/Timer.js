import React from 'react';
import './Timer.scss';
import worker from "../workers/timer-worker.js";
import WebWorker from "../workers/worker-setup.js";

class Timer extends React.Component {

    constructor(props) {
        super(props);

        const newWorker = new WebWorker(worker);

        newWorker.addEventListener('message', (e) => {
            this.setState(e.data);
            document.title = e.data.mode === 'stopped' ? '20-20-20 Rule' : `${Math.ceil(this.state.remainingTicks / 60)} minutes`;
            console.log('Message from Worker: ' + e.data);
        });

        this.state = {
            worker: newWorker,
            formatter: new Intl.RelativeTimeFormat("en", {localeMatcher: 'best fit', number: 'always', 'style': 'short' }),
            mode: 'stopped',
            remainingTicks: 20 * 60
        }
    }

    startTimer() {
        this.state.worker.postMessage('start');
    }

    stopTimer() {
        this.state.worker.postMessage('stop');
    }

    render() {
        const total = this.state.remainingTicks / (60 * 20) * 100;
        const seconds = this.state.remainingTicks % 60;
        const minutes = (this.state.remainingTicks - seconds) / 60;

        return (
            <div className="timer">
                <div className="donut-chart">
                    <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
                        <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="transparent"></circle>
                        <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFFFFF22" stroke-width="5"></circle>

                        <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFFFFFAA" stroke-width="5" stroke-dasharray={`${100 - total} ${total}`} stroke-dashoffset="25"></circle>
                    </svg>
                    <span className="count-down">{`${minutes}:${('0' + seconds).slice(-2)}`}</span>
                </div>

                { this.state.mode === 'stopped' 
                ? <button onClick={() => this.startTimer()}>Start</button>
                : <button onClick={() => this.stopTimer()}>Stop</button>
                }
            </div>
        );
    }
}

export default Timer;
