"use client";

import { logout } from "@/services/auth";
import { useAppControllerGetMeQuery } from "@/services/backend/endpoints";
import { useDispatch } from "@/store";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useAppControllerGetMeQuery();

  if (!data || isLoading) {
    return <span>Loading...</span>;
  }

  const logoutHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    dispatch(logout());
    router.push("/login");
  };

  return (
    <div>
      <h1>{`Hello, ${data.email}`}</h1>
      <Button type="primary" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
}
