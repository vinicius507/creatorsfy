"use client";

import { useOrdersControllerGetHistogramQuery } from "@/services/backend/endpoints";
import { Column } from "@ant-design/plots";
import { Typography } from "antd";

type Props = {
  startDate?: string;
  endDate?: string;
};

export const Histogram: React.FC<Props> = ({ startDate, endDate }) => {
  const { data, error, isLoading } = useOrdersControllerGetHistogramQuery({ startDate, endDate });

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  const histogramData = data?.histogram.map((orders, idx) => {
    return { hour: `${idx}h`, orders };
  });

  return (
    <div>
      <Typography.Title level={2}>Orders Histogram</Typography.Title>
      <Column
        data={histogramData ?? Array.from({ length: 24 }, () => 0)}
        loading={isLoading}
        xField="hour"
        yField="orders"
      />
    </div>
  );
};
