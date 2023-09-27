export function saveBills(board: Board) {
  let document: Bill[] = []

  board.columns.forEach(({ bills, id }) => {
    bills.forEach((bill) => document.push({ ...bill, status: id }))
  })

  localStorage.setItem('bills', JSON.stringify({ document }))
}
