import React, { Component } from 'react';

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer style={footerStyle}>Mock eBook Store &copy; 2019</footer>
      </div>
    );
  }
}

const footerStyle = {
  bottom: '0',
  width: '100%',
  color: '#fff',
  background: '#333',
  textAlign: 'center',
  margin: '0',
  padding: '1rem'
};

export default Footer;
