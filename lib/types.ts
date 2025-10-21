
export type PurchaseType = 'living' | 'fun';

export type Purchase = {
  id?: string
  date: Date,
  amount: number,
  type: PurchaseType,
  note: string,
  recipient: string,
  user_id?: string
};
