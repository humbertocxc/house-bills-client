import { Draggable, Droppable } from "@hello-pangea/dnd"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import Card from "./Card"
import NewBillForm from "./NewBill"
import ModalContainer from "./ModalContainer"

interface IColumn {
  id: TypedColumn,
  bills: Bill[],
  index: number,
}

const idToColumnText: {
  [key in TypedColumn]: string
} = {
  variable: "Despesas Eventuais",
  fixed: "Despesas Fixas",
  paid: "Contas Pagas",
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
                <h2 className="flex justify-between font-semibold text-lg p-2">
                  {idToColumnText[id]}
                  <div className="bg-amber-900/10 rounded-full w-fit h-fit">
                    <span className="flex justify-center items-center text-black/50 text-xs h-6 w-6">
                      {bills.length}
                    </span>
                  </div>
                </h2>

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

                  <div className="flex items-end justify-end p-2">
                    <button className="text-amber-800/80 hover:text-amber-800">
                      <PlusCircleIcon className="h-10 w-10" onClick={handleToggleModal} />
                    </button>
                  </div>

                  {provided.placeholder}
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
