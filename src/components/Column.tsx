import { Draggable, Droppable } from "@hello-pangea/dnd"
import Card from "./Card"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

interface IColumn {
  id: TypedColumn,
  bills: Bill[],
  index: number,
}

const idToColumnText: {
  [key in TypedColumn]: string
} = {
  variable: "Contas de Emergência",
  fixed: "Contas Fixas",
  paid: "Contas Pagas",
}

export default function Column({ id, bills, index }: IColumn) {
  return (
    <Draggable draggableId={id} index={index} >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-amber-600/70" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-semibold text-lg p-2">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                    {bills.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {bills.map((bill, index) => (
                    <Draggable
                      key={bill.$id}
                      draggableId={bill.$id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          bill={bill}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button className="text-amber-800/80 hover:text-amber-800">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
