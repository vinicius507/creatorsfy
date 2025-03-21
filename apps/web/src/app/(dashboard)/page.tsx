import { OrdersTable } from "@/components/orders-table";

export default function Home() {
  const startDate = "2025-03-10T20:59:37.000Z";
  const endDate = "2025-03-20T20:59:37.000Z";

  return (
    <div>
      <OrdersTable startDate={startDate} endDate={endDate} />
    </div>
  );
}
