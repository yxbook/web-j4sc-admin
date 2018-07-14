import fetch from 'utils/fetch';
import {
  getParams
} from 'utils/params';
//获取楼宇信息分页
export function getBuildPage(page,size,query) {
  const data = {
    page,
    size
  };
  for(var k in query){
    data[k] = query[k];
  };
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/select/PageBuild' + getParams(data),
    method: 'get'
  });
}
//根据ID获取楼宇基本信息
export function getBuildById(id) {
  const data = {
    id
  };
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/select/Build' + getParams(data),
    method: 'get'
  });
}
//根据ID获取楼宇管理者信息
export function getBuildManagesById(buildId) {
  const data = {
    buildId
  };
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/select/BuildUser' + getParams(data),
    method: 'get'
  });
}
//添加楼宇总管理信息
export function addBuildManage(buildId,username) {
  const data = {
    buildId:buildId,
    username:username
  };
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/add/BuildUser',
    method: 'POST',
    data
  });
}
//删除楼宇管理者 build/delete/BuildUser
export function delBuildManage(buildId,userId) {
  const data = {
    buildId:buildId,
    userId:userId
  };
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/delete/BuildUser',
    method: 'DELETE',
    data
  });
}
//添加楼宇基本信息
export function addBuild(obj) {
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/add/Build',
    method: 'POST',
    data:obj
  });
}

//修改楼宇基本信息
export function putBuild(obj) {
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/update/Build',
    method: 'PUT',
    data:obj
  });
}
//删除楼宇信息
export function delBuild(id) {
  return fetch({
    url: 'http://api.bangjiat.com/app/system/build/delete/Build',
    method: 'delete',
    id:id
  });
}
