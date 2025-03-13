import { Input as AntdInput } from "antd";

type Props = {
  icon?: React.ReactNode;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

export const Input: React.FC<Props> = ({ icon, type, ...props }) => {
  if (type === "password") {
    return <AntdInput.Password prefix={icon} {...props} />;
  }
  return <AntdInput type={type} prefix={icon} {...props} />;
};
