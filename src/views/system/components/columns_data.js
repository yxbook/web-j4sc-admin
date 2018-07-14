export const columns = [
    {
        title: '系统ID',
        width: 80,
        key: 'systemId',
        align: 'center'
    },
    {
        title: '系统名称',
        align: 'center',
        key: 'name',
        editable: true
    },
    {
        title: '系统标题',
        align: 'center',
        key: 'title',
        editable: true
    },
    {
        title: '系统描述',
        align: 'center',
        key: 'description',
        editable: true
    },
    {
        title: '创建时间',
        align: 'center',
        key: 'ctime'
    },
    {
        title: '操作',
        align: 'center',
        width: 260,
        key: 'handle',
        handle: ['edit','delete']
    }
];

export default columns;
