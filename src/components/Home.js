import React, {Component} from 'react';
import axios from 'axios'
import '../App.css';
import Button from 'react-bootstrap/lib/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Hosts extends Component {
    componentDidMount() {
        axios.get('http://localhost:3001/hosts/list').then(response => {
            this.setState({
                hosts: response.data
            });
        })
    }

    render() {
        const hosts = this.state && this.state.hosts ? this.state.hosts : [];
        const hostsButtons = hosts.map((host) =>
            <Link to={`/host/${host}`}><Button>{hosts ? hosts[0] : "N/A"}</Button></Link>
        );

        return (
            <div className="App">
                <h1>Watchtopus Admin</h1>
                <br/>
                Monitored agents:
                <div>
                    {hostsButtons}
                </div>
            </div>
        );
    }
}

export default Hosts;
