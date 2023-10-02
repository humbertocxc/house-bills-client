import { Form, Formik } from "formik";
import { v4 as uuid } from "uuid";
import BillSchema from "./schema";
import { defaultValues } from "./defaultValues";
import TextField from "../Form/TextField";
import { createBill } from "../../../utils/createBill";
import { useBoardStore } from "@/app/store";
import DateField from "../Form/DateField";
import PriceInput from "../Form/PriceInput";

interface INewBill {
  columnId: TypedColumn,
  hide: () => void,
}

export default function NewBillForm({ columnId, hide }: INewBill) {
  const getBoard = useBoardStore((state) => state.getBoard)

  const handleSubmit = (data: BillForm) => {
    const parsedTotalValue = data.totalValue.toString().replace(/[^0-9]/g, '')

    const newBill: Bill = {
      ...data,
      totalValue: Number(parsedTotalValue),
      $id: uuid(),
      $purchaseDate: new Date("yyyy-mm-dd"),
      status: columnId,
      remainingInstallments: data.totalInstallments,
      installmentValue: Number(parsedTotalValue) / data.totalInstallments,
    }

    createBill(newBill)
    getBoard()
    hide()
  }

  return (
    <div>
      <Formik
        initialValues={defaultValues}
        validationSchema={BillSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, values }) => (
          <Form className="space-y-2 py-2">
            <TextField autoFocus label="Título da conta" error={errors.title} name="title" type="text" />
            <TextField label="Descrição da conta" error={errors.description} name="description" type="text" />
            <PriceInput name="totalValue" value={String(values.totalValue)} error={errors.totalValue} />
            <DateField label="Prazo de pagamento" name="dueDate" />
            <TextField label="Número de parcelas" error={errors.totalInstallments} name="totalInstallments" type="text" />
            <button className="bg-amber-900/50 hover:bg-amber-900/70 rounded-lg p-2 w-full shadow-md" type="submit">Adicionar Conta</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
