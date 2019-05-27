import React from 'react';
import './Timer.scss';
import worker from "../workers/timer-worker.js";
import WebWorker from "../workers/worker-setup.js";
import Checkbox from './Checkbox.js';
import SoundSelector, { SOUNDS } from './SoundSelector.js';

const SECONDS_IN_MINUTE = 60;
export const TIMER_SCREEN_TIME = 20 * SECONDS_IN_MINUTE;
export const TIMER_BREAK_TIME = 20;

class Timer extends React.Component {

    constructor(props) {
        super(props);

        const newWorker = new WebWorker(worker);
        const notificationsPermitted = Notification.permission === 'granted';
        const automaticallyStart = localStorage.getItem('automaticallyStart') === 'true';
        const displayNotifications = localStorage.getItem('displayNotifications') === 'true' && notificationsPermitted;
        const playSound = (localStorage.getItem('playSound') || 'true') === 'true';
        const soundVolume = localStorage.getItem('soundVolume') || 100;
        const soundFileName = localStorage.getItem('soundFileName') || SOUNDS[0].file;

        newWorker.addEventListener('message', (e) => this.handleTimerEvent(e));

        this.state = {
            worker: newWorker,
            mode: 'stopped',
            remainingTicks: TIMER_SCREEN_TIME,
            automaticallyStart,
            displayNotifications,
            playSound,
            soundFileName,
            soundVolume,
            audioObject: this.getAudioObject(soundFileName)
        }

        if (automaticallyStart) {
            this.startTimer();
        }
    }

    getAudioObject(soundFileName) {
        return new Audio(`./media/${soundFileName}`);
    }

    handleTimerEvent(e) {
        this.setState(e.data);
        document.title = this.getWindowTitle();

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

    getWindowTitle() {
        const mode = this.state.mode;

        if (mode === 'stopped') {
           return '20-20-20 Rule';
        }

        if (mode === 'break') {
            return 'Break time';
        }

        const minutesRemaining = Math.floor(this.state.remainingTicks / SECONDS_IN_MINUTE);
        return minutesRemaining > 0 ? `${minutesRemaining} ${minutesRemaining > 1 ? 'minutes' : 'minute'}` : 'Less than 1 minute';
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

    setNotificationsEnabled(displayNotifications) {
        localStorage.setItem('displayNotifications', displayNotifications);
        this.setState({ displayNotifications });
    }

    onDisplayNotificationsChange(event) {
        if (event.target.checked && Notification.permission !== 'granted') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    this.setNotificationsEnabled(event.target.checked);
                }
                else {
                    alert('You must allow notification to use this feature.')
                    this.setNotificationsEnabled(false);
                }
            });
        }

        this.setNotificationsEnabled(event.target.checked);
    }

    onAutomaticallyStartChange(event) {
        const isEnabled = event.target.checked;

        localStorage.setItem('automaticallyStart', isEnabled);
        this.setState({ automaticallyStart: isEnabled });
    }

    onPlaySoundChange(event) {
        const isEnabled = event.target.checked;

        localStorage.setItem('playSound', isEnabled);
        this.setState({ playSound: isEnabled });
    }

    onChangeSoundFile(event) {
        const soundFileName = event.target.value;

        localStorage.setItem('soundFileName', soundFileName);

        this.setState({ 
            soundFileName,
            audioObject: this.getAudioObject(soundFileName)
        });
    }

    onChangeVolume(event) {
        const soundVolume = event.target.value;

        localStorage.setItem('soundVolume', soundVolume);

        const audioObject = this.state.audioObject;
        audioObject.volume = soundVolume / 100;

        this.setState({ soundVolume });
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
                        labelText="Automatically Start on Page Load" 
                        inputName="automaticallyStart" 
                        id="automaticallyStart"
                        title="Automatically start the timer when this page is opened."
                        isChecked={this.state.automaticallyStart}
                        onChange={(e) => this.onAutomaticallyStartChange(e)}
                    />
                    <Checkbox 
                        labelText="Display Notifications" 
                        inputName="displayNotifications" 
                        id="displayNotifications"
                        title="Display a browser notification when it's time for a break and when the break is over."
                        isChecked={this.state.displayNotifications}
                        onChange={(e) => this.onDisplayNotificationsChange(e)}
                    />
                    <Checkbox 
                        labelText="Play Sound" 
                        inputName="playSound" 
                        id="playSound"
                        title="Play a sound when it's time for a break and when the break is over."
                        isChecked={this.state.playSound}
                        onChange={(e) => this.onPlaySoundChange(e)}
                    />
                    <div className="sound-selector">
                        <SoundSelector 
                            soundFileName={this.state.soundFileName} 
                            soundVolume={this.state.soundVolume}
                            isDisabled={!this.state.playSound}
                            audioObject={this.state.audioObject}
                            onSoundFileChange={(e) => this.onChangeSoundFile(e)}
                            onVolumeChange={(e) => this.onChangeVolume(e)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Timer;
