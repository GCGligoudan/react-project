import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import routeData from './routes';
import NotFound from './pages/404';
import './App.less';
import { Layout, Breadcrumb } from 'antd';
import LeftSider from './components/LeftSider';

interface IRouteConfig {
  key: string;
  path: string;
  exact: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const { Header, Content, Footer } = Layout;

function App() {
  // console.log('abc');

  return (
    <Router>
      <div className="gtx-lims">
        <Layout style={{ minHeight: '100vh' }}>
          <LeftSider />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  {routeData.map(
                    ({ key, path, component, exact }: IRouteConfig) => (
                      <Route
                        key={key}
                        path={path}
                        component={component}
                        exact={exact}
                      />
                    )
                  )}
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
