
import { PurchasesTable } from '@/components/purchasesTable'
import { createClient } from '@/utils/supabase/server';
import { Purchase } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import PurchaseChart from '@/components/purchaseChart';

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
  const supabase = await createClient();
  const response = await supabase.from("Purchases").select();
  const purchases = response.data as Purchase[]

  return (
    // TODO: do data streaming here?
    <div>
      {purchases
        ? <PurchasesTable columns={columns} data={purchases} />
        : null}
      <PurchaseChart purchases={purchases} />
    </div>
  );
}
