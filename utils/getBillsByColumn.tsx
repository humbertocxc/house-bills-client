export const getBillsByColumn = () => {
  const data = JSON.parse(localStorage.getItem('bills') || '')
  const oldBills = data.documents

  const columns = oldBills.reduce((acc: Bill, bill: Bill) => {
    if(!acc.get(bill.status)) {
      acc.set(bill.status, {
        id: bill.status,
        bills: []
      })
    }

    acc.get(bill.status)!.bills.push({
      $id: bill.$id,
      purchaseDate: bill.$purchaseDate,
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
  }, new Map<TypedColumn, Column>())

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
