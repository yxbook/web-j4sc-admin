import fetch from 'utils/fetch';
import {
  getParams
} from 'utils/params';
//获取系统分页
export function getSystemPage(page,size) {
  const data = {
    page,
    size
  };
  return fetch({
    url: '/system/select/PageSystem' + getParams(data),
    method: 'get'
  });
}
//获取所有系统
export function getAllSystem() {
  return fetch({
    url: '/system/select/AllSystem',
    method: 'get'
  });
}
//根据ID获取系统基本信息
export function getSystemById(id) {
  const data = {
    id
  };
  return fetch({
    url: '/system/select/System' + getParams(data),
    method: 'get'
  });
}
//添加系统基本信息
export function addSystem(obj) {
  return fetch({
    url: '/system/add/System',
    method: 'POST',
    data:obj
  });
}

//修改系统基本信息
export function putSystem(obj) {
  return fetch({
    url: '/system/update/System',
    method: 'PUT',
    data:obj
  });
}
//删除系统信息
export function delSystem(id) {
  return fetch({
    url: '/system/delete/System',
    method: 'delete',
    id:id
  });
}
