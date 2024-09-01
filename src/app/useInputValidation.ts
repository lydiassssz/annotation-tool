import type { TableRow } from '@/app/utils'
import type React from 'react'

// Define the types

// Define the type for the function arguments
interface UseInputValidationProps {
  testTable: TableRow[]
  setTestTable: React.Dispatch<React.SetStateAction<TableRow[]>>
}

// Apply types to the function parameters
export const useInputValidation = ({
  testTable,
  setTestTable,
}: UseInputValidationProps) => {
  const handleLabelChange = (index: number, newLabel: number | null) => {
    const updatedTable = [...testTable]
    updatedTable[index].new_label = newLabel === 0 ? null : newLabel
    setTestTable(updatedTable)
  }

  return { handleLabelChange }
}
