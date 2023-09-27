export function saveBills(board: Board) {
  let documents: Bill[] = []

  board.columns.forEach(({ bills, id }) => {
    bills.forEach((bill) => documents.push({ ...bill, status: id }))
  })

  localStorage.setItem('bills', JSON.stringify({ documents }))
}
