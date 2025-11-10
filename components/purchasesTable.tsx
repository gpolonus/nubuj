"use client"

import {
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { Purchase } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deletePurchase } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { getMonthYear } from "@/lib/utils"
import PurchasesMetrics from "./purchasesMetrics"
import { useState } from "react"
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "date",
    header: "Date",
    filterFn(row, columnId, filterValue) {
      const filterDate = new Date(filterValue);
      const date = new Date(row.getValue("date")?? "")
      console.log('recipient', row.getValue('recipient'))
      console.log('filterValue', filterValue)
      console.log('filterDate', filterDate)
      console.log('date', date)
      return date.getMonth() === filterDate.getMonth() && date.getFullYear() === filterDate.getFullYear()
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return date?.toDateString()
    }
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
    cell: ({ row }) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.getValue('amount'))
    }
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const purchase = row.original
      const {
        id,
        date,
        amount,
        type,
        note,
        recipient,
      } = purchase

      const searchParamsData = {
        id,
        date,
        amount,
        purchaseType: type,
        note,
        recipient,
      }

      const searchParams = Object.entries(searchParamsData).map(([key, value]) => `${key}=${value}`).join('&')

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deletePurchase(purchase)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => redirect(`/?${searchParams}`)}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PurchasesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [
      {
        id: 'date',
        value: getMonthYear(new Date())
      }
    ]
  )

  console.log('initial data length', data.length)
  const monthFilterValue = columnFilters[0].value as string
console.log('monthFilterValue', monthFilterValue)

  const monthFilterOptions = Object.keys(Object.groupBy(data as Purchase[], (row) => {
    const date = row.date
    return getMonthYear(date)
  }))
  monthFilterOptions.sort((a, b) => {
    const dateB = new Date(b).getTime()
    const dateA = new Date(a).getTime()
    return dateA - dateB;
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  console.log('row length', table.getRowModel().rows?.length)

  return (
    <>
      <PurchasesMetrics purchases={data as Purchase[]} month={monthFilterValue} />
      <div className="flex items-center py-4">
        <Select
            value={table.getColumn("date")?.getFilterValue() as string || ""}
            onValueChange={(value) =>
              table.getColumn("date")?.setFilterValue(value)
            }
          >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {monthFilterOptions.map((month) => (
              <SelectItem key={month} value={month}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-hidden rounded-md border mb-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
