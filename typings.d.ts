interface Board {
  columns: Map<TypedColumn, Column>
}

type TypedColumn = 'paid' | 'fixed' | 'variable'

interface Column {
  id: TypedColumn,
  bills: Bill[],
}

interface Bill extends Models.Document {
  $id: string,
  $purchaseDate: Date,
  dueDate: Date,
  status: string,
  title: string,
  description?: string,
  totalValue: number,
  insallmentValue: number,
  totalInstallments: number,
  remainingInstallments: number,  
}
