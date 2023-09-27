export const getBillsByColumn = () => {
  type IBills = Bill[]
  let oldBills: IBills

  try {
    const data = localStorage.getItem('bills')
    const parsedData = JSON.parse(data || '')
    oldBills = parsedData.document
  } catch {
    oldBills = []
  }

  const columns = oldBills.reduce<Map<TypedColumn, Column>>((acc, bill) => {
    if(!acc.get(bill.status)) {
      acc.set(bill.status, {
        id: bill.status,
        bills: []
      })
    }

    acc.get(bill.status)!.bills.push({
      $id: bill.$id,
      $purchaseDate: bill.$purchaseDate,
      dueDate: bill.dueDate,
      status: bill.status,
      title: bill.title,
      totalValue: bill.totalValue,
      insallmentValue: bill.insallmentValue,
      totalInstallments: bill.totalInstallments,
      remainingInstallments: bill.remainingInstallments,
      ...( bill.description && {description: bill.description})
    })

    return acc
  }, new Map<TypedColumn, Column>)

  const columnTypes: TypedColumn[] = ["fixed", "paid", "variable"]

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        bills: []
      })
    }
  }

  return { columns }
}
