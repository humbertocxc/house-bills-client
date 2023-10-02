import { Draggable, Droppable } from "@hello-pangea/dnd"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import Card from "./Card"
import NewBillForm from "./NewBill"
import ModalContainer from "./ModalContainer"
import ColumnHeader from "./ColumnHeader"

interface IColumn {
  id: TypedColumn,
  bills: Bill[],
  index: number,
}

export default function Column({ id, bills, index }: IColumn) {
  const [showModal, setShowModal] = useState(false)
  const handleToggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-2xl ${
                  snapshot.isDraggingOver ? "bg-amber-600/50" : "bg-white/50"
                }`}
              >
                <ColumnHeader bills={bills} name={id} />
                <div className="space-y-2">
                  {bills.map((bill, index) => (
                    <Draggable key={bill.$id} draggableId={bill.$id} index={index}>
                      {(provided) => (
                        <Card
                          bill={bill}
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
                      <PlusCircleIcon className="h-10 w-10" onClick={handleToggleModal} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
          <ModalContainer modalTitle="Adicionar Conta" hide={handleToggleModal} isOpen={showModal}>
            <NewBillForm columnId={id} hide={handleToggleModal} />
          </ModalContainer>
        </div>
      )}
    </Draggable>
  )
}
