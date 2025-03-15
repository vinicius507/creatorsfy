"use client";

import { deleteAuthToken } from "@/lib/auth";
import { useAppControllerGetMeQuery } from "@/services/backend/endpoints";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useAppControllerGetMeQuery();

  if (!data || isLoading) {
    return <span>Loading...</span>;
  }

  const logout: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    await deleteAuthToken("auth_token");
    router.push("/login");
  };

  return (
    <div>
      <h1>{`Hello, ${data.email}`}</h1>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
