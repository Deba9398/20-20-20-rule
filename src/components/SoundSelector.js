import React from 'react';
import './SoundSelector.scss';

export const SOUNDS = [
    { name: 'chime', file: 'chime.mp3' },
    { name: 'ping', file: 'ping.wav' },
    { name: 'alert', file: 'alert.wav' },
    { name: 'echo', file: 'echo.wav' },
]

export const VOLUMES = [ 100, 90, 80, 70, 60, 50, 40, 30, 20, 10 ];

class Checkbox extends React.Component {

    playSound() {
        this.props.audioObject.play();
    }

    render() {
        const options = SOUNDS.map(o => <option key={o.file} value={o.file}>{o.name}</option>);
        const volumeOptions = VOLUMES.map(o => <option key={o} value={o}>{o}%</option>)

        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="soundSelect">Sound</label>
                        </td>
                        <td>
                            <select 
                                value={this.props.soundFileName}
                                id="soundSelect"
                                name="soundSelect"
                                disabled={this.props.isDisabled}
                                onChange={this.props.onSoundFileChange} 
                            >
                                {options}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="soundVolume">Volume</label>
                        </td>
                        <td>
                            <select 
                                value={this.props.soundVolume}
                                id="soundVolume"
                                name="soundVolume"
                                disabled={this.props.isDisabled}
                                onChange={this.props.onVolumeChange} 
                            >
                                {volumeOptions}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <div>
                                <button disabled={this.props.isDisabled} onClick={() => this.playSound()}>Preview</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Checkbox;
