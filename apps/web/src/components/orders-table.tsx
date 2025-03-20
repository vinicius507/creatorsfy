"use client";

import { type PaginatedOrdersResponse, useOrdersControllerFindManyQuery } from "@/services/backend/endpoints";
import { Table, type TableColumnsType, Typography } from "antd";

export const OrdersTable: React.FC = () => {
  const { data, error, isLoading } = useOrdersControllerFindManyQuery({
    limit: 10,
    page: 1,
    range: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()].map((date) => date.toISOString()),
  });
  const columns: TableColumnsType<PaginatedOrdersResponse["data"][number]> = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Product", dataIndex: "product", key: "id" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
  ];

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  console.log("isLoading: %s data: %s", isLoading, JSON.stringify(data));

  return (
    <div>
      <Typography.Title level={2} style={{ marginBottom: 8 }}>
        Orders
      </Typography.Title>
      <Typography.Paragraph type="secondary">Registered orders.</Typography.Paragraph>
      <Table dataSource={data?.data} columns={columns} loading={isLoading} />
    </div>
  );
};
