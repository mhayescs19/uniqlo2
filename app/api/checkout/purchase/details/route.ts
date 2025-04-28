import { supabase } from "@/config/supabase";
import { NextResponse } from "next/server";

async function getPurchaseDetails() {
  try {
    const { data, error } = await supabase
      .from("subtotal_webhook")
      .select("product_ids")
      .order("id", { ascending: false })
      .limit(1);

    if (error) throw new Error(error.message);

    const productIds = data![0].product_ids;

    console.log(productIds[0]);

    const payload = {
      productIds: productIds[0],
    };

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

async function updatePurchaseDetails(request: Request) {
  console.log("in webhook upsert");
  const body = await request.json();
  console.log("in webhook upsert");
  const { tagIds } = body;
  console.log(tagIds);

  try {
    // update data in first slot of db
    const { data, error } = await supabase
      .from("subtotal_webhook")
      .upsert({ id: 1, product_ids: tagIds });

    if (error) throw new Error(error.message);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const GET = getPurchaseDetails;
export const POST = updatePurchaseDetails;
