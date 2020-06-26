import React from 'react';
import {Select, Input, Button, message, Form} from 'antd';

const {Option} = Select;
const {TextArea} = Input;

class Remote extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            method: "GET",
            content_type: "application/x-www-form-urlencoded",
            post_content: "",
            header_key: "",
            header_value: ""
        };
        this.handleMethodChange = this.handleMethodChange.bind(this);
    }

    cors = () =>  {
        if (!this.state.url.startsWith("http") && !this.state.url.startsWith('https')) {
            message.info("URL validate failed.");
            return;
        }
        var xhttp = new XMLHttpRequest();
        var _this = this;
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4){
                console.log(this.prototype);
                switch (this.status) {
                    case 200:
                        message.success("Perfect!");
                        document.querySelector("#html").innerHTML = this.responseText;
                        console.log(unescape(encodeURIComponent(this.responseText)))
                        break;
                    case 0:
                        break;
                    default:
                        message.warning("HTTP Code: " + this.status);
                        document.querySelector("#html").innerHTML = this.responseText.toString();
                        break;
                }
            }
            xhttp.addEventListener("error", _this.transferFailed)
        };
        xhttp.open(this.state.method, this.state.url, true);
        xhttp.withCredentials = true;
        if (this.state.header_key !== "") {
            xhttp.setRequestHeader(this.state.header_key, this.state.header_value);
        }
        if (this.state.method === "POST") {
            xhttp.setRequestHeader("Content-Type", this.state.content_type);
        }
        xhttp.send(this.state.post_content);
    };

    transferFailed = evt => {
        if (evt.type === "error") message.error("Error:"+evt.message);
    };

    handleUrlChange = (event) => {
        this.setState({
            url : event.target.value,
        })
    };

    handleMethodChange = value => {
        this.setState({
            method: value
        });
    };

    handlePostContentChange = e => {
        this.setState({
            post_content: e.target.value
        })
    };

    onCTChane = e => {
        this.setState({
            content_type: e
        });
    };

    render() {
        var selectBefore = (
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

        return (
            <div>
                <h2>CORS TEST</h2>
                <div style={{ marginBottom: 16 }}>
                    <Input addonBefore={selectBefore} value={this.state.url} onChange={this.handleUrlChange} placeholder="http://127.0.0.1/"/>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Form name="headers" layout="inline">
                        <Form.Item name="header_key">
                            <Input placeholder="header key" onChange={e => this.setState({header_key: e.target.value})}/>
                        </Form.Item>
                        <Form.Item name="header_value">
                            <Input placeholder="header value" onChange={e => this.setState({header_value: e.target.value})}/>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ marginBottom: 16 }} hidden={this.state.method !== 'POST'}>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Select a Content-Type"
                        optionFilterProp=""
                        value={this.state.content_type}
                        onChange={this.onCTChane}
                    >
                        <Option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</Option>
                        <Option value="application/json;charset=utf-8">application/json;charset=UTF-8</Option>
                    </Select>
                </div>

                <div style={{ marginBottom: 16 }} hidden={this.state.method !== 'POST'}>
                    <TextArea rows={4} placeholder="POST Content" value={this.state.post_content} onChange={this.handlePostContentChange} />
                </div>
                <Button onClick={this.cors} type="danger">SEND XHR REQUEST!</Button>
                <hr/>
                <div id="html"/>
            </div>
        )
    }
}

export default Remote;
