<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col>
                <Card>
                  <p slot="title" style="height:32px;line-height:32px;">
                      <Icon type="android-remove"></Icon>
                      系统公告
                      <Button type="info" style="float:right" icon="android-add" @click="handleAdd" >新增系统公告</Button>
                  </p>
                  <Row >
                      <Input v-model="query._name" placeholder="请输入署名搜搜..." style="width: 200px" />
                      <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                  </Row>
                    <div class="margin-top-10">
                        <can-edit-table :tableLoading="loading" @on-delete="handleDelete" @on-router="handleInfo" @on-change="handleChange" @on-error="handleError"  refs="table2" v-model="pageData" :columns-list="columns"></can-edit-table>
                    </div>
                    <Page  style="text-align:center;margin-top:20px" @on-change="getData" :total="pageInfo.total" :page-size="size" :current="pageInfo.current" size="small" show-elevator show-total></Page>
                </Card>
            </Col>

        </Row>
        <Modal v-model="modelShow" title="系统公告添加" ok-text="发布" :loading="loading" @on-ok="ok" @on-cancel="cancel">
            <Form ref="newNotice" :model="newNotice" :rules="newNoticeRules" :label-width="120">
                <FormItem label="署名：" prop="name">
                    <Input v-model="newNotice.name" type="text" placeholder="请输入公告署名..."></Input>
                </FormItem>
                <FormItem label="公告内容：" prop="content">
                    <Input v-model="newNotice.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公告内容..."></Input>
                </FormItem>
                <FormItem label="备注：" >
                    <Input v-model="newNotice.source" type="text" placeholder="请输入备注..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable_notice.vue';
import columns from './components/columns_notice.js';
import formatDate from 'utils/time';
import {
  getNoticePage,
  addNotice,
  delNotice
} from 'api/build/notice';
export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
        return {
            loading:true,
            page: 1,
            size: 20,
            columns: [],
            pageInfo: '',
            pageData: [],
            query:{},
            modelShow: false,
            newNotice: {},
            newNoticeRules: {
              name: [{
                  required: true,
                  message: '请输入署名',
                  trigger: 'blur'
              }],
                content: [{
                    required: true,
                    message: '请输入具体内容',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        initColumns () {
            this.columns = columns;
        },
        getData (page) {
          this.page = page;
          this.loading = true;
          getNoticePage(page,this.size,this.query).then(data => {
            this.loading = false;
            if (data.status === 200) {
              this.pageInfo = data.data;
              this.pageData = data.data.records;
            } else {
              this.$Message.error(data.message);
            }
          }).catch(error => {
              this.$Message.error('服务器异常' + error);
          });
        },
        //
        handleInfo (query) {
          // this.$router.push({
          //     name: 'build_info',
          //     query: query
          // });
        },
        handleDelete (currentRow,callback) {
          this.loadingPermission = true;
          delNotice(currentRow.sNoticeId).then(data => {
              this.loadingPermission = false;
              callback();
              if (data.status === 200) {
                  this.getData(this.page);
                  this.$Message.success('删除成功');
              } else {
                  this.$Message.error(data.message);
              }
          }).catch(error => {
              this.$Message.error('服务器异常' + error);
          });
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        handleError (message) {
            this.getData(this.page);
            this.$Message.error(message);
        },
        handleSearch(){
            this.getData(1);
        },
        handleAdd() {
            this.newNotice = {};
            this.modelShow = true;
        },
        ok() {
            this.$refs['newNotice'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    addNotice(this.newNotice).then(data => {
                        this.loading = false;
                        if (data.status === 200) {
                            this.$Message.success(data.message);
                            this.getData(this.page);
                        } else {
                            this.$Message.error(data.message);
                        }
                    }).catch(error => {
                        this.loading = false;
                        this.$Message.error('服务器异常' + error);
                    });
                } else {
                    setTimeout(() => {
                        this.modelShow = true;
                    }, 100);
                    this.$Message.error('请输入完整信息');
                }
            });
            //this.$Message.error(JSON.stringify(this.newPermission));

            //this.$Message.info('Clicked ok');
        },
        cancel() {
            //this.$Message.info('Clicked cancel');
        }
    },
    created () {
        this.initColumns();
        this.getData(1);
    }
};
</script>
