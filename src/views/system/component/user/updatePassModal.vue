<script setup lang="ts">
import {nextTick, reactive, ref} from 'vue';

const formRef = ref();
const state = reactive({
  isShowDialog: false,
  title: '修改密码',
  ruleForm: {
    id: '',
    password: '',
  },
  rules: {
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' }
    ],
  }
});
const closeDialog = () => {
  state.isShowDialog = false;
};
const openDialog = (id: string) => {
  state.isShowDialog = true;
  state.ruleForm.id = id;
  nextTick(() => {
    formRef.value.resetFields();
  });
};
const clickConfirm = () => {

};
defineExpose({
  openDialog
});
</script>

<template>
  <vxe-modal id="passModal" v-model="state.isShowDialog" :title="state.title">
    <el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
      <el-form-item label="密码" prop="password">
        <el-input show-password type="text" v-model="state.ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='closeDialog'>取 消</el-button>
        <el-button type='primary' @click='clickConfirm'>确 定</el-button>
      </div>
    </template>
  </vxe-modal>
</template>

<style scoped lang="scss">

</style>
