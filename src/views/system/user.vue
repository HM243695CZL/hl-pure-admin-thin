<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import CTop from '@/components/CTop/index.vue';
import CModal from '@/components/CModal/index.vue';
import CPagination from '@/components/CPagination/index.vue';
import UserModal from '@/views/system/component/user/userModal.vue';
import UpdatePassModal from '@/views/system/component/user/updatePassModal.vue';
import DivideRole from '@/views/system/component/user/divideRole.vue';
import {createUserApi, deleteUserApi, getUserPageApi, updateUserApi, viewUserApi} from '@/api/system/user';
import useCrud from '@/hooks/useCrud';
import {ConfigMapType} from '../../../types/global';
import {getRoleListApi} from '@/api/system/role';
import {getAction} from '@/api/common';
import {StatusEnum} from '@/common/status.enum';

defineOptions({
  name: 'systemUser'
})

const userRef = ref();
const updatePassRef = ref();
const divideRoleRef = ref();
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
  },
  roleList: []
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
};
const clickDivideRole = (id: string) => {
  divideRoleRef.value.openDialog(id);
};
const getRoleList = () => {
  getAction(getRoleListApi, '').then(res => {
    if (res.status === StatusEnum.SUCCESS) {
      state.roleList = res.data;
    }
  })
};
onMounted(() => {
  getRoleList();
});
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
      <vxe-column width="300" title="操作">
        <template #default="scope">
          <el-button size="small" @click="clickDivideRole(scope.row.id)">分配角色</el-button>
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
    <DivideRole
      ref="divideRoleRef"
      :role-list="state.roleList"
      @refreshList="getDataList"
    />
  </div>
</template>

<style scoped lang="scss">
.user-container {
  padding: 15px;
}
</style>
