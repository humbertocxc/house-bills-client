import { useField, useFormikContext } from 'formik'
import React from 'react'
import CurrencyInput from 'react-currency-input-field'

interface IPriceInput {
  name: string,
  value: string,
  error?: string,
}

export default function PriceInput({ error, name, value }: IPriceInput) {
  const { setFieldValue } = useFormikContext()

  const handleChangeField = (newValue?: string) => {
    setFieldValue(name, newValue)
  }

  return (
    <div className="flex flex-col justify-end pr-1">
      <label htmlFor={name} className="text-sm">Valor da compra</label>
      <CurrencyInput
        name={name}
        value={value}
        onValueChange={handleChangeField}
        prefix="R$ "
        allowDecimals={true}
        decimalScale={2}
        fixedDecimalLength={2}
        placeholder="R$ 0,00"
        className="rounded-lg p-1 shadow-sm hover:shadow-md focus:shadow-md outline-none"
      />
      {error ? (<span className="text-red-500 text-xs font-semibold">{String(error)}</span>) : null}
    </div>
  )
}
