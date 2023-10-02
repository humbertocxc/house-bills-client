interface IColumnHeader {
  bills: Bill[],
  name: TypedColumn
}

const idToColumnText: {[key in TypedColumn]: string} = {
  fixed: "Dispesas Fixas",
  variable: "Dispesas Variáveis",
  paid: "Contas Pagas",
}

export default function ColumnHeader({ bills, name }: IColumnHeader) {
  const summedBillsCents = bills.reduce((sum, bill) => sum + bill.installmentValue, 0)

  const summedBills = (summedBillsCents / 100).toFixed(2)

  const parsedSums = summedBills.replace('.', ',')

  return (
    <h2 className="flex justify-between items-center font-semibold text-lg p-2">
      {idToColumnText[name]}
      <span className={`text-sm font-semibold`}>R$ {parsedSums}</span>
    </h2>
  )
}
