import { Logo } from "@/components/logo";
import { SignUpForm } from "@/components/sign-up-form";
import { Flex } from "antd";

export default function SignUpPage() {
  return (
    <Flex vertical style={{ maxWidth: 320 }}>
      <Flex align="center" justify="center" style={{ marginBottom: 32 }}>
        <Logo size={32} />
      </Flex>
      <SignUpForm />
    </Flex>
  );
}
