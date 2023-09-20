<script setup lang="ts">
import {nextTick, reactive, ref} from 'vue';
import {authRoleApi, getUserAuthApi} from '@/api/system/user';
import {getAction, postAction} from '@/api/common';
import {StatusEnum} from '@/common/status.enum';
import {ElMessage} from 'element-plus';

const emits = defineEmits([
  'refreshList'
]);
const props = defineProps({
  roleList: {
    type: Array,
    required: true
  }
});
const formRef = ref();
const state = reactive({
  isShowDialog: false,
  title: '分配角色',
  ruleForm: {
    id: '',
    roles: []
  },
  rules: {
    roles: [
      { required: true, message: '角色不能为空', trigger: 'blur' }
    ],
  }
});
const closeDialog = () => {
  state.isShowDialog = false;
};
const openDialog = (id: string) => {
  state.isShowDialog = true;
  nextTick(() => {
    getAction(getUserAuthApi + '/' + id, '').then(res => {
      if (res.status === StatusEnum.SUCCESS) {
        formRef.value.resetFields();
        state.ruleForm.id = id;
        state.ruleForm.roles = res.data;
      }
    })
  });
};
const clickConfirm = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      postAction(authRoleApi, state.ruleForm).then(res => {
        if (res.status === StatusEnum.SUCCESS) {
          ElMessage.success(res.message);
          closeDialog();
          emits('refreshList');
        }
      })
    }
  })
};
defineExpose({
  openDialog
});
</script>

<template>
  <vxe-modal id="divideRoleId" width="800" :title="state.title" v-model="state.isShowDialog">
    <el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
      <el-form-item label="角色" prop="roles">
        <el-select class="w100" v-model="state.ruleForm.roles" multiple placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
