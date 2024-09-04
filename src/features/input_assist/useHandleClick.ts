import type { UseHandleClickProps } from '@/utils/intaraction_type'
import { useCallback } from 'react'

export const useHandleClick = ({
  cursor,
  setCursor,
  dataTable,
  handleLabelChange,
}: UseHandleClickProps) => {
  const handleTextClick = useCallback(
    (index: number) => {
      if (cursor !== index) {
        handleLabelChange(cursor, dataTable[index].number)
      }
      setCursor((prevCursor) => Math.min(prevCursor + 1, dataTable.length - 1))
    },
    [cursor, setCursor, dataTable, handleLabelChange],
  )

  const handleInputClick = useCallback(
    (index: number) => {
      setCursor(index)
    },
    [setCursor],
  )

  return { handleTextClick, handleInputClick }
}
