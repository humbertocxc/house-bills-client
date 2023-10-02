import { useBoardStore } from "@/app/store"
import { deleteBill } from "../../utils/deleteBill"

interface IConfirmDelete {
  id: string,
  close: () => void,
}

export default function ConfirmDelete({ id, close }: IConfirmDelete) {
  const getBoard = useBoardStore((state) => state.getBoard)

  const handleDeleteBill = () => {
    deleteBill(id)
    getBoard()
    close()
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-2 py-6 text-white">
        <button onClick={handleDeleteBill} className="rounded-md p-2 flex-1 bg-red-500 hover:bg-red-600">Remover</button>
        <button onClick={close} className="rounded-md p-2 flex-1 bg-gray-500 hover:bg-gray-600">Cancelar</button>
      </div>
    </div>
  )
}
