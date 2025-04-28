"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <h1 className="text-3xl font-bold">Uniqlo 2</h1>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch("/api/checkout/total", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { total } = await response.json();

          toast("Subtotal generated", {
            description: `${total}`,
          });
        }}
      >
        Subtotal
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch("/api/checkout/purchase", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { order } = await response.json();

          toast("Order Id", {
            description: `${order.id}`,
          });
        }}
      >
        Purchase
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const response = await fetch("/api/stats/product/count", {
            method: "GET",
          });

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { productCount } = await response.json();

          toast("Products", {
            description: `${productCount}`,
          });
        }}
      >
        Get product count
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch("/api/stats/transaction/sales/value", {
            method: "GET",
          });

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { totalSales } = await response.json();

          toast("sales", {
            description: `${totalSales}`,
          });
        }}
      >
        Get total sales
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch(
            "/api/stats/order/size?type=average&limit=24",
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { type, limit } = await response.json();

          toast("sales", {
            description: `type:${type},limit:${limit}`,
          });
        }}
      >
        Get metric type limit
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch(
            "/api/stats/transaction/sales?period=24&limit=3",
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { period, limit } = await response.json();

          toast("sales", {
            description: `period:${period},limit:${limit}`,
          });
        }}
      >
        Get sales by period and limit
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch("/api/stats/transaction/sales/fit", {
            method: "GET",
          });

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { fits } = await response.json();

          toast("sales", {
            description: `fits:${fits}`,
          });
        }}
      >
        Get fit distribution
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch("/api/stats/order/size", {
            method: "GET",
          });

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { orderAverage, orderAverageOld, orderComparison } =
            await response.json();

          toast("sales", {
            description: `avg:${orderAverage} avgOld: ${orderAverageOld} ordComp: ${orderComparison}`,
          });
        }}
      >
        Get order average
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch("/api/checkout/purchase/details", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          toast("Webhook pinged", {
            description: `yeay`,
          });
        }}
      >
        Ping update last subtotal webhook
      </Button>
      <Button
        className="border-solid border-amber-200 cursor-pointer"
        onClick={async () => {
          const ids = [1172546379849105, 1172546379849105, 1176944426360209];

          const payload = {
            tagIds: ids,
          };

          console.log(JSON.stringify(payload));
          const response = await fetch("/api/checkout/purchase/details");

          if (!response.ok) {
            const val = await response.json();

            console.log(val);
          }

          const { productIds } = await response.json();

          toast("Webhook pinged", {
            description: `${productIds}`,
          });
        }}
      >
        Get webhook data
      </Button>
    </div>
  );
}
