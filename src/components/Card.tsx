import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd"
import { XCircleIcon } from "@heroicons/react/24/solid"
import ModalContainer from "./ModalContainer"
import ConfirmDelete from "./ConfirmDelete"
import { useState } from "react"

interface ICard {
  bill: Bill,
  innerRef: (element: HTMLElement | null) => void,
  draggableProps: DraggableProvidedDraggableProps,
  dragHandleProps?: DraggableProvidedDragHandleProps | null,
}

export default function Card({ bill, innerRef, dragHandleProps, draggableProps }: ICard) {
  const [ showModal, setShowModal ] = useState(false)

  const handleToggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-2">
        <p>{bill.title}</p>
        <button className="text-red-600/90 hover:text-red-600" onClick={handleToggleModal}>
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      <ModalContainer
        modalTitle={`Deseja remover ${bill.title}?`}
        isOpen={showModal}
        hide={handleToggleModal}
        variant="white"
      >
        <ConfirmDelete id={bill.$id} close={handleToggleModal} />
      </ModalContainer>
    </div>
  )
}
