"use client";

import { Form } from "antd";
import type { Rule, RuleObject } from "antd/es/form";

type Props = React.PropsWithChildren<{
  name?: string;
  type?: RuleObject["type"];
  required?: boolean;
  extraRules?: Rule[];
}>;

export const FormItem: React.FC<Props> = ({ children, type, ...props }) => {
  const rules: Rule[] = [{ type, message: "Required." }];

  if (props.required) {
    rules.push({ required: true, message: "This field is required." });
  }

  return (
    <Form.Item rules={rules} {...props}>
      {children}
    </Form.Item>
  );
};
