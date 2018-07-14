<style lang="less">

@import '../../styles/common.less';

</style>

<template>

<div>
    <Row>
        <Card>
            <p slot="title">
                <Icon type="compose"></Icon>
                楼宇详情
            </p>
            <Form ref="build" :model="build" :rules="buildRules" :label-width="120">
                <FormItem label="楼宇名称：" prop="name">
                    <Input :disabled="true" v-model="build.name" type="text" ></Input>
                </FormItem>
                <FormItem label="楼宇地址：">
                    <Input :disabled="true" v-model="build.address" type="text" ></Input>
                </FormItem>
                <FormItem label="楼宇坐标：">
                    <div id="container" style="width:800px;height:300px"></div>
                </FormItem>
                <FormItem label="联系人名称：">
                    <Input :disabled="true" v-model="build.contact" type="text" ></Input>
                </FormItem>
                <FormItem label="联系方式：">
                    <Input :disabled="true" v-model="build.contactWay" type="text" ></Input>
                </FormItem>
                <FormItem label="产权方名称：">
                    <Input :disabled="true" v-model="build.attribution" type="text" ></Input>
                </FormItem>
                <FormItem label="物业名称：">
                    <Input :disabled="true" v-model="build.property" type="text" ></Input>
                </FormItem>
                <FormItem label="楼宇高度：">
                    <InputNumber :disabled="true" :max="100" :min="1" v-model="build.floor"></InputNumber>
                </FormItem>
                <FormItem label="所属园区名称：">
                    <Input :disabled="true" v-model="build.park" type="text" ></Input>
                </FormItem>
                <FormItem label="备注：">
                    <Input :disabled="true" v-model="build.remake" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                </FormItem>
                <FormItem label="创建时间：">
                    <Input :disabled="true" v-model="build.ctime" type="text"></Input>
                </FormItem>
                <FormItem label="最后修改时间：">
                    <Input :disabled="true" v-model="build.utime" type="text"></Input>
                </FormItem>
                <FormItem label="楼宇管理者：">
                    <Table stripe :columns="columns" :data="buildManaage" @on-row-dblclick="handle2Click"></Table>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" @click="handleSetManage">设置总管理</Button>
                    <Button type="ghost" @click="init" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Card>
    </Row>
</div>

</template>

<script>

import {
    getBuildById,
    addBuildManage,
    getBuildManagesById,
    delBuildManage
}
from 'api/build/build';
import {
  formatDateByLong
} from 'utils/time';
export default {
    name: 'build-info',
    data() {
        return {
          map: {},
            loading: true,
            buildId: '',
            userTel: '',
            buildRules: {
                name: [{
                    required: true,
                    message: '请输入楼宇名称',
                    trigger: 'blur'
                }]
            },
            build: {},
            buildManaage: [],
            columns: [{
                title: '账号',
                key: 'username'
            }, {
                title: '真实名称',
                key: 'realname'
            }, {
                title: '角色',
                key: 'roles',
                render: (h, params) => {
                    return h('div', this.getH(h, params));
                }
            }],
        };
    },
    methods: {
        getH(h, params) {
                let tags = [];
                params.row.roles.forEach((child) => {
                    tags.push(h('Tag', {
                        props: {}
                    }, child.roleId === 1 ? '总管理员' : '角色ID：' + child.roleId));
                });
                return tags;
            },
            init() {
                this.buildId = this.$route.query.build_id.toString();
                getBuildById(this.buildId).then(data => {
                    if (data.status === 200) {
                        this.build = data.data;
                        this.build.ctime = formatDateByLong(this.build.ctime,"yyyy-MM-dd h:m:s")
                        this.map = new BMap.Map("container");
                        var point = new BMap.Point(this.build.longitude, this.build.latitude);
                        this.map.centerAndZoom(point, 15);
                        var marker = new BMap.Marker(point); //将点转化成标注点
                        // marker.enableDragging()
                        this.map.addOverlay(marker);
                        getBuildManagesById(this.buildId).then(data => {
                            this.loading = false;
                            if (data.status === 200) {
                                this.buildManaage = data.data;
                            } else {
                                this.$Message.error(data.message);
                            }
                        }).catch(error => {
                            this.$Message.error('服务器异常' + error);
                        });
                    } else {
                        this.$Message.error(data.message);
                    }
                }).catch(error => {
                    this.$Message.error('服务器异常' + error);
                });
            },
            handleSetManage() {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.userTel,
                                autofocus: true,
                                placeholder: '请输入平台内用户账号（手机号）...',
                                loading: this.loading
                            },
                            on: {
                                input: (val) => {
                                    this.userTel = val;
                                }
                            },
                        })
                    },
                    onOk: () => {
                        addBuildManage(this.buildId, this.userTel).then(data => {
                            if (data.status === 200) {
                                this.$Message.success('添加成功');
                                this.init();
                            } else {
                                this.$Message.error(data.message);
                            }
                        }).catch(error => {
                            this.$Message.error('服务器异常' + error);
                        });
                        this.userTel = '';
                    },
                    onCancel: () => {
                        this.userTel = '';
                    }
                })
            },
            handle2Click(data, index) {
                this.$Modal.confirm({
                    title: "警告",
                    content: "确认删除该管理员吗？不可恢复",
                    onOk: () => {
                        this.loading = true;
                        delBuildManage(this.buildId,data.userId).then(data => {
                            if (data.status === 200) {
                                this.$Message.success('删除成功');
                                this.init();
                            } else {
                                this.$Message.error(data.message);
                            }
                        }).catch(error => {
                            this.$Message.error('服务器异常' + error);
                        });
                    },
                    onCancel: () => {

                    }
                });
            }
    },
    mounted() {
        this.init();
    },
    watch: {
        '$route' () {
            this.init();
        }
    }
};

</script>
