export function createBill(bill: Bill) {
  let bills: Bill[]

  try {
    const data = localStorage.getItem('bills')
    const parsedData = JSON.parse(data || '')
    bills = parsedData.document
  } catch {
    bills = []
  }

  console.log(bills, bill)

  bills.push(bill)

  localStorage.setItem('bills', JSON.stringify({ document: bills }))
}
