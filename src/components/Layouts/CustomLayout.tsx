import React, { useState } from "react";
import { Avatar, Badge, Button, Flex, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BellOutlined,
  DashboardOutlined,
  FolderAddOutlined,
  SnippetsOutlined,
  BankOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import styles from "./CustomLayout.module.css";

import { useSelector } from "react-redux";
import SubMenu from "antd/es/menu/SubMenu";
import { RootState } from "../../redux/store";

const { Header, Sider, Content } = Layout;

const CustomLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>
          <h1> Admin</h1>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/employees">Employees</Link>
          </Menu.Item>

          <SubMenu key="3" title="Company">
            <Menu.Item icon={<BankOutlined />} key="3.1">
              <Link to="/company">Company</Link>
            </Menu.Item>
            <Menu.Item icon={<UserSwitchOutlined />} key="3.2">
              <Link to="/employeeowner"> Company's Employee</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="4" icon={<SnippetsOutlined />}>
            <Link to="/form">Leave</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<MoneyCollectOutlined />}>
            <Link to="/salary">Salary</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <div className={styles.container}>
        <Header className={styles.header}>
          <Flex
            style={{ height: "100%" }}
            align="center"
            justify="space-between"
          >
            <MenuUnfoldOutlined style={{ fontSize: "2rem" }} onClick={toggle} />
            <Flex gap={30} align="center">
              <Badge dot>
                <BellOutlined style={{ fontSize: "2.5rem" }} />
              </Badge>

              <Link to={"/login"}>
                {authenticated ? (
                  <Avatar
                    size={37}
                    src={
                      user
                        ? user.avatar
                        : "https://i.pinimg.com/736x/79/d4/a0/79d4a0e82dbe356525a1376abdc112c8.jpg"
                    }
                  />
                ) : (
                  <Button type="primary" icon={<LoginOutlined />}>
                    Login
                  </Button>
                )}
              </Link>
            </Flex>
          </Flex>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 10,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </div>
    </Layout>
  );
};

export default CustomLayout;
