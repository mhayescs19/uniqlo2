import { NextResponse } from "next/server";
import { supabase } from "@/config/supabase";
/**
 *
 * @param request list of product uuids
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

  const { data, error } = await supabase
    .from("product")
    .select("price")
    .in("id", tags); // find all products that have the tag ids

  if (error) throw error;

  let subTotal = 0;
  const prices = data!;
  prices.forEach((item) => {
    subTotal += item.price;
  });

  console.log(subTotal);

  return NextResponse.json(subTotal);
}

export const POST = createSubtotal;
