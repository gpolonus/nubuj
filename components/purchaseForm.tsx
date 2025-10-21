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
import { postPurchase } from "@/utils/supabase/server";
import MoneyInputField from "./ui/moneyInputField";

export default function PurchaseForm({
    purchaseType: defaultPurchaseType,
    amount: defaultAmount,
    recipient: defaultRecipient
  }: {
    purchaseType: string,
    amount: string,
    recipient: string
  }) {
  const [purchaseType, setType] = React.useState(defaultPurchaseType);
  const [recipient, setRecipient] = React.useState(defaultRecipient);
  const [displayAmount, setDisplayAmount] = React.useState(defaultAmount);
  const [note, setNote] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  const [isPending, setPending] = React.useState(false);

  async function submitHandler (event: React.MouseEvent) {
    event.preventDefault()
    setPending(true)
console.log({ displayAmount, amount: parseFloat(displayAmount) })
    const purchase = {
      recipient,
      amount: parseFloat(displayAmount),
      type: (purchaseType as PurchaseType),
      note,
      date
    }

    await postPurchase(purchase)

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
                <Select value={purchaseType} onValueChange={setType}>
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
                  value={recipient}
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
