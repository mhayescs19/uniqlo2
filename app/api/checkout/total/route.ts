import { NextResponse } from "next/server";

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

  let subTotal = 0;
  tagIds.forEach((item) => {
    subTotal += item;
  });

  return NextResponse.json(subTotal);
}

export const POST = createSubtotal;
