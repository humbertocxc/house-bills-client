import { FieldAttributes, FormikErrors, Field } from "formik";

interface ITextField extends FieldAttributes<any> {
  label: string,
  error?: string | FormikErrors<Date>,
}

export default function TextField({ error, label, ...rest }: ITextField) {
  return (
    <div className="flex flex-col justify-end pr-1">
      <p className="text-sm">{label}</p>
      <Field {...rest} className="rounded-lg p-1 outline-none" />
      {error ? (<span className="text-red-500 text-xs font-semibold">{String(error)}</span>) : null}
    </div>
  )
}
