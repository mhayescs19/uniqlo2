import { insightsComparisonPeriodHours } from "@/config/insights";
import { supabase } from "@/config/supabase";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param request
 * @returns payload = {
 *    orderAverage: (number),
      orderAverageOld: (number),
      orderComparison: (number),
      isPositive: (boolean),
 * }
 */
async function getOrderMetrics(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");

  const metricIntervalStart = new Date(
    Date.now() - insightsComparisonPeriodHours * 60 * 60 * 1000
  ); // start of data to report value

  const comparisonIntervalStart = new Date(
    metricIntervalStart.getMilliseconds() -
      insightsComparisonPeriodHours * 60 * 60 * 1000
  ); // start of data to compare to metric

  try {
    /*
    create or replace function average_order_size(start_time timestamp, end_time timestamp)
    returns numeric
    language sql
    as $$
      select coalesce(sum(order_size), 0) / greatest(count(*), 1)
      from "order"
      where created_at >= start_time
        and created_at < end_time;
    $$;
    */
    const { data: metricData, error: metricError } = await supabase.rpc(
      "average_order_size",
      {
        start_time: metricIntervalStart,
        end_time: new Date().toISOString(),
      }
    );

    if (metricError) throw new Error(metricError.message);

    const { data: comparisonData, error: comparisonError } = await supabase.rpc(
      "average_order_size",
      {
        start_time: comparisonIntervalStart,
        end_time: metricIntervalStart,
      }
    );

    if (comparisonError) throw new Error(comparisonError.message);

    console.log(metricData);
    console.log(comparisonData);

    const percentageChange =
      comparisonData == 0
        ? metricData
        : (metricData - comparisonData) / comparisonData; // if old data is zero and new data

    const isPositive = percentageChange >= 0 ? true : false;

    const payload = {
      orderAverage: metricData,
      orderAverageOld: comparisonData,
      orderComparison: Math.abs(percentageChange) * 100,
      isPositive: isPositive,
    };

    console.log(payload);

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const GET = getOrderMetrics;
