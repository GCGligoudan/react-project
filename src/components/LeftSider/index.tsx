import React, { useState, useEffect } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import './index.less';
import menuConfig from '../MenuConfig';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

const firstMenu = menuConfig[0];
const defaultSelectedKeys =
  firstMenu.type === 'item' ? firstMenu.key : firstMenu.children?.shift()?.key;

const LeftSider = (props: RouteComponentProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [curMenuItem, setCurMenuItem] = useState<string[]>([]);
  const [curSubMenu, setCurSubMenu] = useState<string[]>([]);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const onOpenChange = (keys: string[] | object) => {
    if (Array.isArray(keys)) setCurSubMenu(keys);
  };

  useEffect(() => {
    const currentRouter = props.location.pathname;
    menuConfig.map((item) => {
      if (item.type === 'item' && item.router === currentRouter) {
        setCurMenuItem([item.key]);
        setCurSubMenu([]);
      }
      if (item.type === 'sub') {
        item.children?.map((it) => {
          if (it.type === 'item' && it.router === currentRouter) {
            setCurMenuItem([it.key]);
            setCurSubMenu([item.key]);
          }
        });
      }
      return item;
    });
  }, [props.location.pathname]);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="gtx-lims-sider-logo" id="logo">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Gtx Lims</h1>
        </Link>
      </div>

      <Menu
        theme="dark"
        defaultSelectedKeys={[defaultSelectedKeys ? defaultSelectedKeys : '']}
        onOpenChange={onOpenChange}
        openKeys={curSubMenu}
        selectedKeys={curMenuItem}
        mode="inline"
      >
        {menuConfig.map((item) => {
          if (item.type === 'item') {
            return (
              <Menu.Item key={item.key} icon={item.icon()}>
                <Link to={item.router}>{item.name}</Link>
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu key={item.key} title={item.name} icon={item.icon()}>
                {item.children?.map((it) => {
                  return (
                    <Menu.Item key={it.key} icon={it.icon()}>
                      <Link to={it.router}>{it.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>
    </Sider>
  );
};

export default withRouter(LeftSider);
