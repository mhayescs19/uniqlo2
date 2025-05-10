import { supabase } from "@/config/supabase";
import { NextResponse } from "next/server";

export interface Product {
  id: number;
  created_at: Date;
  price: number;
  name: string;
  fit: string;
}

async function getPurchaseDetails() {
  try {
    const { data, error } = await supabase
      .from("subtotal_webhook")
      .select()
      .order("id", { ascending: false })
      .limit(1);

    if (error) throw new Error(error.message);

    // subtotal_webhook shape is id product_ids, subtotal

    console.log("subtotal webhook");

    console.log(data);

    const subTotal = data![0].subtotal;
    console.log("subtotal product ids");
    const productIds = data![0].product_ids;
    console.log(productIds);

    let products: Product[] = [];

    try {
      for (const id of productIds) {
        // console.log("check id");
        // console.log(id);
        const { data, error } = await supabase
          .from("product")
          .select()
          .eq("id", id);

        // console.log("individual product");
        // console.log(data);
        const newProduct: Product = data![0];

        products.push(newProduct);

        if (error) throw new Error(error.message);
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    console.log(subTotal);

    const payload = {
      order: {
        productList: products,
        total: subTotal.toFixed(2),
      },
    };

    console.log(payload);

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
