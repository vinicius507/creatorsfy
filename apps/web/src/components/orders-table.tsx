"use client";

import { type PaginatedOrdersResponse, useOrdersControllerFindManyQuery } from "@/services/backend/endpoints";
import { Table, type TableColumnsType, Typography } from "antd";
import { useState } from "react";

type Order = PaginatedOrdersResponse["data"][number];

const columns: TableColumnsType<Order> = [
  { title: "Order ID", dataIndex: "id", key: "id" },
  { title: "Product ID", dataIndex: "product", key: "product" },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (value: number, { currency }: Order) => (
      <Typography.Text>
        {(value / 100).toLocaleString("pt-BR", {
          currency,
          style: "currency",
        })}
      </Typography.Text>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Order["status"]) => {
      const typeByStatus = {
        APPROVED: "success",
        PENDING: "secondary",
        REJECTED: "danger",
      } as const;

      return (
        <Typography.Text type={typeByStatus[status]} style={{ fontWeight: 600 }}>
          {status}
        </Typography.Text>
      );
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => <Typography.Text>{new Date(date).toLocaleString("pt-BR")}</Typography.Text>,
  },
];

export const OrdersTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading } = useOrdersControllerFindManyQuery({
    size: pageSize,
    page,
    startDate: "2025-03-10T20:59:37.000Z",
    endDate: "2025-03-20T20:59:37.000Z",
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
        bordered
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.meta.total,
          pageSizeOptions: [10, 20, 30, 40, 50, 100, 200],
          onChange: (page, limit) => {
            setPage(page);
            setPageSize(limit);
          },
        }}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
};
