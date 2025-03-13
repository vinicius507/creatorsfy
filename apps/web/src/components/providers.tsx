"use client";

import { store } from "@/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { Provider as ReduxProvider } from "react-redux";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <AntdRegistry>{children}</AntdRegistry>
    </ReduxProvider>
  );
};
