import { PurchaseType } from "@/lib/types";
import { useSearchParams } from "next/navigation"

export function useSearchParamPurchase() {
  const searchParams = useSearchParams()

  const dateParam = searchParams.get('date')
  const date = dateParam ? new Date(dateParam) : null
  const amountParam = searchParams.get('amount')
  const amount = amountParam ? parseFloat(amountParam) : null
  const typeParam = searchParams.get('purchaseType')
  const type = typeParam && ['living', 'fun'].includes(typeParam)
    ? typeParam as PurchaseType
    : null

  return {
      id: searchParams.get('id'),
      date,
      amount,
      type,
      note: searchParams.get('note'),
      recipient: searchParams.get('recipient')
  };
}
