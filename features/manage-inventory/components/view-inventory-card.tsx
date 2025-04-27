import InventoryItem from "./inventory-item";
import { Trash } from "lucide-react";

export default function ViewInventoryCard() {
  return (
    <div>
      <div className="w-full flex rounded-md mt-9.5">
        <div className="flex flex-col gap-3.75 max-w-sm mx-auto border border-outline-gray-light-4 p-4 rounded-[0.3125rem]">
          <table className="table-auto w-full border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">SKU</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-0">
                  <div className="grid grid-cols-4 items-center gap-6 border border-gray-300 rounded-md p-4">
                    <span className="w-1/4">000</span>
                    <span className="w-1/4">UX</span>
                    <span className="w-10">3D Knit Sweater</span>
                    <span className="flex items-center">
                      $75.00
                      <span className="flex items-cente ml-2.25">
                        <button className="cursor-pointer">
                          <Trash size={24} />
                        </button>
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
