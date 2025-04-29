"use client";
import { useState, useEffect } from "react";
import { Product } from "@/app/api/checkout/purchase/details/route";

interface orderPreview {
  productList: Product[];
  total: number;
}
export default function PurchasePage() {
  const streamedOrder: orderPreview = {
    productList: [],
    total: -1,
  };
  const [liveOrder, setLiveOrder] = useState(streamedOrder);

  useEffect(() => {
    const fetchOrder = async () => {
      const webHookResponse = await fetch("/api/checkout/purchase/details");

      if (!webHookResponse.ok) {
        const val = await webHookResponse.json();

        throw new Error(val.body);
      }

      const body = await webHookResponse.json();
      const { order } = body;

      console.log("home render");
      console.log(order);

      const updatedOrder: orderPreview = order;

      console.log(order);
      console.log(order.productList);

      console.log("updated order");
      console.log(updatedOrder);

      console.log("products list");
      console.log(updatedOrder.productList);

      setLiveOrder(updatedOrder);
    };

    fetchOrder();

    const id = setInterval(fetchOrder, 2_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {liveOrder.total !== -1 ? (
        <div>
          <div className="w-full flex rounded-md mt-9.5">
            <div className="flex flex-col gap-3.75 mx-auto border border-outline-gray-light-4 p-1 pl-3 pr-3 rounded-[0.3125rem]">
              <div className="factoExtraBold text-xl pt-3 pl-3">Checkout</div>
              <table className="table-auto w-full border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="px-4 text-left">Product</th>
                    <th className="px-4 text-left">Fit</th>
                    <th className="px-4 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {liveOrder.productList.map((item) => (
                    <tr key={item.id} className="">
                      <td className="p-4 border-2 border-r-0 border-gray-light rounded-l-[0.3125rem]">
                        {item.name}
                      </td>
                      <td className="p-4 border-2 border-l-0 border-r-0 border-gray-light">
                        {item.fit.toUpperCase()}
                      </td>
                      <td className="p-4 flex items-center justify-between border-2 border-l-0 border-gray-light rounded-r-[0.3125rem]">
                        <span>${Number(item.price).toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end pr-2 pb-2 factoExtraBold">{`Total Price: $${liveOrder.total}`}</div>
            </div>
          </div>
        </div>
      ) : (
        <p>No orders yet!</p>
      )}
    </>
  );
}
