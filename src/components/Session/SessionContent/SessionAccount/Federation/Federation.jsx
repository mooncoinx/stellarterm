import React from 'react';
import images from '../../../../../images';
import FederationInpit from './FederationInput/FederationInput';
import CopyButton from '../../../../CopyButton';

export default class Federation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEnabled: false,
            isEditing: false,
            addressInUse: true,
            address: 'syllik',
        };
    }

    getContent() {
        const { isEditing, isEnabled, address } = this.state;

        const userWantToEditAddress = address !== '' ? address : '';

        let left;
        if (!isEditing && !isEnabled) {
            left = (
                <React.Fragment>
                    <p className="no_federation_text">StellarTerm federation address</p>
                </React.Fragment>
            );
        } else if (isEditing) {
            left = (
                <React.Fragment>
                    <p className="federation_text">New federation address</p>
                    <FederationInpit address={userWantToEditAddress} />
                </React.Fragment>
            );
        } else if (isEnabled && !isEditing) {
            left = (
                <React.Fragment>
                    <p className="federation_text">Your StellarTerm federation address</p>
                    <strong className="Federation_address" onClick={() => this.handleEdit()}>
                        syllik*stellarterm.com
                    </strong>
                </React.Fragment>
            );
        }

        let right;
        if (isEditing) {
            right = (
                <React.Fragment>
                    <button className="Federation_button_transparent" onClick={() => this.handleEdit()}>
                        Cancel
                    </button>
                    <button className="s-button Federations_button" onClick={() => this.handleSave()}>
                        Save
                    </button>
                </React.Fragment>
            );
        } else if (!isEditing && !isEnabled) {
            right = (
                <button className="s-button Federations_button" onClick={() => this.handleEdit()}>
                    Enable
                </button>
            );
        } else if (!isEditing && isEnabled) {
            right = (
                <React.Fragment>
                    <div className="CopyButton" onClick={() => this.handleEdit()}>
                        <img src={images['icon-edit']} alt="edit" width="24" height="24" />
                        <span>EDIT</span>
                    </div>
                    <CopyButton text={address} />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <div className="Federations_left"> {left}</div>
                <div className="Federations_right">{right}</div>
            </React.Fragment>
        );
    }

    handleEdit() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    handleSave() {
        this.setState({ isEnabled: true, isEditing: false });
    }

    checkForAddress() {
        const { addressInUse } = this.state;
        if (addressInUse) {
            return (
                <p className="Federation_warning">
                    <span>
                        <img src={images['icon-error-triangle']} className="Federation_icon" alt="Error" />
                    </span>
                    <span className="Federations_warning_text">
                        This federation address is already in use. Please choose a different alias.
                    </span>
                </p>
            );
        }
        return null;
    }

    render() {
        const addressIsBusy = this.checkForAddress();
        const content = this.getContent();

        return (
            <div className="Federations_block">
                <div className="Federations_alert">{content}</div>
                <div className="Session__account__text">
                    {addressIsBusy}
                    <p>
                        You can set an alias for your StellarTerm account. We’ll use this in our trollbox, and it will
                        become your payment alias, so people can send you money more easily. You can use this alias,
                        including the*stellarx.com, instead of your public key to receive payments on Stellar.
                    </p>
                </div>
            </div>
        );
    }
}
