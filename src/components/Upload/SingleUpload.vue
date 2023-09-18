<script setup lang="ts">
import {computed, onMounted, reactive} from 'vue';
import {getAction} from '@/api/common';
import {StatusEnum} from '@/common/status.enum';
import {policyApi} from '@/api/oss';

const emits = defineEmits([
  'changeSourceUrl'
]);
const props = defineProps({
  sourceUrl: {
    type: String,
    required: true
  }
});
const state = reactive({
  dataObj: {
    policy: '',
    signature: '',
    key: '',
    ossAccessKeyId: '',
    dir: '',
    host: ''
  },
  useOss: true,
  fileList: [] as any
});
const imageUrl = computed(() => {
  return props.sourceUrl;
});
const imageName = computed(() => {
  return props.sourceUrl?.substr(props.sourceUrl?.lastIndexOf('/') + 1);
});
const imgList = computed({
  get: () => {
    return props.sourceUrl ? [{
      name: imageName,
      url: imageUrl
    }] : []
  },
  set: (param: any) => {
    state.fileList = [{
      name: param.name,
      url: param.url
    }]
  }
});
const changeSourceUrl = (val: string) => {
  emits('changeSourceUrl', val);
}
const handleRemove = () => {
  changeSourceUrl('');
};
const handleSuccess = (res: any, file: any) => {
  const url = state.dataObj.host + '/' + state.dataObj.dir + '/' + file.name;
  imgList.value = [{
    name: file.name,
    url
  }]
  changeSourceUrl(url);
};
onMounted(() => {
  getAction(policyApi, '').then(res => {
    if (res.status === StatusEnum.SUCCESS) {
      const {accessKeyId, dir, host, policy, signature} = res.data;
      state.dataObj.policy = policy;
      state.dataObj.signature = signature;
      state.dataObj.key = dir + '/${filename}';
      state.dataObj.ossAccessKeyId = accessKeyId;
      state.dataObj.dir = dir;
      state.dataObj.host = host;
    }
  })
})
</script>

<template>
  <div class='single-upload'>
    <el-upload
      class="upload-demo"
      :action="state.dataObj.host"
      :data='state.dataObj'
      :on-remove="handleRemove"
      :on-success='handleSuccess'
      :file-list="imgList"
      list-type="picture"
    >
      <el-button type="primary" :disabled="!state.dataObj.host">点击上传</el-button>
    </el-upload>
  </div>
</template>
