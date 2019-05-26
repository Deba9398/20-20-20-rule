import React from 'react';

export const SOUNDS = [
    { name: 'chime', file: 'chime.mp3' },
    { name: 'ping', file: 'ping.wav' },
    { name: 'alert', file: 'alert.wav' },
    { name: 'echo', file: 'echo.wav' },
]

class Checkbox extends React.Component {

    playSound() {
        this.props.audioObject.play();
    }

    render() {
        const options = SOUNDS.map(o => <option key={o.file} value={o.file}>{o.name}</option>)

        return (
            <div className="select-wrapper">
                <select 
                    value={this.props.value}
                    id={this.props.id}
                    name={this.props.inputName}
                    disabled={this.props.isDisabled}
                    onChange={this.props.onChange} 
                >
                    {options}
                </select>
                <label htmlFor={this.props.id}>{this.props.labelText}</label>
                <button disabled={this.props.isDisabled} onClick={() => this.playSound()}>Preview</button>
            </div>
        );
    }
}

export default Checkbox;
