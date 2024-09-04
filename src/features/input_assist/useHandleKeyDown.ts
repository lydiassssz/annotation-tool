import type {
  HandleKeyDownEvent,
  HandleKeyDownProps,
} from '@/utils/intaraction_type'
import { useCallback } from 'react'

export function useHandleKeyDown({
  cursor,
  setCursor,
  dataTable,
  setDataTable,
  calculatePredictedLabel,
  calculatePreviousLabel,
}: HandleKeyDownProps) {
  return useCallback(
    async (e: HandleKeyDownEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (cursor > 0) setCursor(cursor - 1)
          break
        case 'ArrowDown':
        case 'Enter':
          if (cursor < dataTable.length - 1) setCursor(cursor + 1)
          break
        case 'Tab':
          const currentLabel = dataTable[cursor].new_label
          if (currentLabel === null) {
            const updatedTable = [...dataTable]
            const prediction = await calculatePredictedLabel()
            updatedTable[cursor].new_label = Number(prediction)
            setDataTable(updatedTable)
          }
          setCursor((prevCursor) =>
            Math.min(prevCursor + 1, dataTable.length - 1),
          )
          e.preventDefault()
          break
        case 'Alt':
          if (e.altKey) {
            const updatedTable = [...dataTable]
            const previousLabel = await calculatePreviousLabel()
            if (previousLabel !== null) {
              updatedTable[cursor].new_label = previousLabel
              setDataTable(updatedTable)
            }
            setCursor((prevCursor) =>
              Math.min(prevCursor + 1, dataTable.length - 1),
            )
            e.preventDefault()
          }
          break
        default:
          break
      }
    },
    [
      cursor,
      dataTable,
      calculatePredictedLabel,
      calculatePreviousLabel,
      setCursor,
      setDataTable,
    ],
  )
}
