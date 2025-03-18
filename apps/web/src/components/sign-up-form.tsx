"use client";

import { useAuthControllerRegisterMutation } from "@/services/backend/endpoints";
import { AppstoreOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { FormItem } from "./ui/form/form-item";
import { Input } from "./ui/input";

type SignUpFormFields = {
  storeName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [signUp, { error }] = useAuthControllerRegisterMutation();

  const onSubmit = async ({ confirmPassword: _, ...formData }: SignUpFormFields) => {
    await signUp({ registerDto: formData }).unwrap();
    router.push("/login");
  };

  return (
    <Form name="sign-up" onSubmit={onSubmit}>
      {error && (
        <span>
          Error: {error?.status} {JSON.stringify(error.data)}
        </span>
      )}
      <FormItem name="storeName" required>
        <Input icon={<AppstoreOutlined />} placeholder="Store name" required />
      </FormItem>
      <FormItem name="email" type="email" required>
        <Input type="email" icon={<UserOutlined />} placeholder="Email" required />
      </FormItem>
      <FormItem name="password" required>
        <Input type="password" icon={<LockOutlined />} placeholder="Password" required />
      </FormItem>
      <FormItem
        name="confirmPassword"
        required
        extraRules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The provided passwords do not match."));
            },
          }),
        ]}
      >
        <Input type="password" icon={<LockOutlined />} placeholder="Confirm password" required />
      </FormItem>
      <FormItem>
        <Button block type="primary" htmlType="submit">
          Sign Up
        </Button>
      </FormItem>
    </Form>
  );
};
