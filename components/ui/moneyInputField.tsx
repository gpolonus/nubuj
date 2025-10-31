import { Field, FieldLabel } from "./field";
import { Input } from "./input";

export default function MoneyInputField({
  value,
  onChange,
  size
}: {
  value: string,
  onChange: (amount: string) => void,
  size?: string
}) {
  const isLarge = size === 'large'
  return (
    <Field>
      <FieldLabel htmlFor="amount" className={isLarge ? 'text-6xl text-center' : ''}>
        Amount
      </FieldLabel>
      <Input
        value={value}
        type="number"
        className={isLarge ? 'text-8xl' : ''}
        onChange={e => {
          onChange(e.target.value.replace(/[^0-9\.]/g, ''))
        }}
        onBlur={() => {
          if (!value) {
            onChange('0.00')
            return;
          }

          let dollars = '0', cents = '00';
          if ((value.match(/\./g) || []).length > 1) {
            const numberValue = value.replace(/[^0-9]/g, '')
            dollars = numberValue.slice(0, -2)
            cents = numberValue.slice(-2)
          } else {
            [dollars, cents = '00'] = value.split('.');
            cents = cents.slice(0,2).padEnd(2, '0')
          }

          dollars = dollars.replace(/^0*/, '')

          onChange(`${dollars || '0'}.${cents}`)
        }}
        id="amount"
        placeholder="0.00"
        required
      />
    </Field>
  )
}
