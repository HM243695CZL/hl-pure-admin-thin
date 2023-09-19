<script setup lang="ts">

import {reactive, ref} from 'vue';
import {createRoleApi, deleteRoleApi, getRolePageApi, updateRoleApi, viewRoleApi} from '@/api/system/role';
import useCrud from '@/hooks/useCrud';
import CTop from '@/components/CTop/index.vue';
import {ConfigMapType} from '../../../types/global';
import CPagination from '@/components/CPagination/index.vue';
import CModal from '@/components/CModal/index.vue';
import RoleModal from '@/views/system/component/role/roleModal.vue';

defineOptions({
  name: 'systemRole'
})

const roleRef = ref();
const state = reactive({
  uris: {
    page: getRolePageApi,
    delete: deleteRoleApi
  },
  configMap: {
    title: '角色',
    createPath: createRoleApi,
    updatePath: updateRoleApi,
    viewPath: viewRoleApi
  } as ConfigMapType,
});
const {
  dataList,
  pageInfo,
  tableRef,
  modalFormRef,
  childRef,
  getDataList,
  clickAdd,
  clickEdit,
  clickSearch,
  clickReset,
  clickDelete,
  selectionChange,
  changePageIndex,
  changePageSize,
} = useCrud({
  uris: state.uris,
  parentRef: roleRef
});
</script>

<template>
  <div class="role-container w100 h100" ref="roleRef">
    <CTop
      @click-add="clickAdd"
      @click-search="clickSearch"
      @click-reset="clickReset"
    />
    <vxe-table
      ref="tableRef"
      :row-config="{
				useKey: true,
				keyField: 'id',
			}"
      :data="dataList"
      @checkbox-all="selectionChange"
      @checkbox-change="selectionChange"
    >
      <vxe-column type="seq" title="序号" />
      <vxe-column field="name"  title="角色名称" />
      <vxe-column field="key"  title="角色key" />
      <vxe-column field="desc"  title="描述" />
      <vxe-column title="操作">
        <template #default="scope">
          <el-button size="small" @click="clickEdit(scope.row.id)">编辑</el-button>
          <el-popconfirm width="200" title="确定删除该数据吗?" @confirm="clickDelete(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </vxe-column>
    </vxe-table>
    <CPagination :page-info="pageInfo" @change-page-index="changePageIndex" @change-page-size="changePageSize" />
    <CModal
      ref="modalFormRef"
      modal-id="roleModalId"
      :title="state.configMap.title"
      :create-path="state.configMap.createPath"
      :update-path="state.configMap.updatePath"
      :view-path="state.configMap.viewPath"
      @refreshList="getDataList"
    >
      <RoleModal ref="childRef" />
    </CModal>
  </div>
</template>

<style scoped lang="scss">
.role-container{
  padding: 15px;
}
</style>
