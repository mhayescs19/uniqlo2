"use client";

import AddInventoryCard from "@/features/manage-inventory/components/add-inventory-card";
import ViewInventoryCard from "@/features/manage-inventory/components/view-inventory-card";

export default function Manage() {
  return (
    <div className="flex flex-row justify-center gap-11 pt-14">
      <AddInventoryCard />
      <ViewInventoryCard />
    </div>
  );
}
