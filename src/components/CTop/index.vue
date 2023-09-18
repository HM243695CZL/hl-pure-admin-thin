<script setup lang="ts">
const props = defineProps({
  buttonAuth: {
    type: Array,
    default: () => [
      'addBtn', 'searchBtn', 'resetBtn'
    ]
  }
});

const emits = defineEmits([
  'clickAdd', 'clickSearch', 'clickReset'
]);

const clickSearch = () => {
  emits('clickSearch');
};
const clickReset = () => {
  emits('clickReset');
};
const clickAdd = () => {
  emits('clickAdd');
}
</script>

<template>
  <div class='common-top-container mb15'>
    <div class='search-top-title'>
      <div class='search-top-title-left'>
        <el-button size='default' type='primary' @click='clickAdd' v-if='props.buttonAuth.includes("addBtn")'>新增</el-button>
        <slot name='left'></slot>
      </div>
      <div class='search-top-title-right'>
        <slot name='right'></slot>
        <el-button size='default' type='primary' @click='clickSearch' v-if='props.buttonAuth.includes("searchBtn")'>查询</el-button>
        <el-button size='default' type='default' class='ml10' @click='clickReset' v-if='props.buttonAuth.includes("resetBtn")'>重置</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.common-top-container{
  .search-top-title{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    &-left{
      display: flex;
      justify-content: flex-start;
      button{
        margin-right: 10px;
      }
    }
    &-right{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
