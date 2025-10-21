'use client';

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import PurchaseForm from './purchaseForm';
import { Button } from './ui/button';
import Link from 'next/link';
import MoneyInputField from './ui/moneyInputField';
import { Field, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const makeQueryString = (values: {[k: string]: string}) => {
  const searchParams = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    searchParams.set(key, value)
  })
  return '?' + searchParams.toString();
}

export default function PurchaseEntrySequence() {
  const searchParams = useSearchParams()
  const purchaseType = searchParams.get('purchaseType')
  const amount = searchParams.get('amount')
  const recipient = searchParams.get('recipient')
  const [displayAmount, setDisplayAmount] = React.useState("");
  const [recipientInputValue, setRecipient] = React.useState("");

  const purchaseTypes = ['fun', 'living'];

  let view;
  if (!purchaseType) {
    view = (
      <div className='fixed left-0 top-0 w-full p-8 pt-28 sm:p-28 h-screen flex flex-col gap-2 sm:gap-8'>
        {purchaseTypes.map(type => (
          <div key={type} className='flex-1 w-full text-center'>
            <Link href={makeQueryString({ purchaseType: type })}>
              <Button className='h-full w-full text-8xl bg-white text-black border-4 border-black hover:bg-input sm:w-1/2'>
                {type}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    )
  } else if (!amount) {
    view = (
      <div>
        <MoneyInputField size="large" value={displayAmount} onChange={setDisplayAmount} />
        <Link className="block pt-4 text-center" href={makeQueryString({ purchaseType, amount: displayAmount })}>
          <Button size="xl">Next</Button>
        </Link>
      </div>
    )
  } else if (!recipient) {
    view = (
      <Field>
        <FieldLabel htmlFor="recipient" className="text-6xl text-center">
          Recipient
        </FieldLabel>
        <Input
          value={recipientInputValue}
          className="text-2xl"
          onChange={e => setRecipient(e.target.value)}
          id="recipient"
          placeholder="Name"
          required
        />
        <Link className="block pt-4 text-center" href={makeQueryString({ purchaseType, amount, recipient: recipientInputValue })}>
          <Button size="xl">Next</Button>
        </Link>
      </Field>
    )
  } else {
    view = <PurchaseForm purchaseType={purchaseType} amount={amount} recipient={recipient} />
  }

  return view
}
