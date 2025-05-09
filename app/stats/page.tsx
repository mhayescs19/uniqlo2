"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LucideBanknoteArrowUp,
  LucideCircleFadingArrowUp,
  LucidePartyPopper,
  LucidePieChart,
  LucideShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";

interface AverageOrder {
  count: number;
  comparison: number;
  isPositive: boolean;
}

interface RadialData {
  month: string;
  m: number;
  f: number;
  ux: number;
}

interface Dashboard {
  totalSales: number;
  averageOrder: AverageOrder;
  distribution: RadialData[];
}

export default function StatsPage() {
  const [liveDashboard, setLiveDashboard] = useState<Dashboard>();

  const chartConfig = {
    m: {
      label: "Male",
      color: "#70abf5",
    },
    f: {
      label: "Female",
      color: "#888098",
    },
    ux: {
      label: "Unisex",
      color: "#266DD3",
    },
  } satisfies ChartConfig;

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

      const averageOrderResponse = await fetch("/api/stats/order/size");

      if (!averageOrderResponse.ok) {
        const val = await averageOrderResponse.json();

        throw new Error(val.body);
      }

      const orderBody = await averageOrderResponse.json();
      const { orderAverage, orderComparison, isPositive } = orderBody;

      const distributionResponse = await fetch(
        "/api/stats/transaction/sales/fit"
      );

      if (!distributionResponse.ok) {
        const val = await distributionResponse.json();

        throw new Error(val.body);
      }

      const distributionBody = await distributionResponse.json();
      const { fits } = distributionBody;

      console.log(fits);

      const updates = {
        ...liveDashboard,
        totalSales: totalSales,
        averageOrder: {
          count: orderAverage,
          comparison: orderComparison,
          isPositive: isPositive,
        },
        distribution: fits,
      };

      setLiveDashboard(updates);
    };

    fetchDash();
  }, []);

  return (
    <div>
      <div className="w-full flex rounded-md mt-9.5">
        {liveDashboard && liveDashboard.totalSales !== null ? (
          <div className="flex flex-col gap-2 mx-auto border border-outline-gray-light-4 p-1 pl-3 pr-3 rounded-[0.3125rem]">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="flex flex-row p-2 gap-1.75">
                  <LucideBanknoteArrowUp size={24} color="#6D6D6D" />
                  <div className="inter-extra-bold font-medium text-ugray text-[1rem]">
                    Total Sales
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-4">
                  <div className="factoExtraBold p-2 text-[1.375rem]">{`$${
                    liveDashboard!.totalSales
                  }`}</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center h-7.5 gap-1.5 p-1.5 bg-ublue border-1 border-ublue-stroke rounded-[0.3125rem]">
                      <LucidePartyPopper
                        className="drop-shadow-md"
                        size={18}
                        strokeWidth={1.25}
                        color="white"
                      />
                      <div className="inter-bold text-[0.625rem] text-white drop-shadow-md">
                        up all time
                      </div>
                    </div>
                    <div className="inter-bold text-center text-ugray text-[0.625rem] text-gray">
                      up all time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}

        {liveDashboard && liveDashboard.averageOrder !== null ? (
          <div className="flex flex-col gap-2 mx-auto border border-outline-gray-light-4 p-1 pl-3 pr-3 rounded-[0.3125rem]">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="flex flex-row p-2 gap-1.75">
                  <LucideShoppingCart size={24} color="#6D6D6D" />
                  <div className="inter-extra-bold font-medium text-ugray text-[1rem]">
                    Average Order
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-4">
                  <div className="factoExtraBold p-2 text-[1.375rem]">{`${
                    liveDashboard!.averageOrder.count
                  } items`}</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center h-7.5 gap-1.5 p-1.5 bg-ublue border-1 border-ublue-stroke rounded-[0.3125rem]">
                      {liveDashboard.averageOrder.isPositive ? (
                        <LucideCircleFadingArrowUp
                          className="drop-shadow-md"
                          size={18}
                          strokeWidth={2}
                          color="white"
                        />
                      ) : (
                        <div className="rotate-180">
                          <LucideCircleFadingArrowUp
                            className="drop-shadow-md"
                            size={18}
                            strokeWidth={2}
                            color="white"
                          />
                        </div>
                      )}
                      <div className="inter-bold text-[0.625rem] text-white drop-shadow-md">
                        {`${liveDashboard.averageOrder.comparison}%`}
                      </div>
                    </div>
                    <div className="inter-bold text-center text-ugray text-[0.625rem] text-gray">
                      last 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}

        {liveDashboard && liveDashboard.distribution !== null ? (
          <div className="flex flex-col gap-2 mx-auto border border-outline-gray-light-4 p-1 pl-3 pr-3 rounded-[0.3125rem]">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="flex flex-row p-2 gap-1.75">
                  <LucidePieChart size={24} color="#6D6D6D" />
                  <div className="inter-extra-bold font-medium text-ugray text-[1rem]">
                    Fit Distribution
                  </div>
                </div>
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square w-full max-w-[250px]"
                >
                  <RadialBarChart
                    data={liveDashboard.distribution}
                    endAngle={180}
                    innerRadius="105%"
                    outerRadius="170%"
                    margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) - 16}
                                  className="inter-medium text-2xl"
                                >
                                  {liveDashboard.distribution[0].m +
                                    liveDashboard.distribution[0].f +
                                    liveDashboard.distribution[0].ux}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 4}
                                  className="inter-medium text-ugray"
                                >
                                  Products
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                    <RadialBar
                      dataKey="m"
                      stackId="a"
                      cornerRadius={5}
                      fill="#70abf5"
                      className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                      dataKey="f"
                      fill="#417cc6"
                      stackId="a"
                      cornerRadius={5}
                      className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                      dataKey="ux"
                      fill="#244976"
                      stackId="a"
                      cornerRadius={5}
                      className="stroke-transparent stroke-2"
                    />
                  </RadialBarChart>
                </ChartContainer>
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
