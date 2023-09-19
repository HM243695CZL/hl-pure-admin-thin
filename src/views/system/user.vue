<script setup lang="ts">
import {reactive, ref} from 'vue';
import CTop from '@/components/CTop/index.vue';
import CModal from '@/components/CModal/index.vue';
import CPagination from '@/components/CPagination/index.vue';
import UserModal from '@/views/system/component/user/userModal.vue';
import UpdatePassModal from '@/views/system/component/user/updatePassModal.vue';
import {createUserApi, deleteUserApi, getUserPageApi, updateUserApi, viewUserApi} from '@/api/system/user';
import useCrud from '@/hooks/useCrud';
import {ConfigMapType} from '../../../types/global';

defineOptions({
  name: 'systemUser'
})

const userRef = ref();
const updatePassRef = ref();
const state = reactive({
  uris: {
    page: getUserPageApi,
    delete: deleteUserApi
  },
  configMap: {
    title: '用户',
    createPath: createUserApi,
    updatePath: updateUserApi,
    viewPath: viewUserApi
  } as ConfigMapType,
  sexMap: {
    1: '男',
    2: '女'
  }
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
  parentRef: userRef
});
const clickEditPass = (id: string) => {
  updatePassRef.value.openDialog(id);
}
</script>

<template>
  <div class="user-container w100 h100" ref="userRef">
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
      <vxe-column field="username"  title="用户名" />
      <vxe-column field="avatar" title="头像">
        <template #default="scope">
          <img class="img50" :src="scope.row.avatar" alt="">
        </template>
      </vxe-column>
      <vxe-column field="sex" title="性别">
        <template #default="scope">
          {{state.sexMap[scope.row.sex]}}
        </template>
      </vxe-column>
      <vxe-column field="roles" title="关联角色">
        <template #default="scope">
          {{(scope.row.roles || []).join('、')}}
        </template>
      </vxe-column>
      <vxe-column field="addTime" title="添加时间" />
      <vxe-column width="220" title="操作">
        <template #default="scope">
          <el-button size="small" @click="clickEditPass(scope.row.id)">修改密码</el-button>
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
      modal-id="userModalId"
      :title="state.configMap.title"
      :create-path="state.configMap.createPath"
      :update-path="state.configMap.updatePath"
      :view-path="state.configMap.viewPath"
      @refreshList="getDataList"
    >
      <UserModal ref="childRef" />
    </CModal>
    <UpdatePassModal
      ref="updatePassRef"
    />
  </div>
</template>

<style scoped lang="scss">
.user-container {
  padding: 15px;
}
</style>
