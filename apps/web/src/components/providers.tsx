"use client";

import { type AppStore, makeStore } from "@/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <ReduxProvider store={storeRef.current}>
      <AntdRegistry>{children}</AntdRegistry>
    </ReduxProvider>
  );
};
