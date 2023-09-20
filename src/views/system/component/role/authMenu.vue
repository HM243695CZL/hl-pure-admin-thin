<script setup lang="ts">

import {nextTick, reactive, ref} from 'vue';
import {authRoleApi, viewAuthRoleApi} from '@/api/system/role';
import {getAction, postAction} from '@/api/common';
import {StatusEnum} from '@/common/status.enum';
import {ElMessage} from 'element-plus';

const props = defineProps({
  menuList: {
    type: Array,
    required: true
  }
});
const treeRef = ref();
const state = reactive({
  id: '',
  isShowDialog: false,
  title: '授权',
  selectedMenuIds: [],
  defaultProps: {
    children: 'children',
    label: 'title'
  }
});
const closeDialog = () => {
  state.isShowDialog = false;
};
const openDialog = (id: string) => {
  state.isShowDialog = true;
  state.id = id;
  nextTick(() => {
    getAction(`${viewAuthRoleApi}/${id}`, '').then(res => {
      if (res.status === StatusEnum.SUCCESS) {
        state.selectedMenuIds = res.data;
        treeRef.value.setCheckedKeys([], false);
        treeRef.value.setCheckedKeys(res.data, false);
      }
    })
  })
};
const clickConfirm = () => {
  postAction(authRoleApi, {
    id: state.id,
    menuIds: treeRef.value.getCheckedKeys()
  }).then(res => {
    if (res.status === StatusEnum.SUCCESS) {
      ElMessage.success(res.message);
      closeDialog();
    }
  })
};
defineExpose({
  openDialog
});
</script>

<template>
  <vxe-modal id="authMenuId" v-model="state.isShowDialog" :title="state.title" width="800">
    <div class="tree-box">
      <el-tree
        ref='treeRef'
        :data="menuList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="state.selectedMenuIds"
        :props="state.defaultProps"
      />
    </div>
    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='closeDialog'>取 消</el-button>
        <el-button type='primary' @click='clickConfirm'>确 定</el-button>
      </div>
    </template>
  </vxe-modal>
</template>

<style scoped lang="scss">
.tree-box{
  max-height: 500px;
  overflow: auto;
}
</style>
