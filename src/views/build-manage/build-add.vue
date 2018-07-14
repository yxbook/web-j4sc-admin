<style lang="less">

@import '../../styles/common.less';

</style>

<template>

<div>
    <Row>
        <Card>
            <Form ref="build" :model="build" :rules="buildRules" :label-width="120">
                <FormItem label="楼宇名称：" prop="name">
                    <Input v-model="build.name" type="text" placeholder="请输入楼宇名称..."></Input>
                </FormItem>
                <FormItem label="楼宇坐标：">
                    <div id="container" style="width:800px;height:300px"></div>
                </FormItem>
                <FormItem label="联系人姓名：" prop="contact">
                    <Input v-model="build.contact" type="text" placeholder="请输入联系人姓名..."></Input>
                </FormItem>
                <FormItem label="联系方式：" prop="contactWay">
                    <Input v-model="build.contactWay" type="text" placeholder="请输入联系方式..."></Input>
                </FormItem>
                <FormItem label="楼宇地址：">
                    <Input v-model="build.address" type="text" placeholder="请输入楼宇地址..."></Input>
                </FormItem>
                <FormItem label="产权方名称：">
                    <Input v-model="build.attribution" type="text" placeholder="请输入产权方名称..."></Input>
                </FormItem>
                <FormItem label="物业名称：">
                    <Input v-model="build.property" type="text" placeholder="请输入物业名称..."></Input>
                </FormItem>
                <FormItem label="楼宇高度：">
                    <InputNumber :max="100" :min="1" v-model="build.floor"></InputNumber>
                </FormItem>
                <FormItem label="所属园区名称：">
                    <Input v-model="build.park" type="text" placeholder="请输入所属园区名称..."></Input>
                </FormItem>
                <FormItem label="备注：">
                    <Input v-model="build.remake" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" @click="handleSubmit('build')">提交</Button>
                    <Button type="ghost" @click="handleReset('build')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Card>
    </Row>
</div>

</template>
<script>
import {
  addBuild
} from 'api/build/build';
export default {
    name: 'workflow',
    data() {
        return {
          map: {},
            loading:false,
            build: {
                address: '',
                attribution: '',
                floor: 1,
                name: '',
                park: '',
                property: '',
                remake: '',
                latitude: '',
                longitude: ''
            },
            buildRules: {
                name: [{
                    required: true,
                    message: '请输入楼宇名称',
                    trigger: 'blur'
                }],
                contact: [{
                    required: true,
                    message: '请输入停车场联系人姓名',
                    trigger: 'blur'
                }],
                contactWay: [{
                    required: true,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }],
                latitude: [{
                    required: true,
                    message: '请选择楼宇位置',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        handleSubmit(from) {
            this.$refs[from].validate((valid) => {
                if (valid) {
                  this.loading = true;
                    addBuild(this.build).then(data => {
                      this.loading = false;
                      if (data.status === 200) {
                        this.$refs[from].resetFields();
                        this.$Message.success('添加成功');
                      } else {
                        this.$Message.error(data.message);
                      }
                    }).catch(error => {
                        this.loading = false;
                        this.$Message.error('服务器异常' + error);
                    });
                } else {
                    this.$Message.error('请输入完整信息');
                }
            });
        },
        handleReset (name) {
                this.$refs[name].resetFields();
        },
        myFun (result) {
          var cityName = result.name;
          this.map.setCenter(cityName);
        }
    },
    mounted() {
      this.map = new BMap.Map("container");
      var point = new BMap.Point(116.404, 39.915);
      this.map.enableScrollWheelZoom(true)
      this.map.centerAndZoom(point, 15);
      var myCity = new BMap.LocalCity();
      myCity.get(this.myFun);
      var geoc = new BMap.Geocoder();
      var that = this
      var marker;
      this.map.addEventListener("click", function(e){
        //通过点击百度地图，可以获取到对应的point, 由point的lng、lat属性就可以获取对应的经度纬度
        var pt = e.point;
        geoc.getLocation(pt, function(rs){
            //addressComponents对象可以获取到详细的地址信息
            if (marker !== undefined) {
              that.map.removeOverlay(marker)
            }
            var addComp = rs.addressComponents;
            var addSurr = rs.surroundingPois;
            var site = addComp.province + "-" + addComp.city + "-" + addComp.district ;
            if (addComp.street != '' ) {
                site = site + "-" + addComp.street;
            }
            if (addComp.streetNumber != '') {
                site = site + "-" + addComp.streetNumber;
            }
            if (addSurr.length > 0) {
                site = site + "-" +addSurr[0].title;
            }
            that.build.address = site
            that.build.latitude = pt.lat;
            that.build.longitude = pt.lng;
            var point = new BMap.Point(pt.lng, pt.lat); //将标注点转化成地图上的点
            marker = new BMap.Marker(point); //将点转化成标注点
            // marker.enableDragging()
            that.map.addOverlay(marker);
        });
    });
    }
};

</script>
