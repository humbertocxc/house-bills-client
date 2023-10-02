export function deleteBill(id: string) {
  let bills: Bill[]

  try {
    const data = localStorage.getItem('bills')
    const parsedData = JSON.parse(data || '')
    bills = parsedData.document
  } catch {
    bills = []
  }

  const bill = bills.find(({ $id }) => $id === id)
  const billId = bills.indexOf(bill!)
  bills.splice(billId, 1)

  localStorage.setItem('bills', JSON.stringify({ document: bills }))
}
