import React, {Component} from 'react';
import axios from 'axios'
import '../App.css';
import Button from 'react-bootstrap/lib/Button';


class HostConfig extends Component {
    render() {
        const host = this.props.match.params.host;
        return (
            <div className="App">
                <h1>Configuration for host "{host}"</h1>
            </div>
        );
    }
}

export default HostConfig;
