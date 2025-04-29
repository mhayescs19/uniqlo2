import { NextResponse } from "next/server";
import { supabase } from "@/config/supabase";
import { SITE_BASE_URL } from "@/config/config";
/**
 *
 * @param request list of product uuids
 * @returns payload = {
 *    total: (number)
 * }
 */
async function createSubtotal(request: Request) {
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
  let subTotal = 0;
  try {
    // todo: alternative is using values and join sql query to preserve duplicates instead of searching each id in loop
    // use case: orders are no more than 10-15 items so ok
    for (const id of tags) {
      const { data, error } = await supabase
        .from("product")
        .select("price")
        .eq("id", id);

      console.log(data![0].price);

      if (error) throw new Error(error.message);

      subTotal += data![0].price;
    }

    console.log("things subtotaled");
    console.log(subTotal);

    const webhookPayload = {
      tagIds: tags,
      total: subTotal,
    };

    const webhookReponse = await fetch(
      `${SITE_BASE_URL}/api/checkout/purchase/details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      }
    );

    if (!webhookReponse.ok) {
      const val = await webhookReponse.json();

      console.log(val);
    }

    const payload = {
      total: subTotal,
    };

    console.log(payload);

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export const POST = createSubtotal;
