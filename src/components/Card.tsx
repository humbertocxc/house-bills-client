import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd"
import { XCircleIcon } from "@heroicons/react/24/solid"

interface ICard {
  index: number,
  bill: Bill,
  id: TypedColumn,
  innerRef: (element: HTMLElement | null) => void,
  draggableProps: DraggableProvidedDraggableProps,
  dragHandleProps?: DraggableProvidedDragHandleProps | null,
}

export default function Card({ bill, id, index, innerRef, dragHandleProps, draggableProps }: ICard) {
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-2">
        <p>{bill.$id}</p>
        <button className="text-red-600/90 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
    </div>
  )
}
