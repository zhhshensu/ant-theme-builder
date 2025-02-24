import type { MenuDataItem } from "@ant-design/pro-layout";
import ProLayout from "@ant-design/pro-layout";
import { Button, Spin } from "antd";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Outlet, history, useLocation, useNavigate, useOutlet, useSearchParams } from "umi";
import { menuList } from "./constant";
import "./index.less";
import ThemeProvider from "@/contexts/ThemeProvider";

const LayoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 路由跳转
  const pathname = location.pathname;
  const [searchParams] = useSearchParams();

  const [collapsed, setCollapsed] = useState(false); // 折叠菜单
  const outlet = useOutlet();
  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) {
      return [];
    }

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      name: item.name || item.label,
      title: item.name || item.label,
      component: item.element,
      icon: icon,
      children: children && loopMenuItem(children),
    }));

    return m;
  };

  // 主要配置
  const layoutSetting = {
    // logo 单击事件
    title: "cpas-themebuilder",
    onMenuHeaderClick: () => {},

    sideWidth: 200,
    headerHeight: 43,
    menuHeaderRender: undefined,
  };

  const clickMenu = (params: any) => {
    const itemPath = params?.path;
    if (itemPath) {
      navigate(itemPath);
    }
  };

  return (
    <ThemeProvider>
      <ProLayout
        contentStyle={{
          padding: "16px",
          backgroundColor: "#fff",
        }}
        breadcrumbRender={undefined}
        onPageChange={(params) => {}}
        menuItemRender={(item, dom) => {
          return (
            <div
              onClick={() => {
                clickMenu(item);
              }}
            >
              {dom}
            </div>
          );
        }}
        {...layoutSetting}
        menuDataRender={() => loopMenuItem(menuList)}
        menuRender={(props, defaultDom) => {
          return <>{defaultDom}</>;
        }}
        collapsed={collapsed}
        onCollapse={(collapsed: boolean) => {
          setCollapsed(collapsed);
        }}
      >
        {outlet}
      </ProLayout>
    </ThemeProvider>
  );
};

export default LayoutPage;
