import { create } from 'zustand'
import { getBillsByColumn } from '../../utils/getBillsByColumn'

interface BoardState {
  board: Board,
  getBoard: () => void,
}

export const useBoardStore = create<BoardState>()((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: () => {
    const board = getBillsByColumn()
    set({ board })
  }
}))
