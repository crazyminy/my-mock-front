import React, {Component} from 'react';
import {Button, Input, List} from "antd";
import {requestAllKeys} from "../api";
import eventBus from "../util/eventBus";

class Left extends Component {

    constructor(props){
        super(props);
        this.state = {
            wholeList:[],
            filterList:[],
            showList:[],
            curPage:1
        };
        this.getAllKeys = this.getAllKeys.bind(this);
        this.showRight = this.showRight.bind(this);
        this.filterChange = this.filterChange.bind(this);

        eventBus.on("refresh",this.getAllKeys);
    }

    componentDidMount() {
        this.getAllKeys();
    }

    async getAllKeys(){
        let newState = {...this.state};
        newState.wholeList = await requestAllKeys();
        newState.filterList = newState.wholeList;
        this.setState(newState);
    }

    showRight(key){
        eventBus.transMessage = {key:key};
        eventBus.emit('showNew');
    }

    filterChange(e){
        let str = e.target.value.trim();
        console.log(121212122);
        if(str===""){
            let newState = {...this.state};
            newState.filterList = newState.wholeList;
            this.setState(newState);
            return 0;
        }
        let reg = new RegExp(`^.*${str}.*$`);
        let wholeList = this.state.wholeList;
        let filterList = [];
        wholeList.forEach(ele=>{
            if (reg.test(ele)){
                filterList.push(ele);
            }
        })
        let newState = {...this.state};
        newState.filterList = filterList;
        this.setState(newState);
    }

    render() {
        return (
            <div style={{padding:'15px',height:'100%'}}>
                <Button type="primary" shape="circle" icon="reload" onClick={this.getAllKeys} style={{marginRight:'10px'}}/>
                <Button type="primary" shape="circle" icon="file-add" onClick={()=>this.showRight("__empty__")}/>
                <div style={{marginTop:'10px',marginBottom:'10px'}}>
                    过滤<Input onChange={this.filterChange}/>
                </div>
                <List
                    style={{height:'100%',overflowY:'auto'}}
                    itemLayout={"horizontal"}
                    dataSource={this.state.filterList}
                    renderItem={(item,index) =>  (<List.Item key={index} onClick={()=>this.showRight(item)}>{item}</List.Item>)}>
                </List>
            </div>
        );
    }

    componentWillUnmount() {
        eventBus.removeListener("toRefresh",this.getAllKeys)
    }
}

export default Left;
