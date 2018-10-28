import React, {Component} from 'react';
import axios from 'axios'
import '../App.css';
import './InputList'
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import PingList from "./InputList";
import Form from "react-bootstrap/lib/Form";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getBaseUrl from "../utils/Index"

const lblStyle = {"marginRight": "10px"}

class HostConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostConfig: null
        };
    }

    componentDidMount() {
        axios.get(`${getBaseUrl()}/hosts/${this.getHostName()}`).then(response => {
            this.setState({
                hostConfig: {...this.getDefaultConfig(), ...response.data}
            });
        })
    }

    getHostName(){
        return this.props.match.params.host;
    }

    getDefaultConfig(){
        return {
            "hostName": "",
            "pingHosts": []
        }
    }

    handlePingListChange(list){
        const newConfig = {
            ...this.state.hostConfig,
            "pingHosts": list
        };

        this.setState({
            hostConfig: newConfig
        })
    }

    handleSave(){
        const data = this.state.hostConfig;
        axios.post(`${getBaseUrl()}/hosts/${this.getHostName()}`, data).then(response => {
            toast.success("Configuration saved successfully.");
        }).catch(function(){
            toast.error("Error saving host configs.");
        });
    }

    handleChangeHostName(event) {
        const newConfig = {
            ...this.state.hostConfig,
            "hostName": event.target.value
        };

        this.setState({
            hostConfig: newConfig
        })
    }

    render() {
        const host = this.getHostName();
        const hostConfig = this.state.hostConfig;

        return (
            <div className="App">
                <h1>Configuration for host "{host}"</h1>

                {hostConfig &&
                <Form inline>
                    <ControlLabel style={lblStyle}>Host friendly name:</ControlLabel>
                    <FormControl type="text" onChange={(e) => this.handleChangeHostName(e)} defaultValue={hostConfig.hostName} placeholder="Enter a friendly name for the host"/>
                </Form>}

                <br/>
                <ControlLabel>Pings list:</ControlLabel>
                {hostConfig && hostConfig.pingHosts && <PingList list={hostConfig.pingHosts} onChange={(list) => this.handlePingListChange(list) }/>}

                <br/>
                <Button onClick={()=>this.handleSave()} bsStyle="success" style={lblStyle}>Save</Button>
                <Link to="/"><Button>Back</Button></Link>

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}

export default HostConfig;
