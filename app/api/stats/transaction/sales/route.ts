import { supabase } from "@/config/supabase";
import { NextResponse } from "next/server";

/**
 * get sales insights by sales to date or sales in a given period
 *
 * @param period: interval in hours to squash sales into a finite statistic (eg. 24 would condense the transaction history into sales datapoints every 24 hrs)
 * @param limit: number of previous days from now for sales statistics
 * @param request .../sales?period={}
 * @returns payload = {
 *       salesSummary: [
 *                       {
 *                          day: (date),
 *                          sales_value: (number)
 *                       }
 *                     ]
 * }
 */
async function getTransactionSales(request: Request) {
  const { searchParams } = new URL(request.url);

  const days = searchParams.get("period");
  const daysInt = parseInt(days!);

  console.log(days);

  try {
    const { data, error } = await supabase.rpc("get_daily_sales_value", {
      d: daysInt,
    });

    if (error) throw new Error(error.message);

    const payload = {
      chartData: data,
    };

    console.log(payload);

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const GET = getTransactionSales;
