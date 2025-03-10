import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";
import { Flex } from "antd";

export default function LoginPage() {
  return (
    <Flex vertical style={{ maxWidth: 320 }}>
      <Flex align="center" justify="center" style={{ marginBottom: 16 }}>
        <Logo size={32} />
      </Flex>
      <LoginForm />
    </Flex>
  );
}
