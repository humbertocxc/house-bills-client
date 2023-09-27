import { FieldAttributes, FormikErrors, Field as FormikField } from "formik";

interface IField extends FieldAttributes<any> {
  label: string,
  error?: string | FormikErrors<Date>,
}

export default function Field({ error, label, ...rest }: IField) {
  return (
    <div className="flex flex-col justify-end pr-1">
      <p>{label}</p>
      <FormikField {...rest} className="rounded-lg p-1" />
      {error ? (<span className="text-red-500 text-xs font-semibold">{String(error)}</span>) : null}
    </div>
  )
}
