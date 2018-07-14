import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import store from '../store';
import {routers, otherRouter, appRouter} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    console.log('router.beforeEach');
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (Cookies.get('locked') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
      console.log('router.1');
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locked') === '0' && to.name === 'locking') {
      console.log('router.2');
        next(false);
    } else {
      console.log('router.3');
        if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
          console.log('router.4');
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
          console.log('router.5');
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
          console.log('router.6');
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }
});

router.afterEach((to) => {
  console.log('router.afterEach');
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
