import { useBoardStore } from '@/app/store'
import { DropResult } from '@hello-pangea/dnd'

interface IProps {
  board: Board,
  result: DropResult
}

function useRearrangeColumns({ board, result }: IProps) {
  const { destination, source } = result

  const entries = Array.from(board.columns.entries())
  const [removed] = entries.splice(source.index, 1)
  entries.splice(destination!.index, 0, removed)

  const rearrangedColumns = new Map(entries)

  return { ...board, columns: rearrangedColumns }
}

export default useRearrangeColumns
