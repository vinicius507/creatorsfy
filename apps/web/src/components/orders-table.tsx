"use client";

import { type PaginatedOrdersResponse, useOrdersControllerFindManyQuery } from "@/services/backend/endpoints";
import { Table, type TableColumnsType, Typography } from "antd";
import { useState } from "react";

const columns: TableColumnsType<PaginatedOrdersResponse["data"][number]> = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Product", dataIndex: "product", key: "id" },
  { title: "Currency", dataIndex: "currency", key: "currency" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
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
