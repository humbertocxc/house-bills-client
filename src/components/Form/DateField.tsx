import React from 'react'
import { useField } from 'formik'

interface DateFieldProps {
  label: string,
  id?: string,
  name: string,
}

function DateField({ label, ...props }: DateFieldProps) {
  const [field, meta] = useField(props)

  return (
    <div className="flex flex-col justify-end pr-1">
      <label htmlFor={props.id || props.name} className="text-sm">
        {label}
      </label>
      <input
        type="date"
        {...field}
        {...props}
        className="rounded-lg p-1 shadow-sm hover:shadow-md focus:shadow-md outline-none"
      />
      {meta.error && meta.touched && <div className="text-red-500 text-sm mt-2">{meta.error}</div>}
    </div>
  )
}

export default DateField
