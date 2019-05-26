import React from 'react';

class Checkbox extends React.Component {

    render() {
        return (
            <div className="checkbox-wrapper" disabled={this.props.isDisabled}>
                <input
                    id={this.props.id}
                    name={this.props.inputName}
                    type="checkbox"
                    disabled={this.props.isDisabled}
                    checked={this.props.isChecked}
                    onChange={this.props.onChange} 
                />
                <label htmlFor={this.props.id}>{this.props.labelText}</label>
            </div>
        );
    }
}

export default Checkbox;
