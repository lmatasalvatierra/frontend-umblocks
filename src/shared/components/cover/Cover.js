import React, { Component } from 'react';

class Cover extends Component {
  render() {
    return (
      <div className="cover">
        <img
          className="cover__logo"
          src={require('../../../client/assets/image/icon.png')}
          alt="icon"
        />
        <h1 className="cover__title">Umblocks</h1>
        <h2 className="cover__catchphrase">
          <span className="cover__catchphrase--highlight">
            Manage your{' '}
          </span>{' '}
          <br />
          Certificates of Insurance <br />
          <span className="cover__catchphrase--highlight"> with</span>{' '}
          Blockchain
        </h2>
      </div>
    );
  }
}

export default Cover;
