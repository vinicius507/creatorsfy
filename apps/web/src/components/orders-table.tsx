"use client";

import { type PaginatedOrdersResponse, useOrdersControllerFindManyQuery } from "@/services/backend/endpoints";
import { Table, type TableColumnsType, Typography } from "antd";
import { useState } from "react";

const columns: TableColumnsType<PaginatedOrdersResponse["data"][number]> = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Product", dataIndex: "product", key: "id" },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (value: number, { currency }: PaginatedOrdersResponse["data"][number]) => (
      <p>
        {(value / 100).toLocaleString("en", {
          currency,
          style: "currency",
        })}
      </p>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Typography.Text type={status === "APPROVED" ? "success" : "danger"} style={{ fontWeight: 600 }}>
        {status}
      </Typography.Text>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleString("pt-BR"),
  },
];

export const OrdersTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [range, setRange] = useState(["2025-03-10T20:59:37.000Z", "2025-03-20T20:59:37.000Z"]);
  const { data, error, isLoading } = useOrdersControllerFindManyQuery({
    limit,
    page,
    range,
  });

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <Typography.Title level={2} style={{ marginBottom: 8 }}>
        Orders
      </Typography.Title>
      <Typography.Paragraph type="secondary">Registered orders.</Typography.Paragraph>
      <Table
        dataSource={data?.data}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.meta.total,
          pageSizeOptions: [10, 20, 30, 40, 50, 100, 200],
          onChange: (page, limit) => {
            setPage(page);
            setLimit(limit);
          },
        }}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
};
