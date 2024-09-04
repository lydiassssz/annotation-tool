import type { TableRow } from '@/utils/table_type'
import type React from 'react'
import type { Dispatch, SetStateAction } from 'react'

export type HandleKeyDownEvent = {
  key: string
  altKey: boolean
  preventDefault: () => void
}
export type HandleKeyDownProps = {
  cursor: number
  setCursor: React.Dispatch<React.SetStateAction<number>>
  dataTable: TableRow[]
  setDataTable: React.Dispatch<React.SetStateAction<TableRow[]>>
  calculatePredictedLabel: () => Promise<number | null>
  calculatePreviousLabel: () => Promise<number | null>
}

export type UseHandleClickProps = {
  cursor: number
  setCursor: Dispatch<SetStateAction<number>>
  dataTable: TableRow[]
  handleLabelChange: (index: number, number: number) => void
}
