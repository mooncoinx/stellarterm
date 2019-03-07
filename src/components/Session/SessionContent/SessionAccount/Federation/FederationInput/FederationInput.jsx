import React from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

export default class FederationInpit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.props.address,
        };
    }

    handleInput(event) {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        const { inputValue } = this.state;

        return (
            <div className="Federation_input">
                <AutosizeInput
                    type="text"
                    name="inputPriceAsset"
                    className="Federation_input"
                    placeholder="Name..."
                    maxLength="32"
                    value={inputValue}
                    onChange={e => this.handleInput(e)}
                    autoFocus />
                <span>*stellarterm.com</span>
            </div>
        );
    }
}

FederationInpit.propTypes = {
    address: PropTypes.string.isRequired,
};
