import { XMarkIcon } from "@heroicons/react/24/solid";
import { Form, Formik } from "formik";
import { v4 as uuid } from "uuid";
import BillSchema from "./schema";
import { defaultValues } from "./defaultValues";
import Field from "../Field";
import { createBill } from "../../../utils/createBill";
import { useBoardStore } from "@/app/store";

interface INewBill {
  columnId: string,
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
    <div className="p-2 bg-amber-900/10 rounded-md">
      <div className="flex flex-1 justify-end">
        <button type="button" onClick={hide}>
          <XMarkIcon className="w-4 h-4 m-2" />
        </button>
      </div>
      <Formik
        initialValues={defaultValues}
        validationSchema={BillSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="gap-3 grid grid-cols-2">
            <Field className="col-span-3" label="Título da conta" error={errors.title} name="title" type="text" />
            <Field className="col-span-3" label="Descrição da conta" error={errors.description} name="description" type="text" />
            <Field label="Prazo de pagamento" error={errors.dueDate} name="dueDate" type="date" />
            <Field label="Valor total" error={errors.totalValue} name="totalValue" type="number" />
            <Field label="Número de parcelas" error={errors.totalInstallments} name="totalInstallments" type="number" />
            <button className="bg-amber-900/50 hover:bg-amber-900/60 rounded-lg py-2" type="submit">Adicionar Conta</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
