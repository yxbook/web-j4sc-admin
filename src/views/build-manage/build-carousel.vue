<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table/table.less';
    @import './components/carousel.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col>
                <Card>
                  <p slot="title" style="height:32px;line-height:32px;">
                      <Icon type="android-remove"></Icon>
                      轮播图管理
                      <Button type="info" style="float:right" icon="android-add" @click="handleAdd" >新增轮播图</Button>
                  </p>
                    <div class="margin-top-10">
                        <can-edit-table :tableLoading="loading" @on-delete="handleDelete" @on-router="handleInfo" @on-change="handleChange" @on-error="handleError"  refs="table2" v-model="pageData" :columns-list="columns"></can-edit-table>
                    </div>
                    <Page  style="text-align:center;margin-top:20px" @on-change="getData" :total="pageInfo.total" :page-size="size" :current="pageInfo.current" size="small" show-elevator show-total></Page>
                </Card>
            </Col>

        </Row>
        <Modal v-model="modelShow" title="轮播图添加" ok-text="添加" style="width:600px;" :loading="loading" @on-ok="ok" @on-cancel="cancel">
            <Form ref="newCarousel" :model="newCarousel" :rules="newCarouselRules" :label-width="120">
                <FormItem label="图片名称：" prop="name">
                    <Input v-model="newCarousel.name" type="text" placeholder="请输入图片名称..."></Input>
                </FormItem>
                <FormItem label="显示顺序：" prop="orderValue">
                    <Input v-model="newCarousel.orderValue" type="text"  placeholder="请输入显示顺序..."></Input>
                </FormItem>
                <FormItem label="跳转链接：" prop="link">
                    <Input v-model="newCarousel.link" type="text" placeholder="请输入跳转链接..."></Input>
                </FormItem>
                <FormItem label="显示开始时间">
                        <Row>
                              <Col span="11">
                                    <FormItem prop="showStartTime">
                                          <DatePicker type="date" placeholder="选择开始时间" v-model="newCarousel.showStartTime"></DatePicker>
                                    </FormItem>
                              </Col>
                        </Row>
                </FormItem>
                <FormItem label="显示结束时间">
                        <Row>
                                <Col span="11">
                                        <FormItem prop="showEndTime">
                                              <DatePicker type="date" placeholder="选择结束时间" v-model="newCarousel.showEndTime"></DatePicker>
                                        </FormItem>
                                </Col>
                        </Row>
                </FormItem>
                <FormItem label="备注：" >
                    <Input v-model="newCarousel.remark" type="text" placeholder="请输入备注..."></Input>
                </FormItem>
                <FormItem  label="轮播图：" prop="imagePath">
                    <Upload
                      ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="10240"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      type="drag"
                      action="http://www.bangjiat.com/oss/upImg"
                      style="display: inline-block;width:158px;">
                      <div style="width: 158px;height:98px;line-height: 65px;" v-if="!upImage">
                          <Icon type="camera" size="20" style="line-height: 20px;"></Icon>
                          <p style="line-height: 0px;">上传轮播图</p>
                      </div>
                      <div style="width: 158px;height:98px;" v-if="upImage">
                          <img style="width: 100%;height: 100%;" :src="newCarousel.imagePath">
                      </div>
                  </Upload>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable_carousel.vue';
import columns from './components/columns_carousel.js';
import formatDate from 'utils/time.js';
import {
  getCarouselPage,
  addCarousel,
  delCarousel
} from 'api/build/carousel';
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
            upImage:false,
            newCarousel: {},
            newCarouselRules: {
              orderValue: [{
                  required: true,
                  message: '请输入显示顺序(数字)',
                  trigger: 'blur'
              }],
              link: [{
                  required: true,
                  message: '请输入跳转链接',
                  trigger: 'blur'
              }],
              showStartTime: [{
                  required: false,
                  type:'date',
                  message: '请选择显示的开始时间',
                  trigger: 'blur'
              }],
              showEndTime: [{
                  required: false,
                  type:'date',
                  message: '请选择显示的结束时间',
                  trigger: 'blur'
              }],
              name: [{
                  required: false,
                  message: '请输入图片名称',
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
          getCarouselPage(page,this.size,this.query).then(data => {
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
        handleView (title,url) {
            this.imgTitle = title;
            this.imgUrl = url;
            this.visible = true;
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
          delCarousel(currentRow.carouselId).then(data => {
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
            this.newCarousel = {};
            this.modelShow = true;
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '警告',
                desc: '文件 ' + file.name + ' 不正确, 请选择 jpg 或 png文件.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '警告',
                desc: '文件  ' + file.name + '过大, 不能超过 10M.'
            });
        },
        handleSuccess (response) {
            if (response.status === 200) {
              this.$Message.success('上传成功！');
              this.newCarousel.imagePath = response.data;
              this.upImage = true;
            } else {
              this.$Message.error(response.message);
            }
        },
        ok() {
            this.$refs['newCarousel'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.newCarousel.showStartTime = Date.parse(new Date(this.newCarousel.showStartTime));
                    this.newCarousel.showEndTime = Date.parse(new Date(this.newCarousel.showEndTime));
                    addCarousel(this.newCarousel).then(data => {
                        this.loading = false;
                        if (data.status === 200) {
                          this.$Message.success(data.message);
                          this.getData(this.page);
                          this.upImage = false;
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
