"use client";

import { type PaginatedOrdersResponse, useOrdersControllerFindManyQuery } from "@/services/backend/endpoints";
import { Table, type TableColumnsType, Tag, Typography } from "antd";
import { useState } from "react";

type Order = PaginatedOrdersResponse["data"][number];

const idColumn = (value: string) => {
  return <Typography.Text style={{ fontFamily: "monospace", fontSize: "0.8em" }}>{value}</Typography.Text>;
};

const columns: TableColumnsType<Order> = [
  { title: "Order ID", dataIndex: "id", key: "id", render: idColumn },
  { title: "Product ID", dataIndex: "product", key: "product", render: idColumn },
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
        PENDING: "default",
        REJECTED: "error",
      } as const;

      return <Tag color={typeByStatus[status]}>{status}</Tag>;
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => <Typography.Text>{new Date(date).toLocaleString("pt-BR")}</Typography.Text>,
  },
];

type Props = {
  startDate: string;
  endDate: string;
};

export const OrdersTable: React.FC<Props> = ({ startDate, endDate }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading } = useOrdersControllerFindManyQuery({
    size: pageSize,
    page,
    startDate,
    endDate,
  });

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <Typography.Title level={2}>Orders</Typography.Title>
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
