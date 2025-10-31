
export type PurchaseType = 'living' | 'fun';

export type Purchase = {
  id: string | null
  date: Date
  amount: number
  type: PurchaseType
  note: string
  recipient: string
};
