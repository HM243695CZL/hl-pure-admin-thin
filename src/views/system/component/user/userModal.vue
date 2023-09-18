<script setup lang="ts">
import {reactive, ref} from 'vue';
import SingleUpload from '@/components/Upload/SingleUpload.vue';
const formRef = ref();
const state = reactive({
  ruleForm: {
    username: '',
    avatar: '',
    sex: null
  },
  rules: {
    username: [
      { required: true, message: '用户名不能为空', trigger: 'blur' }
    ]
  }
});
const changeAvatar = (url: string) => {
  state.ruleForm.avatar = url;
};
defineExpose({
  formRef,
  state
});
</script>

<template>
  <el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
    <el-form-item label="用户名称" prop="username">
      <el-input v-model="state.ruleForm.username" placeholder="请输入用户名称"></el-input>
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <SingleUpload :source-url="state.ruleForm.avatar" @change-source-url="changeAvatar" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="state.ruleForm.sex">
        <el-radio :label="1" border>男</el-radio>
        <el-radio :label="2" border>女</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
