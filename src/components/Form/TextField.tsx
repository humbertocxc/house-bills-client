import { FieldAttributes, FormikErrors, Field } from "formik";

interface ITextField extends FieldAttributes<any> {
  label: string,
  error?: string | FormikErrors<Date>,
}

export default function TextField({ error, label, ...props }: ITextField) {
  return (
    <div className="flex flex-col justify-end pr-1">
      <label htmlFor={props.id || props.name} className="text-sm">{label}</label>
      <Field {...props} className="rounded-lg p-1 outline-none shadow-sm hover:shadow-md focus:shadow-md" />
      {error ? (<span className="text-red-500 text-xs font-semibold">{String(error)}</span>) : null}
    </div>
  )
}
