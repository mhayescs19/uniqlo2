import { supabase } from "@/config/supabase";
import { NextResponse } from "next/server";

async function getPurchaseDetails() {
  try {
    const { data, error } = await supabase
      .from("subtotal_webhook")
      .select()
      .order("id", { ascending: false })
      .limit(1);

    if (error) throw new Error(error.message);

    console.log("subtotal webhook");
    console.log(data);

    const subTotal = data![0].subtotal;

    console.log(subTotal);

    const payload = {
      price: subTotal,
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
  const { tagIds, total } = body;
  console.log(tagIds);

  try {
    // update data in first slot of db
    const { data, error } = await supabase
      .from("subtotal_webhook")
      .upsert({ id: 1, product_ids: tagIds, subtotal: total });

    if (error) throw new Error(error.message);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const GET = getPurchaseDetails;
export const POST = updatePurchaseDetails;
