import { NextResponse } from "next/server";

/**
 * get sales insights either sales to date or sales in a given period interval
 * request params:
 * period: interval in hours to squash sales into a finite statistic (eg. 24 would condense the transaction history into sales datapoints every 24 hrs)
 * limit: number of previous days from now for sales statistics
 * @param request
 * @returns payload = {
 *      transactions: [
 *          period: (date)
 *          sales: (number)
 *      ]
 * }
 */
async function getTransactionSales(request: Request) {
  const { searchParams } = new URL(request.url);

  const period = searchParams.get("period");
  const limit = searchParams.get("limit");

  const payload = {
    period: period,
    limit: limit,
  };

  return NextResponse.json(payload);
}

export const GET = getTransactionSales;
