import Cookies from 'js-cookie';
import {
  login,
  logout,
  getInfo,
  getMenus
} from 'api/login';
import {
  getUserInfo
} from 'api/user/user';
import {
  getToken,
  setToken,
  removeToken
} from 'utils/auth';

const user = {
    state: {
      //menus:undefined,
      token: getToken()
    },
    actions: {
      // 登录
      Login({
        commit
      }, userInfo) {
        console.info("actions = > login")
        const username = userInfo.username.trim();
        return new Promise((resolve, reject) => {
          login(username, userInfo.password).then(response => {
            const data = response;
            console.error(data);
            if (data.status === 200) {
              setToken(data.data.token);
              Cookies.set('token', data.data.token);
              commit('SET_TOKEN', data.data.token);
              resolve();
            } else {
              this.$Message.error(data.message);
              Message({
                message: data.message,
                type: 'warning'
              });
              return Promise.reject('error');
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
      GetUserInfo({commit}){
        console.info("actions = > GetUserInfo")
        return new Promise((resolve, reject) => {
          getUserInfo().then(response => {
            const data = response;
            console.error(data);
            if (data.status === 200) {
              Cookies.set('user', data.data);
              Cookies.set('locked', data.data.locked);
              resolve();
            } else {
              this.$Message.error(data.message);
              return Promise.reject('error');
            }
          }).catch(error => {
            reject(error);
          });
        });
      },
      GetMenus({
        commit
      }) {
        return new Promise((resolve, reject) => {
          getMenus().then(response => {
            const data = response;
            console.error(data);
            if (data.status === 200) {
              commit('SET_MENUS',data.data);
              //commit('SET_MENUS', data.data);
              resolve();
            } else {
              this.$Message.error(data.message);
              Message({
                message: data.message,
                type: 'warning'
              });
              return Promise.reject('error');
            }
          }).catch(error => {
            reject(error);
          });
        });
      }
    },
    mutations: {
      // SET_MENUS: (state, menus) => {
      //   state.menus = menus;
      // },
      SET_TOKEN: (state, token) => {
        state.token = token;
      },
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('locked');
            Cookies.remove('menu');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
};

export default user;
