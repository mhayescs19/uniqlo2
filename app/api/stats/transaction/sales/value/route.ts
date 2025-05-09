import { NextResponse } from "next/server";
import { supabase } from "@/config/supabase";

async function getTotalSales() {
  try {
    /*
      create or replace function total_sales_to_date()
      returns numeric
      language sql
      as $$
        select sum(p.price)
        from transaction t
        join product p on t.product_id = p.id;
      $$;
    */
    const { data, error } = await supabase.rpc("total_sales_to_date"); // invokes custom sql function

    console.log(data);

    if (error) throw new Error(error.message);

    const payload = {
      totalSales: data.toFixed(2),
    };

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const GET = getTotalSales;
