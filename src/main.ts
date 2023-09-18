import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store";
import ElementPlus from "element-plus";
import { getServerConfig } from "./config";
import { createApp, Directive } from "vue";
import { MotionPlugin } from "@vueuse/motion";
// import { useEcharts } from "@/plugins/echarts";
import { injectResponsiveStorage } from "@/utils/responsive";
import {
  VXETable,
  Column,
  VxeModal,
  Table,
  Filter,
  Tooltip
} from 'vxe-table';
import 'vxe-table/styles/cssvar.scss';

// import Table from "@pureadmin/table";
// import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";
import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

// 自定义指令
import * as directives from "@/directives";

function useTable(app) {
  app.use(Table).use(Column).use(Filter).use(VxeModal).use(Tooltip);
}
VXETable.setup({
  table: {
    stripe: true, // 斑马条纹
    border: true, // 边框
    align: 'center', // 文字居中
    minHeight: 0, // 表格最小高度
    showOverflow: 'tooltip', // 文字超出显示模式,
    columnConfig: {
      resizable: true, // 可拖拽列
    },
    rowConfig: {
      isHover: true
    },
    filterConfig: {
      remote: true, // 开启后端筛选
      iconNone: 'vxe-icon-search', // 设置筛选图标
      iconMatch: 'vxe-icon-search', // 设置筛选图标
    },
    sortConfig: {
      remote: true // 开启后端排序
    }
  },
  modal: {
    mask: true,
    duration: 500,
    showFooter: true,
    showZoom: false,
    draggable: false,
    escClosable: true
  }
});
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});
VXETable.formats.add('formatDate', ({ cellValue }) => {
  return dayjs(new Date(cellValue)).format('YYYY-MM-DD HH:mm:ss');
});
VXETable.formats.add('defaultValue', ({ cellValue }) => {
  return cellValue ? cellValue : '-';
});
// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
import dayjs from 'dayjs';
app.component("Auth", Auth);

getServerConfig(app).then(async config => {
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  setupStore(app);
  app.use(MotionPlugin).use(ElementPlus).use(useTable);
  // .use(useEcharts);
  // .use(Table);
  // .use(PureDescriptions);
  app.mount("#app");
});
