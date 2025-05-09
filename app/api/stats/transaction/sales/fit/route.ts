import { supabase } from "@/config/supabase";
import { NextResponse } from "next/server";

interface Fit {
  fit: string;
  count: number;
}
/**
 * @returns payload = {
 *      fits: [
 *          {
 *            fit: (enum: m,f,ux),
 *            count: number
 *          }
 *      ]
 * }
 */
async function getFitDistribution() {
  try {
    /*
    create or replace function count_products_by_fit_type()
    returns table (fit text, count bigint)
    language sql
    as $$
        SELECT fit, COUNT(*) AS count
        FROM product
        WHERE fit IN ('m', 'f', 'ux')
        GROUP BY fit;
    $$;
    */
    const { data, error } = await supabase.rpc("count_products_by_fit_type");

    if (error) throw new Error(error.message);

    const fits: Fit[] = data;

    const chartData = [
      {
        month: "May",
        m: fits[0].count,
        f: fits[1].count,
        ux: fits[2].count,
      },
    ];

    const payload = {
      fits: chartData,
    };

    console.log(payload);

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const GET = getFitDistribution;
