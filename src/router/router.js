import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
          { path: 'user_info', title: '用户详情', name: 'user_info', component: () => import('@/views/roleuser/user-info.vue') }, // 用于展示带参路由
          { path: 'build_info', title: '楼宇详情', name: 'build_info', component: () => import('@/views/build-manage/build-info.vue') }, // 用于展示带参路由
          { path: 'carpark_info', title: '停车场详情', name: 'carpark_info', component: () => import('@/views/carpark-manage/carpark-info.vue') }, // 用于展示带参路由




        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/system',
        icon: 'lock-combination',
        title: '系统应用管理',
        name: 'system',
        p_id: 1,
        component: Main,
        children: [
          {
              path: 'list',
              icon: 'compose',
              name: 'system_list',
              title: '系统应用',
              p_id: 2,
              component: () => import('@/views/system/system-list.vue')
          },
          {
              path: 'add',
              icon: 'pound',
              name: 'system_add',
              title: '新增系统应用',
              p_id: 3,
              component: () => import('@/views/system/system-add.vue')
          }
        ]
    },
    {
        path: '/permission',
        icon: 'lock-combination',
        title: '系统权限管理',
        name: 'permission',
        p_id: 8,
        component: Main,
        children: [
          {
              path: 'index',
              icon: 'compose',
              name: 'permission_index',
              title: '系统权限',
              p_id: 9,
              component: () => import('@/views/permission/permission-index.vue')
          },
          {
              path: 'list',
              icon: 'pound',
              name: 'permission_list',
              title: '系统权限总览',
              p_id: 10,
              component: () => import('@/views/permission/permission-list.vue')
          }
        ]
    },
    {
        path: '/roleuser',
        icon: 'lock-combination',
        title: '角色用户管理',
        name: 'roleuser',
        p_id: 126,
        component: Main,
        children: [
          {
              path: 'role',
              icon: 'compose',
              name: 'role_index',
              title: '角色管理',
              p_id: 143,
              component: () => import('@/views/roleuser/role-index.vue')
          },
          {
              path: 'user',
              icon: 'pound',
              name: 'user_list',
              title: '用户管理',
              p_id: 148,
              component: () => import('@/views/roleuser/user-index.vue')
          }
        ]
    },
    {
        path: '/monitor',
        icon: 'lock-combination',
        title: '运维监控管理',
        name: 'monitor',
        component: Main,
        children: [
          {
              path: 'eureka',
              icon: 'pound',
              name: 'eureka',
              title: 'Eureka注册中心',
              component: () => import('@/views/monitor/eureka.vue')
          },
          {
              path: 'hystrix',
              icon: 'pound',
              name: 'hystrix',
              title: 'Hystrix监控中心',
              component: () => import('@/views/monitor/hystrix.vue')
          },
          {
              path: 'zipkin',
              icon: 'pound',
              name: 'zipkin',
              title: 'Zipkin链路监控',
              component: () => import('@/views/monitor/zipkin.vue')
          }
          // ,
          // {
          //     path: 'druid',
          //     icon: 'pound',
          //     name: 'druid',
          //     title: 'Druid数据库监控',
          //     component: () => import('@/views/monitor/druid.vue')
          // }
        ]
    },
    {
        path: '/build-manage',
        icon: 'lock-combination',
        title: '楼宇管理',
        name: 'buildmanage',
        p_id: 86,
        component: Main,
        children: [
          {
              path: 'index',
              icon: 'compose',
              name: 'build_list',
              title: '楼宇信息',
              p_id: 87,
              component: () => import('@/views/build-manage/build-list.vue')
          },
          {
              path: 'indexs',
              icon: 'pound',
              name: 'build_add',
              title: '楼宇信息添加',
              p_id: 98,
              component: () => import('@/views/build-manage/build-add.vue')
          },
          {
              path: 'notice',
              icon: 'pound',
              name: 'notice_info',
              title: '楼宇系统公告',
              p_id: 93,
              component: () => import('@/views/build-manage/build-notice.vue')
          },
          {
              path: 'carousel',
              icon: 'pound',
              name: 'carousel_info',
              title: '轮播图',
              p_id: 162,
              component: () => import('@/views/build-manage/build-carousel.vue')
          }
        ]
    },
    {
        path: '/carpark-manage',
        icon: 'lock-combination',
        title: '停车场管理',
        name: 'carparkmanage',
        p_id: 154,
        component: Main,
        children: [
          {
              path: 'index',
              icon: 'compose',
              name: 'carpark_list',
              title: '停车场信息',
              p_id: 159,
              component: () => import('@/views/carpark-manage/carpark-list.vue')
          },
          {
              path: 'indexs',
              icon: 'pound',
              name: 'carpark_add',
              title: '停车场信息添加',
              p_id: 160,
              component: () => import('@/views/carpark-manage/carpark-add.vue')
          }
        ]
    }

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
