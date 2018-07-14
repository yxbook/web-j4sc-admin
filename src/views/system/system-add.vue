<style lang="less">

@import '../../styles/common.less';

</style>

<template>

<div>
    <Row>
        <Card>
            <Form ref="system" :model="system" :rules="systemRules" :label-width="120">
                <FormItem label="系统名称：" prop="name">
                    <Input v-model="system.name" type="text" placeholder="请输入系统名称..."></Input>
                </FormItem>
                <FormItem label="系统标题：">
                    <Input v-model="system.title" type="text" placeholder="请输入系统标题..."></Input>
                </FormItem>
                <FormItem label="系统描述：">
                    <Input v-model="system.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入系统描述..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" @click="handleSubmit('system')">提交</Button>
                    <Button type="ghost" @click="handleReset('system')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Card>
    </Row>
</div>

</template>

<script>
import {
  addSystem
} from 'api/system/system';
export default {
    data() {
        return {
            loading:false,
            system: {
                name: '',
                title: '',
                description: ''
            },
            systemRules: {
                name: [{
                    required: true,
                    message: '请输入系统名称',
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
                    addSystem(this.system).then(data => {
                      this.loading = false;
                      if (data.status === 200) {
                        this.$refs[from].resetFields();
                        this.$Message.success('添加成功');
                        this.$router.push({
                            name: 'system_list'
                        });
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
            }
    }
};

</script>
