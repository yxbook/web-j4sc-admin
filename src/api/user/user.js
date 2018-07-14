import fetch from 'utils/fetch';
//获取用户信息
export function getUserInfo() {
  return fetch({
    url: '/upms/getUserInfo',
    method: 'get'
  });
}
//获取用户菜单
export function getUserMenu() {
  return fetch({
    url: '/upms/getPermission',
    method: 'get'
  });
}
