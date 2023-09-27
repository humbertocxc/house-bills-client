import { DropResult } from '@hello-pangea/dnd'

interface IProps {
  board: Board,
  result: DropResult
}

function useRearrangeCards({ board, result }: IProps) {
  const { destination, source } = result

  const columns = Array.from(board.columns)
  const startColId = columns[Number(source.droppableId)]
  const endColId = columns[Number(destination!.droppableId)]
  const startCol: Column = { id: startColId[0], bills: startColId[1].bills }
  const endCol: Column = { id: endColId[0], bills: endColId[1].bills }

  const newBills = startCol.bills
  const [billMoved] = newBills.splice(source.index, 1)

  const newCol: Column = { id: startCol.id, bills: newBills }
  const newColumns = new Map(board.columns)

  if (startCol.id === endCol.id) {
    newBills.splice(destination!.index, 0, billMoved)
    newColumns.set(startCol.id, newCol)
    return { ...board, columns: newColumns }
  }

  const endBills = Array.from(endCol.bills)
  endBills.splice(destination!.index, 0, billMoved)
  newColumns.set(startCol.id, newCol)
  newColumns.set(endCol.id, { id: endCol.id, bills: endBills })

  return { ...board, columns: newColumns }
}

export default useRearrangeCards
