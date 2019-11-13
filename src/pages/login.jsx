import React, {Component} from 'react';
import {Button} from "antd";

let center_flex={
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.clickStartHandler = this.clickStartHandler.bind(this);
    }

    clickStartHandler(){
        //alert(23333);
        //console.log(this.props);
        this.props.history.push('/home');
    }

    render() {
        return (
            <div style={center_flex}>
                <Button onClick={this.clickStartHandler} type="primary" style={{fontSize:'50px',height:'90px'}}>开始使用</Button>
            </div>
        );
    }

}

export default Login;
