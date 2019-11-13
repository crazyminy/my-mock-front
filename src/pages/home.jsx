import React, {Component} from 'react';
import {Col, Layout, Row} from "antd";
import Left from "../components/left";
import Right from "../components/right";
const { Header, Footer,  Content } = Layout;




class Home extends Component {
    render() {
        return (
            <div style={{height:"100%"}}>

                <Layout style={{height:'100%'}}>
                    <Header className={"dark-primary-color"} >
                  <span style={{fontSize:'30px',marginLeft:'10px',color:'#fff'}}>
                      My Mock
                  </span>
                        <span style={{fontSize:'15px',color:'#fff',marginLeft:'10px'}}>version 1.0</span>
                    </Header>
                    <Content className={"default-primary-color"} style={{ padding: '20px',height:'100%'}}>

                        {/*<div style={{ padding: 24, background: '#fff', height:'100%' }}>

                        </div>*/}
                        <Row style={{padding: 24, background: '#fff', height:'100%'}}>
                            <Col span={12} style={{height:'80%'}}>
                                <Left></Left>
                            </Col>
                            <Col span={12}>
                                <Right></Right>
                            </Col>
                        </Row>
                    </Content>
                    <Footer className={"dark-primary-color"} style={{ textAlign: 'center' }}>My Mock ©2019 Created by crazyminy</Footer>
                </Layout>
            </div>
        );
    }
}

export default Home;
