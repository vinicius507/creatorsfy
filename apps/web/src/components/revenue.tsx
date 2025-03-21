"use client";

import { useOrdersControllerGetTotalRevenueQuery } from "@/services/backend/endpoints";
import { Typography } from "antd";

type Props = {
  startDate?: string;
  endDate?: string;
};

export const Revenue: React.FC<Props> = ({ startDate, endDate }) => {
  const { data, isLoading, error } = useOrdersControllerGetTotalRevenueQuery({
    currency: "BRL",
    startDate,
    endDate,
  });

  const value = data?.totalRevenue ?? 0;

  return (
    <div style={{ marginBottom: 32 }}>
      <Typography.Title level={2}>{"Revenue"}</Typography.Title>
      <Typography.Text type="success" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
        {(value / 100).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        })}
      </Typography.Text>
    </div>
  );
};
