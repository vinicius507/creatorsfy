"use client";

import { Form as AntdForm } from "antd";

type Props<T = unknown> = React.PropsWithChildren<{
  name?: string;
  onSubmit?: (values: T) => void | Promise<void>;
}>;

export const Form = <T = unknown>({ children, name, onSubmit }: Props<T>) => {
  return (
    <AntdForm name={name} onFinish={onSubmit}>
      {children}
    </AntdForm>
  );
};
