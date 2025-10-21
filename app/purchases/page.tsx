
import { Suspense } from 'react';
import { PurchasesTable } from '@/components/purchasesTable'
import { createClient } from '@/utils/supabase/server';
import { Purchase } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import PurchaseChart from '@/components/purchaseChart';
import Loading from '@/components/ui/loading';
import PurchasesMetrics from '@/components/purchasesMetrics';

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
]

export default async function Purchases() {
  return (
    <Suspense fallback={<Loading />}>
      <PurchasesData />
    </Suspense>
  );
}

async function PurchasesData() {
  const supabase = await createClient();
  const response = await supabase.from("Purchases").select();
  const purchases = response.data as Purchase[]
  return (
    <div>
      {purchases
        ? (
          <>
            <PurchasesMetrics purchases={purchases} />
            <PurchaseChart purchases={purchases} />
            <PurchasesTable columns={columns} data={purchases} />
          </>
        )
        : null}
    </div>
  )
}
