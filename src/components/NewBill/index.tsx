import { Form, Formik } from "formik";
import { v4 as uuid } from "uuid";
import BillSchema from "./schema";
import { defaultValues } from "./defaultValues";
import TextField from "../TextField";
import { createBill } from "../../../utils/createBill";
import { useBoardStore } from "@/app/store";

interface INewBill {
  columnId: TypedColumn,
  hide: () => void,
}

export default function NewBillForm({ columnId, hide }: INewBill) {
  const getBoard = useBoardStore((state) => state.getBoard)

  const handleSubmit = (data: BillForm) => {
    const newBill: Bill = {
      ...data,
      $id: uuid(),
      $purchaseDate: new Date("yyyy-mm-dd"),
      status: columnId,
      remainingInstallments: data.totalInstallments,
      insallmentValue: data.totalValue / data.totalInstallments,
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
        {({ errors }) => (
          <Form className="space-y-2 py-2">
            <TextField label="Título da conta" error={errors.title} name="title" type="text" />
            <TextField label="Descrição da conta" error={errors.description} name="description" type="text" />
            <TextField label="Prazo de pagamento" error={errors.dueDate} name="dueDate" type="date" />
            <TextField label="Valor total" error={errors.totalValue} name="totalValue" type="number" />
            <TextField label="Número de parcelas" error={errors.totalInstallments} name="totalInstallments" type="number" />
            <button className="bg-amber-900/50 hover:bg-amber-900/70 rounded-lg p-2 w-full" type="submit">Adicionar Conta</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
