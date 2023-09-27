interface Board {
  columns: Map<TypedColumn, Column>
}

type TypedColumn = 'paid' | 'fixed' | 'variable' | string

interface Column {
  id: TypedColumn,
  bills: Bill[],
}

interface BillForm {
  dueDate: Date,
  title: string,
  description?: string,
  totalValue: number,
  totalInstallments: number,
}

interface Bill extends BillForm {
  $id: string,
  $purchaseDate: Date,
  status: TypedColumn,
  insallmentValue: number,
  remainingInstallments: number,  
}
