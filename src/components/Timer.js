import React from 'react';
import './Timer.scss';
import worker from "../workers/timer-worker.js";
import WebWorker from "../workers/worker-setup.js";
import Checkbox from './Checkbox.js';
import SoundSelector, { SOUNDS } from './SoundSelector.js';

const SECONDS_IN_MINUTE = 60;
export const TIMER_SCREEN_TIME = 10;
export const TIMER_BREAK_TIME = 5;

class Timer extends React.Component {

    constructor(props) {
        super(props);

        const newWorker = new WebWorker(worker);
        const notificationsPermitted = Notification.permission === 'granted';
        const soundFileName = SOUNDS[0].file;

        newWorker.addEventListener('message', (e) => this.handleTimerEvent(e));

        this.state = {
            worker: newWorker,
            mode: 'stopped',
            remainingTicks: TIMER_SCREEN_TIME,
            displayNotifications: notificationsPermitted,
            playSound: true,
            soundFileName,
            audioObject: this.getAudioObject(soundFileName)
        }
    }

    getAudioObject(soundFileName) {
        return new Audio(`./media/${soundFileName}`);
    }

    handleTimerEvent(e) {
        this.setState(e.data);
        document.title = e.data.mode === 'stopped' ? '20-20-20 Rule' : `${Math.ceil(this.state.remainingTicks / SECONDS_IN_MINUTE)} minutes`;

        if (this.state.remainingTicks === 0) {
            if (this.state.displayNotifications) {
                const message = this.state.mode === 'screenTime' ? 'Look away from your screen for 20 seconds.' : 'Break complete.';
                new Notification(message);
            }

            if (this.state.playSound) {
                this.state.audioObject.play();
            }
        }
    }

    startTimer() {
        const message = {
            mode: 'start',
            timerScreenTimeTicks: TIMER_SCREEN_TIME,
            timerBreakTimeTicks: TIMER_BREAK_TIME
        };

        this.state.worker.postMessage(message);
    }

    stopTimer() {
        this.state.worker.postMessage('stop');
    }

    onDisplayNotificationsChange(event) {
        if (event.target.checked && Notification.permission !== 'granted') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    this.setState({ displayNotifications: event.target.checked });
                }
                else {
                    alert('You must allow notification to use this feature.')
                    this.setState({ displayNotifications: false });
                }
            });
        }

        this.setState({ displayNotifications: event.target.checked });
    }

    onPlaySoundChange(event) {
        this.setState({ playSound: event.target.checked });
    }

    onChangeSound(event) {
        const soundFileName = event.target.value;

        this.setState({ 
            soundFileName,
            audioObject: this.getAudioObject(soundFileName)
        });
    }

    render() {
        const total = this.state.mode === 'screenTime' ? TIMER_SCREEN_TIME : TIMER_BREAK_TIME;
        const percentComplete = this.state.remainingTicks / total * 100;
        const seconds = this.state.remainingTicks % SECONDS_IN_MINUTE;
        const minutes = Math.floor(this.state.remainingTicks / SECONDS_IN_MINUTE);

        return (
            <div className="timer row">
                <div className="donut-chart col">
                    <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
                        <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="transparent"></circle>
                        <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFFFFF22" strokeWidth="5"></circle>

                        <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFFFFFAA" strokeWidth="5" strokeDasharray={`${100 - percentComplete} ${percentComplete}`} strokeDashoffset="25"></circle>
                    </svg>
                    <div className="timer-status">
                        <div className="count-down">{`${minutes}:${('0' + seconds).slice(-2)}`}</div>
                        { this.state.mode === 'stopped' 
                            ? <button onClick={() => this.startTimer()}>Start</button>
                            : <button onClick={() => this.stopTimer()}>Stop</button>
                        }
                    </div>
                </div>
                <div className="col">
                    <h3>Options</h3>
                    <Checkbox 
                        labelText="Display Notifications" 
                        inputName="displayNotifications" 
                        id="displayNotifications"
                        isChecked={this.state.displayNotifications}
                        onChange={(e) => this.onDisplayNotificationsChange(e)}
                    />
                    <Checkbox 
                        labelText="Play Sound" 
                        inputName="playSound" 
                        id="playSound"
                        isChecked={this.state.playSound}
                        onChange={(e) => this.onPlaySoundChange(e)}
                    />
                    <div className="sound-selector">
                        <SoundSelector 
                            value={this.state.soundFile} 
                            isDisabled={!this.state.playSound}
                            audioObject={this.state.audioObject}
                            onChange={(e) => this.onChangeSound(e)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Timer;
