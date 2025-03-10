"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};
