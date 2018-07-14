import {
  formatDateByLong
} from 'utils/time';
export const columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        key: 'buildId',
        align: 'center'
    },
    {
        title: '楼宇名称',
        align: 'center',
        key: 'name',
        editable: true
    },
    {
        title: '地址',
        align: 'center',
        key: 'address',
        editable: true
    },
    {
        title: '联系人',
        align: 'center',
        key: 'contact',
        editable: true
    },
    {
        title: '联系方式',
        align: 'center',
        key: 'contactWay',
        editable: true
    },
    {
        title: '修改时间',
        align: 'center',
        key: 'utime',
        render: (h, params) => {
          if(params.row.utime == null || params.row.utime == '') {
            return h('div','');
          }
          return h('div',formatDateByLong(params.row.utime,"yyyy-MM-dd h:m:s"));
                       }
    },
    {
        title: '所属园区',
        align: 'center',
        key: 'park',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 260,
        key: 'handle',
        handle: ['info','edit']
    }
];

export default columns;
