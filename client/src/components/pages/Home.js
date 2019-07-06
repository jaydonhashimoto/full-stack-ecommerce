import React, { Component } from 'react';
import EBookList from '../EBookList';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1>hi this the home page</h1>
                <EBookList />
            </div>
        )
    }
}

export default Home
