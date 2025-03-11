"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export const LoginForm: React.FC = () => {
  const onFinish = (values: unknown) => {
    console.log(values);
  };

  return (
    <Form name="login" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "Invalid email." },
          { required: true, message: "Input your email." },
        ]}
      >
        <Input type="email" prefix={<UserOutlined />} placeholder="Email" required />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "Input your password." }]}>
        <Input.Password prefix={<LockOutlined />} placeholder="Password" required />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
