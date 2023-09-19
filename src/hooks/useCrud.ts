import {computed, onMounted, reactive, ref, toRefs} from 'vue';
import {PageEntity} from '@/common/page.entity';
import {ElMessage} from 'element-plus';
import {getAction, postAction} from '@/api/common';
import {StatusEnum} from '@/common/status.enum';

interface ICrudParams {
  uris: {
    page?: string, // 分页查询接口
    pageMethod?: string, // 分页查询接口请求方法
    deleteBatch?: string, // 批量删除
    delete?: string, // 单个删除接口
  },
  parentRef?: any, // 父级ref
}

type ActionMapType = {
  post: Function,
  get: Function
}

export default function ({
                           uris,
                           parentRef
                         }: ICrudParams) {
  const tableRef = ref();
  const modalFormRef = ref();
  const childRef = ref();
  const state = reactive({
    pageInfo: new PageEntity(),
    dataList: [],
    searchParams: {} as any,
    selectedRowKeys: [] as any, // 被选中的数据主键
    selectionRows: [], // 被选中的数据行
    tableHeight: 300
  });

  /**
   * 加载表格数据
   */
  const getDataList = () => {
    if (!uris.page) {
      ElMessage.error('请设置uris.page属性！');
      return false;
    }
    let actionMap: ActionMapType = {
      post: (url: string, data: any) => postAction(url, data),
      get: (url: string, data: any) => getAction(url, data)
    }
    const reqMethod = uris.pageMethod ? uris.pageMethod : 'post';
    actionMap[reqMethod](uris.page, {
      ...state.pageInfo,
      ...state.searchParams
    }).then(res => {
      if (res.status === StatusEnum.SUCCESS) {
        if (parentRef) {
          state.tableHeight = parentRef.value.getBoundingClientRect().height;
        }
        state.dataList = reqMethod === 'post' ? res.data.list : res.data;
        state.pageInfo.totalRecords = res.data.total;
      }
    })
  };

  /**
   * 点击新增
   */
  const clickAdd = () => {
    modalFormRef.value.openDialog({
      dataId: '',
      isView: false,
      childRef
    });
  }

  /**
   * 点击编辑
   * @param id 当前行的数据id
   */
  const clickEdit = (id: string) => {
    modalFormRef.value.openDialog({
      dataId: id,
      isView: false,
      childRef
    });
  };

  /**
   * 点击查看
   * @param id 当前行的数据id
   */
  const clickView = (id: string) => {
    modalFormRef.value.openDialog({
      dataId: id,
      isView: true,
      childRef
    });
  };

  /**
   * 点击查询
   */
  const clickSearch = () => {
    state.pageInfo.pageIndex = 1;
    getDataList();
  };
  /**
   * 点击重置
   */
  const clickReset = () => {
    state.searchParams = {};
    state.pageInfo = new PageEntity();
    getDataList();
  };

  /**
   * 单个删除
   * @param id 需要删除的id
   */
  const clickDelete = (id: string) => {
    if (!uris.delete) {
      ElMessage.error('请设置uris.delete属性');
      return false;
    }
    getAction(`${uris.delete}/${id}`, '').then(res => {
      if (res.status === StatusEnum.SUCCESS) {
        state.pageInfo.pageIndex = 1;
        ElMessage.success(res.message);
        getDataList();
      }
    })
  };

  /**
   * 批量删除
   */
  const clickBatchDelete = () => {
    if (!uris.deleteBatch) {
      ElMessage.error('请设置uris.deleteBatch属性！');
      return false;
    }
    if (!state.selectedRowKeys || state.selectedRowKeys.length <= 0) {
      ElMessage.error('请选择需要删除的数据');
      return false;
    }
    postAction(uris.deleteBatch, state.selectedRowKeys).then(res => {
      if (res.status === StatusEnum.SUCCESS) {
        state.pageInfo.pageIndex = 1;
        ElMessage.success(res.message);
        state.selectedRowKeys = [];
        getDataList();
      }
    })
  };

  /**
   * 选中表格数据
   * @param selectionRows 选中的数据
   */
  const selectionChange = (selectionRows: any) => {
    if (!tableRef.value.rowConfig) {
      ElMessage.error('请为表格ref绑定rowConfig,并设置数据主键');
      return false;
    }
    const selectedRowKeys: string[] = [];
    (selectionRows.records || []).map((item: any) => {
      selectedRowKeys.push(item[tableRowKey.value]);
    });
    state.selectedRowKeys = selectedRowKeys;
    state.selectionRows = selectionRows.records;
  };

  /**
   * 切换第几页
   * @param index 第几页
   */
  const changePageIndex = (index: number) => {
    state.pageInfo.pageIndex = index;
    getDataList();
  };

  /**
   * 切换每页条数
   * @param size 每页几条
   */
  const changePageSize = (size: number) => {
    state.pageInfo.pageIndex = 1;
    state.pageInfo.pageSize = size;
    getDataList();
  };

  const tableRowKey = computed(() => {
    if (!tableRef.value) {
      return '';
    }
    return tableRef.value.rowConfig.keyField || '';
  });

  onMounted(() => {
    getDataList();
  });

  return {
    tableRef,
    modalFormRef,
    childRef,
    ...toRefs(state),
    getDataList,
    clickAdd,
    clickEdit,
    clickView,
    clickSearch,
    clickReset,
    clickDelete,
    clickBatchDelete,
    selectionChange,
    changePageIndex,
    changePageSize
  }

}
