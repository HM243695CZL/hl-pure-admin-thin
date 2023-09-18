<script setup lang="ts">

import {reactive, ref} from 'vue';

const formRef = ref();
const state = reactive({
  ruleForm: {
    name: '',
    key: '',
    desc: ''
  },
  rules: {
    name: [
      { required: true, message: '角色名称不能为空', trigger: 'blur' }
    ],
    key: [
      { required: true, message: '角色key不能为空', trigger: 'blur' }
    ]
  }
});
defineExpose({
  formRef,
  state
});
</script>

<template>
  <el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="state.ruleForm.name" placeholder="请输入角色名称"></el-input>
    </el-form-item>
    <el-form-item label="角色key" prop="key">
      <el-input v-model="state.ruleForm.key" placeholder="请输入角色key"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="desc">
      <el-input v-model="state.ruleForm.desc" placeholder="请输入角色描述"></el-input>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
