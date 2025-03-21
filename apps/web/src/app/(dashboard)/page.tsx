"use client";

import { DatesFilter } from "@/components/dates-filter";
import { Histogram } from "@/components/histogram";
import { OrdersTable } from "@/components/orders-table";
import { Revenue } from "@/components/revenue";
import { Flex, Typography } from "antd";
import { useState } from "react";

export default function Home() {
  const [dates, setDates] = useState<{ startDate?: string; endDate?: string }>({});

  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title>Dashboard</Typography.Title>
        <DatesFilter {...dates} setDates={setDates} />
      </Flex>
      <Revenue {...dates} />
      <Histogram {...dates} />
      <OrdersTable {...dates} />
    </div>
  );
}
