"use client";

import { LucideBanknoteArrowUp, LucidePartyPopper } from "lucide-react";
import { useState, useEffect } from "react";

interface Dashboard {
  totalSales: number;
}

export default function StatsPage() {
  const [liveDashboard, setLiveDashboard] = useState<Dashboard>();

  useEffect(() => {
    const fetchDash = async () => {
      const totalSalesResponse = await fetch(
        "/api/stats/transaction/sales/value"
      );

      if (!totalSalesResponse.ok) {
        const val = await totalSalesResponse.json();

        throw new Error(val.body);
      }

      const body = await totalSalesResponse.json();
      const { totalSales } = body;

      const updates = {
        ...liveDashboard,
        totalSales: totalSales,
      };

      setLiveDashboard(updates);
    };

    fetchDash();
  }, []);

  return (
    <div>
      <div className="w-full flex rounded-md mt-9.5">
        {liveDashboard && liveDashboard.totalSales !== null ? (
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 mx-auto border border-outline-gray-light-4 p-1 pl-3 pr-3 rounded-[0.3125rem]">
              <div className="flex flex-row p-2 gap-1.75">
                <LucideBanknoteArrowUp size={24} color="#6D6D6D" />
                <div className="font-medium text-[1rem]">Total Sales</div>
              </div>
              <div className="factoExtraBold p-2 text-[1.375rem]">{`$${
                liveDashboard!.totalSales
              }`}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row drop-shadow-xs">
                <LucidePartyPopper size={18} width={1} color="white" />
                <div className="p-2 text-[0.625rem]">up all time</div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
