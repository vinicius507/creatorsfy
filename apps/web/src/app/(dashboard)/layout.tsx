import { Providers } from "@/components/providers";
import { Layout } from "@/components/ui/layout";
import { App } from "antd";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Creatorsfy",
  description: "Creatorsfy challenge",
};

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>
          <App>
            <Layout>{children}</Layout>
          </App>
        </Providers>
      </body>
    </html>
  );
}
