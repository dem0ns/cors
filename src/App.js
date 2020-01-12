import React from 'react';
import CorsRemote from './CORS/remote';
import './App.css';
import {Icon, Menu, Layout} from "antd";
const { SubMenu } = Menu;
const {Footer, Sider, Content} = Layout;

class App extends React.Component {

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <div>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                            style={{ width: 256 }}
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
              <Icon type="mail" />
              <span>CORS</span>
            </span>
                                }
                            >
                                <Menu.Item key="1">CORS GET</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
              <Icon type="appstore" />
              <span>TEST</span>
            </span>
                                }
                            >
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                                <CorsRemote/>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Cyber Security Tools ©2020 Created by <a href="https://github.com/nic329" target="_blank" rel="noopener noreferrer">Dem0ns</a></Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
