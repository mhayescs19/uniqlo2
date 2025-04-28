import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param request
 * @returns payload = {
 *    orders: [
 *        size: (number)
 *    ],
 *    type: (enum: max, min)
 * }
 */
async function getOrderMetrics(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");
  const limit = searchParams.get("limit");

  console.log(type);
  console.log(limit);

  const payload = {
    type: type,
    limit: limit,
  };

  return NextResponse.json(payload);
}

export const GET = getOrderMetrics;
