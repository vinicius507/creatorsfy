import { Layout } from "@/components/ui/layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
        <AntdRegistry>
          <Layout>{children}</Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
