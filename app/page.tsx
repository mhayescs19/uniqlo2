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
          const ids = [1234, 1235, 1236, 1237, 1238];

          const payload = {
            tagIds: ids,
          };

          const response = await fetch("/api/checkout/total", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const val = await response.json();
          }

          const val = await response.json();

          toast("Subtotal generated", {
            description: `${val}`,
          });
        }}
      >
        Send product ids
      </Button>
    </div>
  );
}
