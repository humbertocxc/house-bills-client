interface Board {
  columns: Map<TypedColumn, Column>
}

type TypedColumn = 'paid' | 'fixed' | 'variable' | string

interface Column {
  id: TypedColumn,
  bills: Bill[],
}

interface Bill {
  $id: string,
  $purchaseDate: Date,
  dueDate: Date,
  status: TypedColumn,
  title: string,
  description?: string,
  totalValue: number,
  insallmentValue: number,
  totalInstallments: number,
  remainingInstallments: number,  
}
