'use client'

import { Purchase } from "@/lib/types";

export default function PurchasesMetrics({ purchases }: { purchases: Purchase[] }) {
  const currentMonth = (new Date()).getMonth()
  const currentPurchases = purchases.filter(({ date }) => (new Date(date)).getMonth() === currentMonth);
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

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-4 sm:gap-10 sm:pb-8">
      <div>
        <h3 className="text-2xl pb-2">
          Fun this Month
        </h3>
        <h2 className="text-4xl">
          ${fun || 0}
        </h2>
      </div>
      <div>
        <h3 className="text-2xl pb-2">
          Living this Month
        </h3>
        <h2 className="text-4xl">
          ${living || 0}
        </h2>
      </div>
    </div>
  )
}
