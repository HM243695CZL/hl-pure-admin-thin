<script setup lang="ts">
import { paginationSizeList } from '@/common/pageCommonConfig';
const props = defineProps({
  pageInfo: {
    type: Object,
    required: true
  }
});
const emits = defineEmits([
  'changePageSize', 'changePageIndex'
]);
const changePageIndex = (index: number) => {
  emits('changePageIndex', index);
};
const changePageSize = (size: number) => {
  emits('changePageSize', size);
};
</script>

<template>
  <div class='pagination-common-container'>
    <el-pagination
      @size-change="changePageSize"
      @current-change="changePageIndex"
      class="mt15"
      :page-sizes="paginationSizeList"
      v-model:current-page="pageInfo.pageIndex"
      background
      v-model:page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.totalRecords"
    />
  </div>
</template>

<style scoped lang="scss">
.pagination-common-container{
  margin-top: 15px;
}
</style>
