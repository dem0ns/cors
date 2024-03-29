import React from 'react';
import CorsRemote from './CORS/remote';
import {Menu, Layout} from "antd";
import {MailOutlined} from '@ant-design/icons'
import {HashRouter, Route} from 'react-router-dom';

const {SubMenu} = Menu;
const {Footer, Sider, Content} = Layout;

class App extends React.Component {

    state = {
        openKeys: ['sub1'],
    };

    render() {
        return (
            <div>
                <Layout>
                    <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="inline" openKeys={this.state.openKeys} style={{width: 256}}>
                            <SubMenu key="sub1" title={<span><MailOutlined/><span>CORS</span></span>}>
                                <Menu.Item key="1">XHR</Menu.Item>
                                <Menu.Item key="2">IMG</Menu.Item>
                                <Menu.Item key="3">FORM</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{marginLeft: 200}}>
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
                                <HashRouter>
                                    <Route exact path="/" component={CorsRemote}/>
                                </HashRouter>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Cyber Security Tools <a
                            href="https://github.com/dem0ns" target="_blank"
                            rel="noopener noreferrer">Dem0ns</a> ©2020-2022</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
