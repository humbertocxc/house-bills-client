"use client"
import { useBoardStore } from "@/app/store";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";
import useWindowSize from "@/hooks/useWindowSize";

export default function Board() {
  const [board, getBoard, setBoardState] = useBoardStore(
    (state) => [state.board, state.getBoard, state.setBoardState]
  )

  const isMobile = useWindowSize();

  const rearrangeColumns = ({ destination, source }: DropResult) => {
    const entries = Array.from(board.columns.entries())
    const [removed] = entries.splice(source.index, 1)
    entries.splice(destination!.index, 0, removed)

    const rearrangedColumns = new Map(entries)
    setBoardState({ ...board, columns: rearrangedColumns })
  }

  const rearrangeCards = ({ source, destination }: DropResult) => {
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
      setBoardState({ ...board, columns: newColumns })
      return
    }

    const endBills = Array.from(endCol.bills)
    endBills.splice(destination!.index, 0, billMoved)
    newColumns.set(startCol.id, newCol)
    newColumns.set(endCol.id, { id: endCol.id, bills: endBills })

    setBoardState({ ...board, columns: newColumns })
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) return
    if (source.index === destination.index && source.droppableId === destination.droppableId) return
    if (type === 'column') {
      rearrangeColumns(result)
      return
    }

    rearrangeCards(result)
  }

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction={isMobile ? 'vertical' : 'horizontal'} type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto pb-20"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              Array.from(board.columns.entries()).map(([id, column], index) => (
                <Column key={id} id={id} bills={column.bills} index={index} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
