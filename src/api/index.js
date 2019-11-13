import {ajax} from "./ajax";

const BASE_URL = 'http://47.100.224.40:3000';

export const requestAllKeys = ()=>ajax(BASE_URL+'/getSet',{});

export const requestDetail = (key)=>ajax(BASE_URL+`/api/${key}`,{})

export const requestSet = (key,value)=>ajax(BASE_URL+'/set',{key,value})
