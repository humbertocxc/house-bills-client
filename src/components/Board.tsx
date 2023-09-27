"use client"
import { useBoardStore } from "@/app/store";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";
import useWindowSize from "@/hooks/useWindowSize";
import useRearrangeColumns from "@/hooks/useRearrangeColumns";
import useRearrangeCards from "@/hooks/useRearrangeCards";

export default function Board() {
  const isMobile = useWindowSize()
  const [board, getBoard, setBoardState] = useBoardStore(
    (state) => [state.board, state.getBoard, state.setBoardState]
  )

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) return
    if (source.index === destination.index && source.droppableId === destination.droppableId) return

    if (type === 'column') {
      const newBoard = useRearrangeColumns({ board, result })
      setBoardState(newBoard)
      return
    }

    const newBoard = useRearrangeCards({ board, result })
    setBoardState(newBoard)
  }

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction={isMobile ? 'vertical' : 'horizontal'} type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto pb-20 px-4 md:px-0"
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
