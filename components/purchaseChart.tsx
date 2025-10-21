"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Purchase } from "@/lib/types"

//TODO: Make the purchase types dynamic
const chartConfig = {
  fun: {
    label: "Fun",
    color: "#2563eb",
  },
  living: {
    label: "Living",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function PurchaseChart({ purchases }: { purchases: Purchase[] }) {
  const purchasesByMonth = Object.groupBy(purchases, ({ date }) => (new Date(date)).getMonth())
  const monthlyPurchasesAgg = Object.entries(purchasesByMonth).map(([ month, purchases ]) => {
    if (!purchases) return { month }

    const { fun, living } = Object.groupBy(purchases, ({ type }) => type)
    return {
      month,
      label: monthAbbreviations[parseInt(month)],
      fun: fun?.reduce((ac, { amount }) => ac + amount, 0),
      living: living?.reduce((ac, { amount }) => ac + amount, 0)
    }
  })

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full pb-4">
      <BarChart accessibilityLayer data={monthlyPurchasesAgg}>
        <CartesianGrid vertical={false} />
         <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => monthAbbreviations[value]}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent labelKey="false" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="fun" fill="#2563eb" radius={4} />
        <Bar dataKey="living" fill="#60a5fa" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
