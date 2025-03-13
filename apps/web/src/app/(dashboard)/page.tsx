"use client";

import { useAppControllerGetMeQuery } from "@/services/backend/endpoints";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useAppControllerGetMeQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!data) {
    router.push("/login");
    return;
  }
  return <span>Hello, {data.email}</span>;
}
