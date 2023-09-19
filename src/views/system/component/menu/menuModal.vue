<script setup lang="ts">
import {reactive, ref} from 'vue';

const props = defineProps({
  menuList: {
    type: Array,
    required: true
  }
});
const formRef = ref();
const state = reactive({
  ruleForm: {
    pid: '',
    title: '',
    path: '',
    name: '',
    icon: '',
    rank: '',
    showLink: '',
    isKeepAlive: '',
    isAffix: ''
  },
  rules: {
    path: [
      { required: true, message: '菜单地址不能为空', trigger: 'blur'}
    ],
    name: [
      { required: true, message: '组件名称不能为空', trigger: 'blur'}
    ],
    title: [
      { required: true, message: '菜单名称不能为空', trigger: 'blur'}
    ],
  },
});
defineExpose({
  formRef,
  state
});
</script>

<template>
  <el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
    <el-row :gutter="35">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="上级菜单" prop='pid'>
          <el-tree-select
            class='w100'
            clearable
            default-expand-all
            v-model='state.ruleForm.pid'
            :data='props.menuList'
            :props='{children: "children", label: "title", value: "id"}'
            check-strictly
          ></el-tree-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="菜单名称" prop='title'>
          <el-input v-model="state.ruleForm.title" placeholder="菜单名称" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="菜单地址" prop='path'>
          <el-input v-model="state.ruleForm.path" placeholder="菜单地址" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="路由名称" prop='name'>
          <el-input v-model="state.ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="菜单图标" prop='icon'>
          <el-input v-model='state.ruleForm.icon' placeholder='请输入图标'></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="菜单排序" prop='rank'>
          <el-input v-model="state.ruleForm.rank" placeholder="请输入排序" class="w100" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="是否显示" prop='showLink'>
          <el-radio-group v-model="state.ruleForm.showLink">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="页面缓存" prop='isKeepAlive'>
          <el-radio-group v-model="state.ruleForm.isKeepAlive">
            <el-radio :label="true">缓存</el-radio>
            <el-radio :label="false">不缓存</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
        <el-form-item label="是否固定" prop='isAffix'>
          <el-radio-group v-model="state.ruleForm.isAffix">
            <el-radio :label="true">固定</el-radio>
            <el-radio :label="false">不固定</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
