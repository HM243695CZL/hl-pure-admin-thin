<script setup lang="ts">

import CTop from '@/components/CTop/index.vue';
import {reactive, toRaw} from 'vue';
import {createMenuApi, deleteMenuApi, getMenuPageApi, updateMenuApi, viewMenuApi} from '@/api/system/menu';
import {ConfigMapType} from '../../../types/global';
import useCrud from '@/hooks/useCrud';
import CModal from '@/components/CModal/index.vue';
import MenuModal from '@/views/system/component/menu/menuModal.vue';
import {useRenderIcon} from '@/components/ReIcon/src/hooks';

defineOptions({
  name: 'systemMenu'
})

const state = reactive({
  uris: {
    page: getMenuPageApi,
    delete: deleteMenuApi,
    pageMethod: 'get'
  },
  configMap: {
    title: '菜单',
    createPath: createMenuApi,
    updatePath: updateMenuApi,
    viewPath: viewMenuApi
  } as ConfigMapType
});
const {
  modalFormRef,
  childRef,
  dataList,
  getDataList,
  clickAdd,
  clickEdit,
  clickDelete
} = useCrud({
  uris: state.uris,
})
</script>

<template>
  <div class="menu-container h100">
    <CTop
      @click-add="clickAdd"
      :button-auth="['addBtn']"
    />
    <vxe-table
      border="inner"
      :data="dataList"
      align="left"
      :stripe="false"
      :tree-config="{
				rowField: 'id',
			}">
      <vxe-column field="title" title="菜单名称" tree-node />
      <vxe-column field="path" title="路由路径" />
      <vxe-column field="roles" title="权限标识" />
      <vxe-column field="icon" title="图标">
        <template #default="scope">
          <component :is="useRenderIcon(scope.row.icon)"/>
        </template>
      </vxe-column>
      <vxe-column field="isHide" title="是否显示">
        <template #default="scope">
          <el-tag>{{scope.row.isHide ? '隐藏' : '显示'}}</el-tag>
        </template>
      </vxe-column>
      <vxe-column field="sort" title="排序" />
      <vxe-column title="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="clickEdit(scope.row.id)">修改</el-button>
          <el-popconfirm width="200" title="确定删除该数据吗?" @confirm="clickDelete(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </vxe-column>
    </vxe-table>
    <CModal
      ref="modalFormRef"
      modal-id="menuModalId"
      :title="state.configMap.title"
      :create-path="state.configMap.createPath"
      :update-path="state.configMap.updatePath"
      :view-path="state.configMap.viewPath"
      @refreshList="getDataList"
    >
      <MenuModal
        ref="childRef"
        :menu-list="dataList"
      />
    </CModal>
  </div>
</template>

<style scoped lang="scss">
.menu-container{
  padding: 15px;
}
</style>
