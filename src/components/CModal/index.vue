<script setup lang="ts">
import useCModal from '@/hooks/useCModal';

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: ''
  },
  createPath: {
    type: String,
    required: true
  },
  updatePath: {
    type: String,
    required: true
  },
  viewPath: {
    type: String,
    required: true
  },
  ruleForm: {
    type: Object,
    default: () => {}
  },
  modalWidth: {
    type: String,
    default: '800px'
  },
  isFormCreate: {
    type: Boolean,
    default: false
  },
  clearFields: {
    type: Array as any,
    default: () => []
  },
  otherForm: {
    type: Object
  },
  otherInitMethod: {
    type: Function
  }
});
const emits = defineEmits([
  'refreshList'
]);

const refreshList = () => {
  emits('refreshList');
};
const {
  openDialog,
  closeDialog,
  clickConfirm,
  isShowDialog,
  title
} = useCModal({
  createPath: props.createPath,
  updatePath: props.updatePath,
  viewPath: props.viewPath,
  title: props.title,
  refreshList,
  otherForm: props.otherForm,
  otherInitMethod: props.otherInitMethod,
  clearFields: props.clearFields,
  isFormCreate: props.isFormCreate
});
defineExpose({
  openDialog
})
</script>

<template>
  <vxe-modal :id='props.modalId' v-model='isShowDialog' :width='props.modalWidth' :title='title'>
    <slot></slot>
    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='closeDialog'>取 消</el-button>
        <el-button type='primary' @click='clickConfirm'>确 定</el-button>
      </div>
    </template>
  </vxe-modal>
</template>
