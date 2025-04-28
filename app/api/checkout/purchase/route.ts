import { NextResponse } from "next/server";
import { supabase } from "@/config/supabase";
/**
 *
 * @param request list of product uuids
 * @returns payload = {
 *      order: (order)
 * }
 */
async function createPurchase(request: Request) {
  const body = await request.json();

  const { tagIds } = body;
  console.log(tagIds);

  if (!Array.isArray(tagIds)) {
    console.log("not an array");

    return NextResponse.json(
      { error: "Array payload is required. Expected { tagIds: [] }" },
      { status: 400 }
    );
  }

  tagIds.forEach((item) => {
    if (item !== "number") {
      return NextResponse.json(
        { error: "Request body is missing array element with type number." },
        { status: 400 }
      );
    }
  });

  console.log("tagID: " + tagIds[0]);
  const tags: number[] = tagIds;

  try {
    // create order to track purchase group of all items
    const { data, error } = await supabase
      .from("order")
      .insert({
        order_size: tags.length,
      })
      .select(); // insert and return the data

    if (error) throw new Error(error.message);

    console.log(data);

    const newOrder = data![0];

    const order_pk = newOrder.id; // obtain order_id

    // populate the individual items into the transaction
    tags.forEach(async (num) => {
      const { error } = await supabase.from("transaction").insert({
        product_id: num,
        order_id: order_pk,
      });

      if (error) throw new Error(error.message);
    });

    const payload = {
      order: newOrder,
    };

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const POST = createPurchase;
