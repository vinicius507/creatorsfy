"use client";

import { Layout as AntLayout, theme } from "antd";
import type React from "react";

const { Header, Content, Footer } = AntLayout;

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntLayout>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
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
