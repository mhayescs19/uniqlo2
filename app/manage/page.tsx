"use client";

import AddInventoryCard from "@/features/manage-inventory/components/add-inventory-card";

export default function Manage() {
  return (
    <div className="flex flex-row justify-center gap-11 pt-14">
      <AddInventoryCard />
      <div>Card2</div>
    </div>
  );
}
