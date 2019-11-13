import React, {Component} from 'react';
import {Input} from "antd";
import ReactJson from "react-json-view";
import TextArea from "antd/es/input/TextArea";
import {Button} from 'antd'
import {message} from "antd";
import {requestDetail, requestSet} from "../api";
import eventBus from "../util/eventBus";

class Right extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jsonKey:'',
            jsonValue:'',
            jsonObject:undefined
        }
        this.keyChangeHandler = this.keyChangeHandler.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
        this.submitSet = this.submitSet.bind(this);
        this.handleNewShow = this.handleNewShow.bind(this);
        this.getKey = this.getKey.bind(this);

        eventBus.on('showNew',this.handleNewShow)
    }

    handleNewShow(){
        console.log(eventBus)
        if(eventBus.transMessage.key==="__empty__"){
            this.setState({
                jsonKey:'',
                jsonValue:'',
                jsonObject:undefined
            })
        }else{
            let key = eventBus.transMessage.key;
            this.getKey(key)
        }
    }

    async getKey(key){
        let res = await requestDetail(key);
        let value = JSON.stringify(res);
        let newState = {...this.state};
        newState.jsonKey = key;
        newState.jsonValue = value;
        try{newState.jsonObject = JSON.parse(value)}catch (e) {
            newState.jsonObject = {aString:value};
        }
        this.setState(newState);
    }

    keyChangeHandler(e){
        let key = e.target.value.trim();
        let newState = {...this.state};
        newState.jsonKey = key;
        this.setState(newState);
    }
    valueChangeHandler(e){
        let value = e.target.value;
        let newState = {...this.state};
        newState.jsonValue = value;

        try{newState.jsonObject = JSON.parse(value)}catch (e) {
            console.log(1111111)
            newState.jsonObject = {aString:value};
        }
        this.setState(newState);
    }
    async submitSet(){
        let key = this.state.jsonKey;
        if(!/^[a-zA-Z_]+[a-zA-Z\d_]*$/.test(key)){
            message.warning('输入的键不符合命名规范');
            return 0;
        }
        let value = this.state.jsonValue;
        let res = await requestSet(key,value);
        if(res==='OK'){
            eventBus.emit("toRefresh");
            message.success('成功！')
        }
    }
    render() {
        return (
            <div style={{height:'100%',overflowY:"auto"}}>
                <Input placeholder="Key" onChange={this.keyChangeHandler} value={this.state.jsonKey}></Input>
                <TextArea rows={5} placeholder="Value" onChange={this.valueChangeHandler} value={this.state.jsonValue}/>
                <ReactJson style={{maxHeight:'500px',overflowY:"auto"}} src={this.state.jsonObject}/>
                <div style={{marginTop:'10px',textAlign:'center'}}>
                    <Button onClick={this.submitSet} type={"primary"}>提交/更新</Button>
                </div>
            </div>
        );
    }
}

export default Right;
