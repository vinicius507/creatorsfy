import { Providers } from "@/components/providers";
import { App } from "antd";

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
