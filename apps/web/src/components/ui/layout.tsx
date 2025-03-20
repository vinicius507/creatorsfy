"use client";

import { logout } from "@/services/auth";
import { useAppControllerGetMeQuery } from "@/services/backend/endpoints";
import { useDispatch } from "@/store";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout as AntLayout, Button, Menu, theme } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { Logo } from "../logo";

const { Header, Content, Footer } = AntLayout;

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useAppControllerGetMeQuery();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntLayout>
      <AntLayout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <Button type="text" style={{ color: "white" }} href="/">
            <Logo size={20} />
          </Button>
          <Menu
            selectedKeys={[]}
            style={{ display: "flex", justifyContent: "end", flex: 1, minWidth: 0 }}
            mode="horizontal"
            theme="dark"
            items={[
              {
                key: "user",
                icon: React.createElement(UserOutlined),
                label: isLoading ? "Loading..." : data?.email,
              },
              {
                key: "logout",
                icon: React.createElement(LogoutOutlined),
                label: "Logout",
                danger: true,
                onClick: () => {
                  dispatch(logout());
                  router.push("/login");
                },
              },
            ]}
          />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>© Creatorsfy {new Date().getFullYear()}</Footer>
      </AntLayout>
    </AntLayout>
  );
};
