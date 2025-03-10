import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AntdRegistry>
          <App
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            {children}
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}
