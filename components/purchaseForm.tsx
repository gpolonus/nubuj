'use client';

import * as React from "react"
import { FieldGroup, FieldSet, FieldLegend, Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date';
import { Button } from "./ui/button";
import { PurchaseType } from "@/lib/types";
import { postPurchase, updatePurchase } from "@/utils/supabase/server";
import MoneyInputField from "./ui/moneyInputField";
import { useSearchParamPurchase } from "@/hooks/use-search-param-purchase";

export default function PurchaseForm() {
  const searchParamPurchase = useSearchParamPurchase();
  const [purchaseType, setType] = React.useState(searchParamPurchase.type || "");
  const [recipient, setRecipient] = React.useState(searchParamPurchase.recipient || "");
  const [displayAmount, setDisplayAmount] = React.useState(searchParamPurchase.amount?.toString() || "");
  const [note, setNote] = React.useState(searchParamPurchase.note || "");
  const [date, setDate] = React.useState(searchParamPurchase.date || new Date());

  const [isPending, setPending] = React.useState(false);

  async function submitHandler (event: React.MouseEvent) {
    event.preventDefault()
    setPending(true)

    const purchaseData = {
      id: searchParamPurchase.id,
      recipient,
      amount: parseFloat(displayAmount),
      type: (purchaseType as PurchaseType),
      note,
      date
    }
console.log('submitted', purchaseData, searchParamPurchase.id)
    if (searchParamPurchase.id) {
      await updatePurchase(purchaseData);
    } else {
      await postPurchase(purchaseData)
    }

    setPending(false)
  }

  return (
    <div>
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Review Your Entry</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="recipient">
                  Purchase Type
                </FieldLabel>
                <Select value={purchaseType || undefined} onValueChange={setType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fun">Fun</SelectItem>
                    <SelectItem value="living">Living</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="recipient">
                  Recipient
                </FieldLabel>
                <Input
                  value={recipient || undefined}
                  onChange={e => setRecipient(e.target.value)}
                  id="recipient"
                  placeholder="Recipient"
                  required
                />
              </Field>
              <MoneyInputField value={displayAmount} onChange={setDisplayAmount} />
              <Field>
                <FieldLabel htmlFor="date">
                  Date
                </FieldLabel>
                <DatePicker
                  date={date}
                  setDate={setDate}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="note">
                  Note
                </FieldLabel>
                <Input
                  id="note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Note"
                />
              </Field>
              <div className="text-center sm:text-left">
                <Button size="xl" onClick={submitHandler} disabled={isPending}>Submit</Button>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
