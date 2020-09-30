import React from 'react';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';

interface IMenu {
  type: 'item' | 'sub';
  name: string;
  key: string;
  router: string;
  icon: () => React.ReactNode | null;
  children: IMenu[] | null;
}

const menuConfig: IMenu[] = [
  {
    type: 'item',
    name: 'Home',
    key: 'Home',
    router: '/',
    icon: () => {
      return <PieChartOutlined />;
    },
    children: null,
  },
  {
    type: 'sub',
    name: 'Menu',
    key: 'Menu',
    router: '',
    icon: () => {
      return <UserOutlined />;
    },
    children: [
      {
        type: 'item',
        name: 'User',
        key: 'User',
        router: '/user',
        icon: () => {
          return null;
        },
        children: null,
      },
      {
        type: 'item',
        name: 'About',
        key: 'About',
        router: '/about',
        icon: () => {
          return null;
        },
        children: null,
      },
    ],
  },
];

export default menuConfig;
