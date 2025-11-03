
import { Suspense } from 'react';
import { columns, PurchasesTable } from '@/components/purchasesTable'
import { createClient } from '@/utils/supabase/server';
import { Purchase } from "@/lib/types"
import PurchaseChart from '@/components/purchaseChart';
import Loading from '@/components/ui/loading';
import PurchasesMetrics from '@/components/purchasesMetrics';

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
  const purchases = response.data?.map(p => {
    p.date = new Date(p.date || "")
    return p
  }) as Purchase[]
  purchases.sort(({ date: a }, { date: b }) =>
    (new Date(b)).getTime() - (new Date(a)).getTime()
  )

  return (
    <div>
      {purchases
        ? (
          <>
            {/* <PurchaseChart purchases={purchases} /> */}
            <PurchasesTable columns={columns} data={purchases} />
          </>
        )
        : null}
    </div>
  )
}
