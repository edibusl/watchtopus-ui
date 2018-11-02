import React, {Component} from 'react';
import axios from 'axios'
import '../App.css';
import Button from 'react-bootstrap/lib/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import getBaseUrl from "../utils/Index"

const styleBottomMargin = {"margin-bottom": "10px"}

class Hosts extends Component {
    componentDidMount() {
        axios.get(getBaseUrl() + '/hosts/list').then(response => {
            this.setState({
                hosts: response.data
            });
        })
    }

    render() {
        const hosts = this.state && this.state.hosts ? this.state.hosts : [];
        const hostsButtons = hosts.map((host) =>
            <div>
                <Link key={host} to={`/host/${host.hostId}`}><Button style={styleBottomMargin}>{host.hostName ? host.hostName : host.hostId}</Button></Link>
                <br/>
            </div>
        );

        return (
            <div className="App">
                <h1>Watchtopus Admin</h1>
                <br/>
                <b>Monitored agents:</b>
                <br/><br/>
                <div>
                    {hostsButtons}
                    {hosts.length == 0 && "No agents found!"}
                </div>
            </div>
        );
    }
}

export default Hosts;
