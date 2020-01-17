import React from 'react';
import {Select, Input, Button, message} from 'antd';
const {Option} = Select;

class Remote extends React.Component{

    state = {
      url: "",
      method: "GET"
    };
    cors = () =>  {
        if (!this.state.url.startsWith("http") || !this.state.url.startsWith('https')) {
            message.info("URL validate failed.");
            return;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4)
                if (this.status === 200) {
                    message.success("Perfect!");
                    console.log((this.responseText));
                    document.querySelector("#html").innerHTML = this.responseText
                }else{
                    message.error("CORS Fail.");
                }
        };
        xhttp.open(this.state.method, this.state.url, true);
        xhttp.withCredentials = true;
        xhttp.send();
    };
    handleUrlChange = (event) => {
        this.setState({
            url : event.target.value,
        })
    };
    handleMethodChange = (event) => {
        this.setState({
            method: event.target.value
        });
    };
    selectBefore = (
        <Select
            defaultValue="GET"
            style={{ width: 90 }}
            value={this.state.method}
            onChange={this.handleMethodChange}
        >
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
        </Select>
    );

    render() {
        return (
            <div>
                <h2>CORS POC</h2>
                <div style={{ marginBottom: 16 }}>
                    <Input addonBefore={this.selectBefore} value={this.state.url} onChange={this.handleUrlChange} placeholder="http://127.0.0.1/"/>
                </div>
                <Button onClick={this.cors} type="primary">Fxxk It !</Button>
                <hr/>
                <div id="html">
                </div>
            </div>
        )
    }
}

export default Remote;
