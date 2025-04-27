import { Trash } from "lucide-react";

const items = [
  {
    sku: 1245,
    fit: "M",
    name: "3D Knitted Sweater",
    price: "89.99",
  },
  {
    sku: 4563,
    fit: "M",
    name: "3D Knitted Sweater",
    price: "189.99",
  },
];

export default function ViewInventoryCard() {
  return (
    <div>
      <div className="w-full flex rounded-md mt-9.5">
        <div className="flex flex-col gap-3.75 mx-auto border border-outline-gray-light-4 p-1 pl-3 pr-3 rounded-[0.3125rem]">
          <table className="table-auto w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="px-4 text-left">SKU</th>
                <th className="px-4 text-left">Fit</th>
                <th className="px-4 text-left">Name</th>
                <th className="px-4 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.sku} className="">
                  <td className="p-4 border-2 border-r-0 border-gray-light rounded-l-[0.3125rem]">
                    {item.sku}
                  </td>
                  <td className="p-4 border-2 border-l-0 border-r-0 border-gray-light">
                    {item.fit}
                  </td>
                  <td className="p-4 border-2 border-l-0 border-r-0 border-gray-light">
                    {item.name}
                  </td>
                  <td className="p-4 flex items-center justify-between border-2 border-l-0 border-gray-light rounded-r-[0.3125rem]">
                    <span>${item.price}</span>
                    <button className="ml-2 cursor-pointer">
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
