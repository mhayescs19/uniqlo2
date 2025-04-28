import { NextResponse } from "next/server";
import { supabase } from "@/config/supabase";
/**
 *
 * @returns payload = {
 *    productCount: (number)
 * }
 */
async function getProductCount() {
  try {
    const { data, error } = await supabase.from("product").select("count");

    if (error) throw new Error(error.message);

    const payload = {
      productCount: data![0].count,
    };

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const GET = getProductCount;
