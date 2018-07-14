import fetch from 'utils/fetch';

export function login(username, password) {
  const data = {
    username,
    password
  };
  return fetch({
    url: '/auth/login',
    method: 'post',
    data
  });
}

// export function logout(token) {
//   return fetch({
//     url: '/api/auth/jwt/invalid',
//     method: 'post',
//     params: { token }
//   });
// }
//
// export function getInfo(token) {
//   return fetch({
//     url: '/api/admin/user/front/info',
//     method: 'get',
//     params: { token }
//   });
// }
export function resetPassword(userId, oldPassword, newPassword) {
  const data = {
    userId,
    oldPassword,
    newPassword
  };
  return fetch({
    url: '/user/update/Password',
    method: 'post',
    data
  });
}
export function getMenus() {
  return fetch({
    url: '/upms/getPermission',
    method: 'get'
  });
}
