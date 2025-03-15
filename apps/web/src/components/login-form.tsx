"use client";

import { useAuthControllerLoginMutation } from "@/services/backend/endpoints";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { FormItem } from "./ui/form/form-item";
import { Input } from "./ui/input";

type LoginFormFields = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [login, { error }] = useAuthControllerLoginMutation();

  const onSubmit = async (values: LoginFormFields) => {
    await login({ credentialsDto: values }).unwrap();
    router.push("/");
  };

  return (
    <Form name="login" onSubmit={onSubmit}>
      {error && (
        <span>
          Error: {error?.status} {JSON.stringify(error.data)}
        </span>
      )}
      <FormItem name="email" type="email" required>
        <Input type="email" icon={<UserOutlined />} placeholder="Email" required />
      </FormItem>
      <FormItem name="password" required>
        <Input type="password" icon={<LockOutlined />} placeholder="Password" required />
      </FormItem>
      <FormItem>
        <Button block type="primary" htmlType="submit">
          Login
        </Button>
      </FormItem>
    </Form>
  );
};
