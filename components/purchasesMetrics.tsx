'use client'

import { Purchase } from "@/lib/types";
import { getMonthYear } from "@/lib/utils";

export default function PurchasesMetrics({ purchases, month }: { purchases: Purchase[], month: string | undefined }) {
  const currentMonth = month || getMonthYear(new Date())
  const currentPurchases = purchases.filter(({ date }) => getMonthYear(date) === currentMonth);
  const typePurchases = Object.groupBy(currentPurchases, ({ type }) => type)
  const {fun, living} = Object.fromEntries(
    Object.entries(typePurchases)
      .map(([type, purchases]) =>
        [
          type,
          purchases.reduce((ac, { amount }) => ac + amount, 0)
        ]
      )
  )

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-4 sm:gap-10 sm:pb-8">
      <div>
        <h3 className="text-2xl pb-2">
          Fun
        </h3>
        <h2 className="text-4xl">
          {formatter.format(fun || 0)}
        </h2>
      </div>
      <div>
        <h3 className="text-2xl pb-2">
          Living
        </h3>
        <h2 className="text-4xl">
          {formatter.format(living || 0)}
        </h2>
      </div>
    </div>
  )
}
